import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Requires Service Role Key
const openaiApiKey = process.env.OPENAI_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const openai = new OpenAI({ apiKey: openaiApiKey });

async function getEmbedding(text: string) {
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text.replace(/\n/g, ' '),
    });
    return response.data[0].embedding;
}

async function ingestDocs() {
    console.log('📚 Ingesting Documents for RAG...');
    const docsDir = path.join(process.cwd(), 'docs_to_ingest');

    if (!fs.existsSync(docsDir)) {
        console.log('⚠️ No docs_to_ingest directory found. Creating one...');
        fs.mkdirSync(docsDir);
        fs.writeFileSync(path.join(docsDir, 'sample.md'), '# Sample Knowledge\n\nThis is a sample document for RAG ingestion.');
    }

    const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.md') || file.endsWith('.txt'));

    for (const file of files) {
        console.log(`Processing ${file}...`);
        const content = fs.readFileSync(path.join(docsDir, file), 'utf-8');

        // Simple chunking strategy: split by paragraphs or max chars
        // For now, let's treat the whole file as one chunk if small, or split by double newline
        const chunks = content.split('\n\n').filter(chunk => chunk.length > 50);

        for (const chunk of chunks) {
            try {
                const embedding = await getEmbedding(chunk);

                const { error } = await supabase.from('document_chunks').insert({
                    content: chunk,
                    embedding,
                    metadata: { source: file }
                });

                if (error) throw error;
                process.stdout.write('.');
            } catch (err) {
                console.error(`Error processing chunk from ${file}:`, err);
            }
        }
        console.log(`\n✅ Finished ${file}`);
    }
}

ingestDocs();
