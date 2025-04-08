import { GoogleGenerativeAI } from '@google/generative-ai';
import { languageService } from './languageService';
import { orderService } from './orderService';
import { securityService } from './securityService';
import { defaultConfig } from '../config/whatsappBot';

interface WhatsAppMessage {
  from: string;
  text: string;
  timestamp: number;
  type: 'text' | 'image' | 'location' | 'document';
  businessId: string;
}

interface BotResponse {
  text: string;
  type: 'text' | 'template';
  templateData?: Record<string, string>;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const whatsappBotHandler = {
  async handleIncomingMessage(message: WhatsAppMessage): Promise<BotResponse> {
    try {
      // Detect language
      const detectedLanguage = await languageService.detectLanguage(message.text);

      // Check if message contains order intent
      if (await this.isOrderIntent(message.text)) {
        return this.handleOrderIntent(message, detectedLanguage);
      }

      // Generate AI response
      const response = await this.generateAIResponse(message, detectedLanguage);
      return { type: 'text', text: response };
    } catch (error) {
      console.error('Error handling message:', error);
      return {
        type: 'text',
        text: defaultConfig.welcomeMessage
      };
    }
  },

  async isOrderIntent(text: string): Promise<boolean> {
    try {
      const prompt = `Analyze if this message contains an order intent. Respond with only 'true' or 'false': ${text}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim().toLowerCase() === 'true';
    } catch (error) {
      console.error('Error detecting order intent:', error);
      return false;
    }
  },

  async handleOrderIntent(message: WhatsAppMessage, language: string): Promise<BotResponse> {
    try {
      // Extract order details using AI
      const prompt = `Extract order details from this message. Format as JSON with items array containing name and quantity: ${message.text}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const orderDetails = JSON.parse(response.text());

      // Create order
      const order = await orderService.createOrder({
        businessId: message.businessId,
        customerId: message.from,
        items: orderDetails.items,
        language
      });

      // Generate order confirmation message
      return {
        type: 'template',
        text: defaultConfig.orderConfirmationTemplate,
        templateData: {
          order_id: order.id,
          amount: order.totalAmount.toString()
        }
      };
    } catch (error) {
      console.error('Error handling order:', error);
      const errorMessage = await languageService.translate(
        'Sorry, I couldn\'t process your order. Please try again or contact support.',
        language
      );
      return { type: 'text', text: errorMessage.translatedText };
    }
  },

  async generateAIResponse(message: WhatsAppMessage, language: string): Promise<string> {
    try {
      const businessContext = `You are a helpful AI assistant for a business. Respond professionally and concisely.`;
      const prompt = `${businessContext}\n\nUser message: ${message.text}\n\nGenerate a response in ${language}.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error generating AI response:', error);
      return defaultConfig.welcomeMessage;
    }
  },

  async sendPaymentReminder(orderId: string, amount: number, phone: string, language: string): Promise<void> {
    try {
      const message = {
        type: 'template',
        text: defaultConfig.paymentReminderTemplate,
        templateData: {
          order_id: orderId,
          amount: amount.toString(),
          payment_link: `https://pay.example.com/order/${orderId}` // Replace with actual payment gateway
        }
      };

      // TODO: Implement WhatsApp message sending
      console.log('Sending payment reminder:', message);
    } catch (error) {
      console.error('Error sending payment reminder:', error);
      throw error;
    }
  }
};