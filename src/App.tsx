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

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
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
