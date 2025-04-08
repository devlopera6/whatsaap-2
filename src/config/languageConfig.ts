export interface Language {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', direction: 'ltr' },
  { code: 'hi', name: 'Hindi', direction: 'ltr' },
  { code: 'mr', name: 'Marathi', direction: 'ltr' },
  { code: 'gu', name: 'Gujarati', direction: 'ltr' }
];

export const DEFAULT_LANGUAGE: Language = SUPPORTED_LANGUAGES[0];

export const TRANSLATION_CACHE_TTL = 3600; // 1 hour in seconds

export const AI_RESPONSE_CONFIG = {
  temperature: 0.7,
  maxTokens: 150,
  topP: 0.9,
  frequencyPenalty: 0.5,
  presencePenalty: 0.5
};

export const BUSINESS_PROMPT_TEMPLATES = {
  greeting: (businessName: string, language: string) =>
    `You are a helpful AI assistant for ${businessName}. Respond in ${language} with a warm greeting.`,
  orderConfirmation: (orderDetails: string, language: string) =>
    `Generate an order confirmation message in ${language} for the following order: ${orderDetails}`,
  paymentReminder: (amount: number, dueDate: string, language: string) =>
    `Create a payment reminder message in ${language} for amount ${amount} due on ${dueDate}`,
  customResponse: (context: string, language: string) =>
    `Based on this context: ${context}, generate a helpful response in ${language}`
};