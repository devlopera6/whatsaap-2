import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import OrderManagement from "./components/dashboard/OrderManagement";
import InventoryManagement from "./components/dashboard/InventoryManagement";
import PaymentTracking from "./components/dashboard/PaymentTracking";
import CustomerEngagement from "./components/dashboard/CustomerEngagement";
import SubscriptionManagement from "./components/dashboard/SubscriptionManagement";
import Settings from "./components/dashboard/Settings";
import WhatsAppBotConfig from "./components/dashboard/WhatsAppBotConfig";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { BusinessList } from "./components/admin/BusinessList";
import { RevenueOverview } from "./components/admin/RevenueOverview";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AnalyticsDashboard } from "./components/admin/AnalyticsDashboard";
import { SystemHealth } from "./components/admin/SystemHealth";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="businesses" element={<BusinessList />} />
            <Route path="revenue" element={<RevenueOverview />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="system" element={<SystemHealth />} />
            <Route path="support" element={<AdminDashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Existing Dashboard Routes */}
          <Route path="/orders" element={<DashboardLayout />}>
            <Route index element={<OrderManagement />} />
          </Route>
          <Route path="/inventory" element={<DashboardLayout />}>
            <Route index element={<InventoryManagement />} />
          </Route>
          <Route path="/payments" element={<DashboardLayout />}>
            <Route index element={<PaymentTracking />} />
          </Route>
          <Route path="/customers" element={<DashboardLayout />}>
            <Route index element={<CustomerEngagement />} />
          </Route>
          <Route path="/messages" element={<DashboardLayout />}>
            <Route
              index
              element={<CustomerEngagement activeTab="messaging" />}
            />
          </Route>
          <Route path="/subscription" element={<DashboardLayout />}>
            <Route index element={<SubscriptionManagement />} />
          </Route>
          <Route path="/settings" element={<DashboardLayout />}>
            <Route index element={<Settings />} />
          </Route>
          <Route path="/whatsapp-bot" element={<DashboardLayout />}>
            <Route index element={<WhatsAppBotConfig />} />
          </Route>
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
