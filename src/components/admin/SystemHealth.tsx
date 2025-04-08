import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { adminService } from '../../services/adminService';

interface SystemStatus {
  apiStatus: string;
  databaseStatus: string;
  whatsappStatus: string;
  paymentGatewayStatus: string;
  lastChecked: Date;
}

interface Log {
  timestamp: Date;
  type: string;
  message: string;
  details: any;
}

export const SystemHealth = () => {
  const [health, setHealth] = useState<SystemStatus | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedLogType, setSelectedLogType] = useState<'error' | 'payment' | 'system'>('error');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthData, logsData] = await Promise.all([
          adminService.getSystemHealth(),
          adminService.getLogs(selectedLogType)
        ]);
        setHealth(healthData);
        setLogs(logsData);
      } catch (error) {
        console.error('Failed to fetch system health:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedLogType]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />;
    }
  };

  if (isLoading) {
    return <div>Loading system health...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Health</h2>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">API Status</p>
              <p className="text-lg font-semibold mt-1">
                {health?.apiStatus.charAt(0).toUpperCase() + health?.apiStatus.slice(1)}
              </p>
            </div>
            {getStatusIcon(health?.apiStatus || '')}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Database Status</p>
              <p className="text-lg font-semibold mt-1">
                {health?.databaseStatus.charAt(0).toUpperCase() + health?.databaseStatus.slice(1)}
              </p>
            </div>
            {getStatusIcon(health?.databaseStatus || '')}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">WhatsApp Status</p>
              <p className="text-lg font-semibold mt-1">
                {health?.whatsappStatus.charAt(0).toUpperCase() + health?.whatsappStatus.slice(1)}
              </p>
            </div>
            {getStatusIcon(health?.whatsappStatus || '')}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Payment Gateway</p>
              <p className="text-lg font-semibold mt-1">
                {health?.paymentGatewayStatus.charAt(0).toUpperCase() + health?.paymentGatewayStatus.slice(1)}
              </p>
            </div>
            {getStatusIcon(health?.paymentGatewayStatus || '')}
          </div>
        </Card>
      </div>

      {/* System Logs */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">System Logs</h3>
          <select
            value={selectedLogType}
            onChange={(e) => setSelectedLogType(e.target.value as any)}
            className="border rounded p-1"
          >
            <option value="error">Error Logs</option>
            <option value="payment">Payment Logs</option>
            <option value="system">System Logs</option>
          </select>
        </div>

        <div className="space-y-4">
          {logs.map((log, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
                <span className={`text-sm font-medium ${
                  log.type === 'error' ? 'text-red-600' :
                  log.type === 'warning' ? 'text-yellow-600' :
                  'text-blue-600'
                }`}>
                  {log.type.toUpperCase()}
                </span>
              </div>
              <p className="mt-1">{log.message}</p>
              {log.details && (
                <pre className="mt-2 text-sm bg-gray-50 p-2 rounded">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="text-sm text-gray-500 text-right">
        Last Updated: {health?.lastChecked ? new Date(health.lastChecked).toLocaleString() : 'N/A'}
      </div>
    </div>
  );
};
