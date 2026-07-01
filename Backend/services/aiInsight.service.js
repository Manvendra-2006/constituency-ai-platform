import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateAIInsight(topVillage, topCategory, highUrgencyComplaints) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const prompt = `
You are an AI development planning assistant for an Indian Member of Parliament.

Current complaint statistics:

Top Village: ${topVillage}

Top Complaint Category: ${topCategory}

High Urgency Complaints: ${highUrgencyComplaints}

Generate a professional recommendation for the MP.

Rules:
- Maximum 2 sentences.
- Mention the village name.
- Mention the category.
- Explain why this issue should be prioritized.
- Keep it concise and actionable.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        return response.text();
    } catch (error) {
        console.log(error);
        return "Unable to generate AI recommendation.";
    }
}