import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});export async function analyzeVillage(villageData, complaints) {

  const prompt = `
You are an expert Rural Development Officer and AI Planning Assistant.

Analyze the following village based on:

1. Demographic Data
2. Infrastructure
3. Citizen Complaints

Village Data

${JSON.stringify(villageData, null, 2)}

Citizen Complaints

${JSON.stringify(complaints, null, 2)}

Return ONLY valid JSON.

Schema:

{
  "developmentScore": 0,
  "majorIssue": "",
  "priority": "",
  "recommendation": "",
  "futureSuggestion": "",
  "summary": "",
  "top3Projects": [
    "",
    "",
    ""
  ]
}
`;

  try {

    const completion = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [

        {
          role: "system",
          content:
            "You are an AI Rural Development Expert. Return only valid JSON.",
        },

        {
          role: "user",
          content: prompt,
        },

      ],

      temperature: 0.3,

      response_format: {
        type: "json_object",
      },

    });

    const text = completion.choices[0].message.content;

    return JSON.parse(text);

  } catch (error) {

    console.error(error);

    throw error;

  }

}