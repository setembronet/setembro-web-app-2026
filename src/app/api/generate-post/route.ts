import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const { topic } = await req.json();

        if (!topic) {
            return NextResponse.json({ error: "Tópico não fornecido." }, { status: 400 });
        }

        // Initialize Supabase admin client to bypass RLS and read settings
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
        const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

        const { data: settings } = await supabase.from("system_settings").select("*");
        const provider = settings?.find(s => s.key === "ai_provider")?.value || "gemini";
        const geminiKey = settings?.find(s => s.key === "gemini_api_key")?.value;
        const openaiKey = settings?.find(s => s.key === "openai_api_key")?.value;

        const prompt = `Você é um redator especialista em marketing de conteúdo e SEO (Agente Julia).
Escreva um rascunho de artigo de blog em formato HTML (adequado para um editor Rich Text/TipTap).
O tópico do artigo é: "${topic}".

Diretrizes Rigorosas (SEO E-E-A-T):
- O texto DEVE possuir profundidade. É EXTREMAMENTE PROIBIDO retornar sumários curtos. Você DEVE gerar, no mínimo, 1.000 palavras abrangendo métricas, exemplos práticos e desdobramentos lógicos.
- Retorne apenas o HTML puro do conteúdo. Não envolva em blocos \`\`\`html ou markdown.
- Use tags estruturadas abundantemente (<h2>, <h3>, <p>, <ul>, <li>, <strong>, <blockquote>).
- Formate a introdução focando na intenção de busca do usuário (Search Intent).
- Mantenha o formato Clean-Corporate B2B da Setembro.net: tom persuasivo, linguagem técnica acessível e focado em ROI (Retorno sobre Investimento).
- Não crie o <h1>, pois o sistema usará o título fornecido. Comece pelo conteúdo (ou seja, seu maior cabeçalho na hierarquia deve ser <h2>).`;

        let cleanedHtml = "";

        if (provider === "openai") {
            if (!openaiKey) return NextResponse.json({ error: "OpenAI API Key não configurada no Admin." }, { status: 500 });

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${openaiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini", // Cost-effective model
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
            // Default to Gemini
            if (!geminiKey) return NextResponse.json({ error: "Gemini API Key não configurada no Admin." }, { status: 500 });

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${geminiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.7 }
                })
            });

            if (!response.ok) throw new Error("Falha ao chamar Gemini API");
            const data = await response.json();
            const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
            cleanedHtml = rawContent ? rawContent.replace(/```(html)?|```/g, "").trim() : "";
        }

        return NextResponse.json({ content: cleanedHtml });
    } catch (error) {
        console.error("Error generating post draft:", error);
        return NextResponse.json({ error: "Erro interno ao gerar o rascunho." }, { status: 500 });
    }
}
