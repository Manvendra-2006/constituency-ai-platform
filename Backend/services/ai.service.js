import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


export async function analyzeComplaint(originalComplaint) {
  const prompt = `
You are an AI assistant helping Members of Parliament analyze citizen development complaints.

Your job is to classify the complaint.

Possible Categories:

- Education
- Healthcare
- Road Infrastructure
- Water Supply
- Electricity
- Agriculture
- Employment
- Sanitation
- Public Transport
- Housing
- Other

Return ONLY valid JSON.

Schema:

{
  "category":"",
  "subcategory":"",
  "summary":"",
  "urgency":"High|Medium|Low",
  "confidence":0.00
}

Complaint:

"${originalComplaint}"
`;

 
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log("Gemini Response:");
  console.log(response.text);

  const text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
}