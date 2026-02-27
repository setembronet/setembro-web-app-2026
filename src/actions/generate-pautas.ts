'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { generateEmbedding } from "@/lib/ai/gemini";
import { syncPostToRAG } from "@/lib/ai/sync-rag";

export async function generatePautas(topics: string[], categoryId: string) {
    if (!topics || topics.length === 0) {
        return { success: false, message: "Nenhum tópico fornecido." };
    }

    try {
        const supabase = await createClient();

        for (const topic of topics) {
            const cleanTopic = topic.trim();
            if (!cleanTopic) continue;

            // Chamar a mesma API de geração via URL interna não funciona confiavelmente em Server Actions.
            // Precisamos reproduzir a lógica de prompt ou extrair a função.
            // Mas, dado que a rota expõe POST nativo, podemos dar fetch no localhost, ou usar o código diretamente.
            // Para simplificar e garantir SEO (E-E-A-T com 1000+ words):

            const prompt = `Você é um redator especialista em marketing de conteúdo e SEO (Agente Julia).
Escreva um rascunho de artigo de blog em formato HTML (adequado para um editor Rich Text).
O tópico do artigo é: "${cleanTopic}".

Diretrizes Rigorosas (SEO E-E-A-T):
- O texto DEVE possuir profundidade. É EXTREMAMENTE PROIBIDO retornar sumários curtos. Você DEVE gerar, no mínimo, 1.000 palavras abrangendo métricas, exemplos práticos e desdobramentos lógicos.
- Retorne apenas o HTML puro do conteúdo. Não envolva em blocos \`\`\`html ou markdown.
- Use tags estruturadas abundantemente (<h2>, <h3>, <p>, <ul>, <li>, <strong>, <blockquote>).
- Formate a introdução focando na intenção de busca do usuário (Search Intent).
- Mantenha o formato Clean-Corporate B2B da Setembro.net: tom persuasivo, linguagem técnica acessível e focado em ROI (Retorno sobre Investimento).
- Não crie o <h1> principal, ele será baseado no tópico. O maior cabeçalho no texto deve ser <h2>.`;

            // Precisamos das keys
            const { data: settings } = await supabase.from("system_settings").select("*");
            const provider = settings?.find(s => s.key === "ai_provider")?.value || "gemini";
            const geminiKey = settings?.find(s => s.key === "gemini_api_key")?.value || process.env.GEMINI_API_KEY;
            const openaiKey = settings?.find(s => s.key === "openai_api_key")?.value || process.env.OPENAI_API_KEY;

            let cleanedHtml = "";

            if (provider === "openai") {
                if (!openaiKey) throw new Error("OpenAI API Key não configurada.");
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${openaiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-4o",
                        messages: [
                            { role: "system", content: "Você é um gerador de textos em HTML. Responda APENAS com código HTML válido." },
                            { role: "user", content: prompt }
                        ],
                        temperature: 0.7,
                    })
                });

                if (!response.ok) throw new Error("Falha ao chamar OpenAI API");
                const data = await response.json();
                const rawContent = data.choices[0].message.content;
                cleanedHtml = rawContent ? rawContent.replace(/```(html)?|```/g, "").trim() : "";
            } else {
                if (!geminiKey) throw new Error("Gemini API Key não configurada.");
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.7 }
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    console.error("Gemini API Error details:", JSON.stringify(errorData, null, 2));
                    throw new Error("Falha ao chamar Gemini API: " + (errorData.error?.message || response.statusText));
                }
                const data = await response.json();
                const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
                cleanedHtml = rawContent ? rawContent.replace(/```(html)?|```/g, "").trim() : "";
            }

            // Generate overall embedding for the post (for hybrid search)
            const postEmbedding = await generateEmbedding(`${cleanTopic}\n${cleanedHtml.replace(/<[^>]*>?/gm, '').substring(0, 5000)}`);

            // Create slug from topic
            const slug = cleanTopic.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");

            // Calculate reading time
            const words = cleanedHtml ? cleanedHtml.trim().split(/\s+/).length : 0;
            const reading_time = Math.ceil(words / 200);

            // Fetch default author if not provided
            const { data: defaultAuthor } = await supabase.from('authors').select('id').limit(1).single();

            const { data: newPost, error: insertError } = await supabase.from("blog_posts").insert({
                title: cleanTopic,
                slug: slug,
                content: cleanedHtml,
                status: "published",
                published_at: new Date().toISOString(),
                category_id: categoryId,
                author_id: defaultAuthor ? defaultAuthor.id : null,
                reading_time,
                meta_title: cleanTopic,
                meta_description: "Artigo gerado automaticamente sobre " + cleanTopic,
                embedding: postEmbedding
            }).select('id').single();

            if (!insertError && newPost) {
                // Sync to Ana's memory (RAG)
                await syncPostToRAG(newPost.id, cleanTopic, cleanedHtml, slug, "published");
            }
        }

        revalidatePath('/admin/posts');
        revalidatePath('/admin/pautas');
        return { success: true, message: "Pautas geradas com sucesso!" };

    } catch (error: any) {
        console.error("Error generating pautas:", error);
        return { success: false, message: error.message || "Erro interno ao gerar pautas." };
    }
}
