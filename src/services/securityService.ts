import crypto from 'crypto';

interface UserRole {
  id: string;
  name: 'ADMIN' | 'BUSINESS_OWNER' | 'STAFF' | 'CUSTOMER';
  permissions: string[];
}

interface EncryptedData {
  iv: string;
  encryptedData: string;
}

export const securityService = {
  // Role-Based Access Control (RBAC)
  roles: {
    ADMIN: {
      id: 'admin',
      name: 'ADMIN',
      permissions: ['all']
    },
    BUSINESS_OWNER: {
      id: 'business_owner',
      name: 'BUSINESS_OWNER',
      permissions: [
        'manage_business',
        'view_analytics',
        'manage_orders',
        'manage_staff',
        'view_payments'
      ]
    },
    STAFF: {
      id: 'staff',
      name: 'STAFF',
      permissions: ['view_orders', 'update_order_status', 'chat_with_customer']
    },
    CUSTOMER: {
      id: 'customer',
      name: 'CUSTOMER',
      permissions: ['place_order', 'view_own_orders', 'chat_with_business']
    }
  },

  async checkPermission(
    userId: string,
    requiredPermission: string
  ): Promise<boolean> {
    try {
      // Get user role from database
      // TODO: Implement database integration
      const userRole: UserRole = this.roles.CUSTOMER; // Temporary default

      return (
        userRole.permissions.includes('all') ||
        userRole.permissions.includes(requiredPermission)
      );
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  },

  // Data Encryption
  private encryptionKey: Buffer = crypto.randomBytes(32),

  async encryptData(data: any): Promise<EncryptedData> {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        this.encryptionKey,
        iv
      );

      const jsonData = JSON.stringify(data);
      let encryptedData = cipher.update(jsonData, 'utf8', 'hex');
      encryptedData += cipher.final('hex');

      return {
        iv: iv.toString('hex'),
        encryptedData
      };
    } catch (error) {
      console.error('Error encrypting data:', error);
      throw error;
    }
  },

  async decryptData(encryptedData: EncryptedData): Promise<any> {
    try {
      const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        this.encryptionKey,
        Buffer.from(encryptedData.iv, 'hex')
      );

      let decryptedData = decipher.update(encryptedData.encryptedData, 'hex', 'utf8');
      decryptedData += decipher.final('utf8');

      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Error decrypting data:', error);
      throw error;
    }
  },

  // Token Management
  async generateToken(userId: string, role: string): Promise<string> {
    try {
      const tokenData = {
        userId,
        role,
        timestamp: Date.now()
      };

      const encryptedToken = await this.encryptData(tokenData);
      return Buffer.from(JSON.stringify(encryptedToken)).toString('base64');
    } catch (error) {
      console.error('Error generating token:', error);
      throw error;
    }
  },

  async verifyToken(token: string): Promise<{
    valid: boolean;
    userId?: string;
    role?: string;
  }> {
    try {
      const encryptedToken: EncryptedData = JSON.parse(
        Buffer.from(token, 'base64').toString()
      );
      const tokenData = await this.decryptData(encryptedToken);

      // Check token expiration (24 hours)
      if (Date.now() - tokenData.timestamp > 24 * 60 * 60 * 1000) {
        return { valid: false };
      }

      return {
        valid: true,
        userId: tokenData.userId,
        role: tokenData.role
      };
    } catch (error) {
      console.error('Error verifying token:', error);
      return { valid: false };
    }
  }
};