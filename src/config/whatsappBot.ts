export const defaultConfig = {
  welcomeMessage: "Hello! Welcome to our store. How can I help you today?",
  orderConfirmationTemplate: "Thank you for your order! Your order #{{order_id}} has been confirmed. Total: ₹{{amount}}.",
  paymentReminderTemplate: "Reminder: Your order #{{order_id}} is waiting for payment. Click here to pay: {{payment_link}}",
  outOfStockTemplate: "We apologize, but the item {{item_name}} is currently out of stock. We'll notify you when it's available.",
  defaultLanguage: "en",
  autoReplyEnabled: true,
  orderDetectionSensitivity: "medium",
  responseDelay: "instant",
  autoFollowUpEnabled: true,
  followUpInterval: "24h"
};

export type WhatsAppBotConfig = typeof defaultConfig;