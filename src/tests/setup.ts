import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mock the fetch API
global.fetch = jest.fn();

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Clean up after each test
afterEach(() => {
  jest.restoreAllMocks();
});

// Add custom matchers if needed
expect.extend({
  // Add custom matchers here if required
});

// Mock environment variables
process.env.WHATSAPP_API_KEY = 'test-api-key';
process.env.WHATSAPP_BUSINESS_ID = 'test-business-id';