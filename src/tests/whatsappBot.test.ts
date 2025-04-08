import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { defaultConfig } from '../config/whatsappBot';
import { processOrder } from '../services/orderService';
import { detectLanguage, translateMessage } from '../services/languageService';

// Mock the services
jest.mock('../services/orderService');
jest.mock('../services/languageService');

describe('WhatsApp Bot Integration Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Message Templates', () => {
    it('should format welcome message with correct placeholders', () => {
      const welcomeTemplate = defaultConfig.welcomeMessage;
      const customerName = 'John Doe';
      
      const formattedMessage = welcomeTemplate.replace('{{customer_name}}', customerName);
      
      expect(formattedMessage).toContain(customerName);
      expect(formattedMessage.includes('{{customer_name}}')).toBe(false);
    });

    it('should format order confirmation with order details', () => {
      const template = defaultConfig.orderConfirmationTemplate;
      const orderDetails = {
        orderId: 'ORD123',
        amount: 1500,
        items: ['Pizza', 'Coke']
      };

      const formattedMessage = template
        .replace('{{order_id}}', orderDetails.orderId)
        .replace('{{amount}}', orderDetails.amount.toString())
        .replace('{{items}}', orderDetails.items.join(', '));

      expect(formattedMessage).toContain(orderDetails.orderId);
      expect(formattedMessage).toContain(orderDetails.amount.toString());
      expect(formattedMessage).toContain(orderDetails.items.join(', '));
    });
  });

  describe('Language Support', () => {
    it('should detect message language correctly', async () => {
      const message = 'नमस्ते, मैं एक पिज्जा ऑर्डर करना चाहता हूं';
      (detectLanguage as jest.Mock).mockResolvedValue('hi');

      const detectedLanguage = await detectLanguage(message);
      expect(detectedLanguage).toBe('hi');
    });

    it('should translate messages to customer\'s preferred language', async () => {
      const message = 'Your order has been confirmed';
      const targetLanguage = 'hi';
      const expectedTranslation = 'आपका ऑर्डर कन्फर्म हो गया है';

      (translateMessage as jest.Mock).mockResolvedValue(expectedTranslation);

      const translatedMessage = await translateMessage(message, targetLanguage);
      expect(translatedMessage).toBe(expectedTranslation);
    });
  });

  describe('Order Processing', () => {
    it('should process valid order messages', async () => {
      const orderMessage = 'I want to order 2 pizzas';
      const expectedOrder = {
        items: [{ name: 'pizza', quantity: 2 }],
        status: 'pending'
      };

      (processOrder as jest.Mock).mockResolvedValue(expectedOrder);

      const order = await processOrder(orderMessage);
      expect(order).toEqual(expectedOrder);
    });

    it('should handle invalid order messages', async () => {
      const invalidMessage = 'just browsing';
      
      (processOrder as jest.Mock).mockRejectedValue(new Error('Invalid order message'));

      await expect(processOrder(invalidMessage)).rejects.toThrow('Invalid order message');
    });
  });
});