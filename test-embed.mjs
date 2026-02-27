import fetch from 'node-fetch';

const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDJxI07GBvK1Adcy6frU12qPtyLeSzGJ10';

async function test() {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "models/gemini-embedding-001",
                    content: { parts: [{ text: "Hello world" }] }
                })
            }
        );
        const data = await response.json();
        console.log("Status:", response.status);
        if (data.embedding && data.embedding.values) {
            console.log("Success! Dimensions:", data.embedding.values.length);
        } else {
            console.log("Data:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}
test();
