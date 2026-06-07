const client = require("./groq");

async function test() {
    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "say hi!" }],
    });

    console.log(response.choices[0].message.content);
}

test();