import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateAIInsight(
  topVillage,
  topCategory,
  highUrgencyComplaints
) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an AI advisor for an Indian Member of Parliament.
Give short, professional and actionable recommendations.
Maximum 2 sentences.`,
        },
        {
          role: "user",
          content: `
Top Village: ${topVillage}
Top Complaint Category: ${topCategory}
High Urgency Complaints: ${highUrgencyComplaints}

Generate a recommendation for the MP.
`,
        },
      ],
      temperature: 0.4,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);

    return `Priority attention is recommended for ${topCategory} complaints in ${topVillage}. There are currently ${highUrgencyComplaints} high urgency complaints requiring immediate action.`;
  }
}