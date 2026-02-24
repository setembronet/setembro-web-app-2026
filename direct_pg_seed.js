const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
    // Try to find a direct postgres connection string. If not, use the REST API URL workaround.
    const host = process.env.NEXT_PUBLIC_SUPABASE_URL.replace('http://', '').replace('https://', '').split(':')[0];
    const connectionString = `postgresql://postgres:postgres@${host}:54322/postgres`;

    console.log('Connecting to:', connectionString);
    const client = new Client({ connectionString });

    try {
        await client.connect();
        console.log('Connected.');

        // Schema alterations
        await client.query('ALTER TABLE ai_agents ADD COLUMN IF NOT EXISTS role TEXT;');
        await client.query('ALTER TABLE ai_agents ADD COLUMN IF NOT EXISTS active_prompt TEXT;');

        // Wipe and Seed
        await client.query('DELETE FROM ai_agents;');
        const insertQuery = `
      INSERT INTO ai_agents (name, role, is_active, temperature, active_prompt) VALUES 
      ('O Pivot', 'Gerente de Contas', true, 0.5, ''), 
      ('Ana', 'Consultora SDR', true, 0.7, ''), 
      ('Julia', 'Copywriter/SEO', true, 0.8, ''), 
      ('Sofia', 'Diretora (CMO)', true, 0.4, ''), 
      ('Carlos', 'Engenheiro DevOps', true, 0.2, '')
    `;
        await client.query(insertQuery);
        console.log('SUCCESS: Agents seeded securely.');
    } catch (err) {
        console.error('Migration Error:', err.message);
    } finally {
        await client.end();
    }
}
run();
