// Mock implementations for services

// Mock language service
export const mockDetectLanguage = jest.fn();
export const mockTranslateMessage = jest.fn();

// Mock order service
export const mockProcessOrder = jest.fn();

// Mock WhatsApp API service
export const mockSendMessage = jest.fn();
export const mockSendTemplate = jest.fn();

// Reset all mocks
export const resetMocks = () => {
  mockDetectLanguage.mockReset();
  mockTranslateMessage.mockReset();
  mockProcessOrder.mockReset();
  mockSendMessage.mockReset();
  mockSendTemplate.mockReset();
};

// Common test data
export const testData = {
  orders: [
    {
      id: 'ORD123',
      items: [{ name: 'Pizza', quantity: 2 }],
      status: 'pending',
      total: 1500
    }
  ],
  messages: {
    welcome: 'Welcome {{customer_name}}!',
    orderConfirmation: 'Order #{{order_id}} confirmed. Total: ₹{{amount}}',
    translated: {
      hi: {
        welcome: 'नमस्ते {{customer_name}}!',
        orderConfirmation: 'ऑर्डर #{{order_id}} की पुष्टि हो गई है। कुल: ₹{{amount}}'
      }
    }
  }
};