
const GEMINI_API_KEY = "AIzaSyDJxI07GBvK1Adcy6frU12qPtyLeSzGJ10";

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

listModels();
