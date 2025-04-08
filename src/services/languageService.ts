import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface TranslationResult {
  detectedLanguage: string;
  translatedText: string;
}

export const languageService = {
  // Detect language of incoming message
  async detectLanguage(text: string): Promise<string> {
    try {
      const prompt = `Detect the language of this text and return only the language name: ${text}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error detecting language:', error);
      throw error;
    }
  },

  // Translate text to target language
  async translate(text: string, targetLanguage: string): Promise<TranslationResult> {
    try {
      const detectedLanguage = await this.detectLanguage(text);
      
      if (detectedLanguage.toLowerCase() === targetLanguage.toLowerCase()) {
        return {
          detectedLanguage,
          translatedText: text
        };
      }

      const prompt = `Translate this text from ${detectedLanguage} to ${targetLanguage}: ${text}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return {
        detectedLanguage,
        translatedText: response.text().trim()
      };
    } catch (error) {
      console.error('Error translating text:', error);
      throw error;
    }
  },

  // Generate response in specific language
  async generateResponse(prompt: string, language: string): Promise<string> {
    try {
      const enhancedPrompt = `Generate a response in ${language} for: ${prompt}`;
      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }
};