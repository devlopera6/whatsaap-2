// Default admin credentials
export const defaultAdminCredentials = {
  email: 'admin@whatsappbot.com',
  password: 'admin123', // You should change this immediately after first login
};

// Function to initialize admin access
export const setupAdminAccess = () => {
  // Check if admin is already setup
  if (!localStorage.getItem('adminSetup')) {
    // Store admin credentials (in real app, this should be in a secure database)
    localStorage.setItem('adminCredentials', JSON.stringify(defaultAdminCredentials));
    localStorage.setItem('adminSetup', 'true');
  }
};
