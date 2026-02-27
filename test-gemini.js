
const GEMINI_API_KEY = "AIzaSyDJxI07GBvK1Adcy6frU12qPtyLeSzGJ10";

async function testGemini() {
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.5-flash-latest"];
    for (const model of models) {
        console.log(`Testing model: ${model}...`);
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "Reponda apenas 'OK'" }] }]
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(`✅ ${model} works!`);
                console.log(JSON.stringify(data, null, 2));
                return;
            } else {
                console.log(`❌ ${model} failed: ${data.error?.message || response.statusText}`);
            }
        } catch (e) {
            console.log(`❌ ${model} Exception: ${e.message}`);
        }
    }
}

testGemini();
