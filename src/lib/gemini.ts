import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

export async function getAIResponse(prompt: string, context: any) {
  if (!model) {
    throw new Error("Gemini API key is not configured.");
  }

  const systemPrompt = `
    Jsi expertni fitness trenér a nutriční poradce v aplikaci LazorikGym.
    Tvým cílem je pomáhat uživateli dosáhnout jeho fitness cílů s maximální efektivitou a bezpečností.
    
    Zde je aktuální kontext uživatele:
    ${JSON.stringify(context, null, 2)}
    
    Pravidla:
    1. Odpovídej v češtině, motivačně a odborně.
    2. Používej data z kontextu (např. zmiňuj konkrétní slabé partie nebo historii).
    3. Pokud se uživatel ptá na trénink, navrhuj konkrétní cviky a schémata.
    4. Buď stručný, ale úderný. Používej odrážky a tučné písmo pro přehlednost.
    5. Pokud uživatel vypadá unaveně nebo má špatná data o spánku, doporuč regeneraci.
  `;

  try {
    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Omlouvám se, ale můj digitální mozek má momentálně výpadek. Zkus to prosím za chvilku.";
  }
}
