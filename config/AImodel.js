import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ Missing API Key. Make sure it is set in the .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);  // ✅ Singleton Instance

// ✅ Function to Generate Course Topics
export const GenerateTopicsAIModel = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent([prompt]);
    const responseText = await result.response.text();

    let topics = [];
    try {
      // ✅ Clean and format topics properly
      const cleanedText = responseText
        .replace(/json||\[|\]/g, "")      // Remove JSON artifacts
        .replace(/"/g, "")                      // Remove double quotes
        .trim();

      // ✅ Split by new lines or commas and remove numbering/hyphens
      topics = cleanedText
        .split(/[\n,]/)                         // Split by new lines or commas
        .map(item => item.trim().replace(/^\d+\.\s*|-/, ""))  // Remove prefixes like "1. " or "- "
        .filter(item => item.length > 0);

    } catch (error) {
      console.error("❌ Parsing error:", error);
      topics = responseText
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }

    console.log("✅ Clean Topics:", topics);
    return topics;  // ✅ Return clean topics without numbering or symbols

  } catch (error) {
    console.error("❌ Error generating topics:", error);
    return ["Error fetching course topics. Please try again."];
  }
};


export const GenerateCourseAIModel = async (prompt) => {
  try {
    // Enhance prompt to ask for a shorter response
    const shortPrompt = `${prompt}\n\nLimit the course to 5 concise sections, each with a short title and one-line description.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent([shortPrompt]);
    const responseText = await result.response.text();

    let topics = [];
    try {
      // Clean and format topics properly
      const cleanedText = responseText
        .replace(/json|[\[\]]/gi, "")      // Remove JSON artifacts
        .replace(/"/g, "")                 // Remove double quotes
        .trim();

      // Split by new lines or numbered list
      topics = cleanedText
        .split(/\n|,/)
        .map(item => item.trim().replace(/^\d+\.\s*|-/, ""))
        .filter(item => item.length > 0)
        .slice(0, 5) // ✅ Limit to 5 items
        .map(item => item.length > 100 ? item.slice(0, 100) + '…' : item); // ✅ Truncate long items

    } catch (error) {
      console.error("❌ Parsing error:", error);
      topics = responseText
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .slice(0, 5);
    }

    console.log("✅ Short Course Content:", topics);
    return topics;

  } catch (error) {
    console.error("❌ Error generating course content:", error);
    return ["Error generating course content. Please try again."];
  }
};
