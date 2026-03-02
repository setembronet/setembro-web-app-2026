const fs = require('fs');
let envFile = '';
try {
    envFile = fs.readFileSync('.env.local', 'utf8');
} catch {
    envFile = fs.readFileSync('.env', 'utf8');
}
const envVars = envFile.split('\n').filter(line => line && !line.startsWith('#')).reduce((acc, line) => {
    const [key, ...value] = line.split('=');
    if (key && value.length) acc[key.trim()] = value.join('=').trim().replace(/^"|"$/g, '');
    return acc;
}, {});
const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
const key = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
fetch(url + '/rest/v1/blog_posts?select=id,title,is_published,published_at&order=published_at.desc&limit=5', {
    headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
}).then(res => res.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error);
