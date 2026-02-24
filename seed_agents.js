const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
// Default local connection for dev supabase db
const connectionString = 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';
async function run() {
    const client = new Client({ connectionString });
    try {
        await client.connect();

        // Add columns
        await client.query('ALTER TABLE ai_agents ADD COLUMN IF NOT EXISTS role TEXT;');
        await client.query('ALTER TABLE ai_agents ADD COLUMN IF NOT EXISTS active_prompt TEXT;');

        // Clean slate
        await client.query('DELETE FROM ai_agents;');

        // Insert array
        const insertQuery = `
      INSERT INTO ai_agents (name, role, is_active, temperature, active_prompt) VALUES 
      ('O Pivot', 'Gerente de Contas', true, 0.5, ''), 
      ('Ana', 'Consultora SDR', true, 0.7, ''), 
      ('Julia', 'Copywriter/SEO', true, 0.8, ''), 
      ('Sofia', 'Diretora (CMO)', true, 0.4, ''), 
      ('Carlos', 'Engenheiro DevOps', true, 0.2, '')
    `;
        await client.query(insertQuery);
        console.log('Successfully altered schema and seeded agents!');
    } catch (err) {
        console.error('Migration failed:', err.message);
    } finally {
        await client.end();
    }
}
run();
