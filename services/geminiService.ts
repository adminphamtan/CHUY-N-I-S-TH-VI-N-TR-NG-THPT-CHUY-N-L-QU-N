
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a concise book summary using the Gemini API.
 * @param title The title of the book.
 * @param author The author of the book.
 * @returns A promise that resolves to the generated summary string.
 */
export async function generateBookSummary(title: string, author: string): Promise<string> {
  try {
    const prompt = `Hãy viết một đoạn tóm tắt ngắn gọn, trong khoảng 4-5 câu, cho cuốn sách có tên "${title}" của tác giả ${author}. Đoạn tóm tắt này cần súc tích, hấp dẫn và phù hợp để sử dụng trong danh mục của một thư viện trường trung học phổ thông.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    // Using the .text property is the correct way to get the text output
    const summary = response.text;
    if (!summary) {
        throw new Error("Received an empty response from the AI.");
    }
    
    return summary.trim();
  } catch (error) {
    console.error("Error generating book summary with Gemini:", error);
    // Re-throw a more user-friendly error
    throw new Error("Failed to generate summary. Please check your connection or API key.");
  }
}
