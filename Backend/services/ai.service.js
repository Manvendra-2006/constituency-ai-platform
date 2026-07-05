import Groq from "groq-sdk";
import fs from "fs";
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function normalizeAIResponse(parsedResponse) {
  if (!parsedResponse || typeof parsedResponse !== "object" || Array.isArray(parsedResponse)) {
    throw new Error("AI response was not a valid JSON object");
  }

  const urgency = ["High", "Medium", "Low"].includes(parsedResponse.urgency)
    ? parsedResponse.urgency
    : "Medium";

  return {
    category: parsedResponse.category || "Other",
    subcategory: parsedResponse.subcategory || "General",
    summary: parsedResponse.summary || "Complaint analysis pending.",
    urgency,
    confidence: typeof parsedResponse.confidence === "number" ? parsedResponse.confidence : 0,
  };
}

function parseAIResponseContent(content) {
  if (!content) {
    throw new Error("AI response was empty");
  }

  if (typeof content !== "string") {
    return content;
  }

  const trimmed = content.trim();
  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const cleanContent = fencedMatch ? fencedMatch[1].trim() : trimmed;

  try {
    return JSON.parse(cleanContent);
  } catch (parseError) {
    console.error("AI JSON parse failed. Raw response:", cleanContent);
    throw parseError;
  }
}

export async function analyzeComplaint(originalComplaint) {
  const prompt = `
You are an AI assistant helping Members of Parliament (MPs) analyze citizen development complaints across India.

The complaint may be written in ANY Indian language, including:
Hindi, English, Hinglish, Marathi, Gujarati, Punjabi, Bengali, Tamil, Telugu, Kannada, Malayalam, Odia, Assamese, Urdu, or any other Indian language.

Your task is to:
1. Understand the complaint regardless of the language.
2. Identify the most appropriate category.
3. Identify a specific subcategory.
4. Write a short English summary of the complaint.
5. Estimate the urgency.
6. Return your confidence score.

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

Rules:
- Respond ONLY with valid JSON.
- Do NOT return markdown.
- Do NOT wrap the JSON inside \`\`\`.
- The summary must ALWAYS be in English.
- Category names must ALWAYS be in English.
- Subcategory names must ALWAYS be in English.
- Urgency must be exactly one of:
  "High", "Medium", or "Low".
- Confidence must be a decimal number between 0 and 1.

Return this exact JSON schema:

{
  "category": "",
  "subcategory": "",
  "summary": "",
  "urgency": "",
  "confidence": 0.00
}

Citizen Complaint:

"${originalComplaint}"
`;

  try {
    console.log("AI request started")
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // or llama-3.1-8b-instant
      messages: [
        {
          role: "system",
          content: "You are an expert AI for complaint analysis. Return only valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
    });

    const text = completion?.choices?.[0]?.message?.content;
    console.log("AI response received:", text);

    const parsedResponse = parseAIResponseContent(text);
    console.log("JSON parsed successfully:", parsedResponse);

    return normalizeAIResponse(parsedResponse);
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
}
export async function analyzeImageComplaint(imagePath, originalComplaint = "") {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",

      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant helping Members of Parliament analyze citizen development complaints from images. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: [
          {
  type: "text",
  text: `
You are analyzing a citizen development complaint for an Indian Member of Parliament.

The user may provide:
- Only an image
- Only complaint text
- Both image and complaint text

Citizen Complaint Text:

${originalComplaint || "No text provided"}

Instructions:

1. If BOTH image and text are available:
   - Analyze both together.
   - Use the image as primary evidence.
   - Use the complaint text as supporting context.

2. If ONLY the image is available:
   - Infer the complaint only from the uploaded image.
   - Do not require complaint text.

3. If the image and text contradict each other:
   - Prefer what is clearly visible in the image.

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
  "category": "",
  "subcategory": "",
  "summary": "",
  "urgency": "High|Medium|Low",
  "confidence": 0.00
}
`
},
        
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],

      temperature: 0.2,

      response_format: {
        type: "json_object",
      },
    });

    const text = completion.choices[0].message.content;

    const parsed = parseAIResponseContent(text);

    return normalizeAIResponse(parsed);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

