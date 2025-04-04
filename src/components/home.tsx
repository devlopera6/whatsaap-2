import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardOverview from "./dashboard/DashboardOverview";
import DashboardLayout from "./dashboard/DashboardLayout";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Only render the dashboard overview on the home page
  return (
    <DashboardLayout>
      <DashboardOverview
        onViewAllOrders={() => navigate("/orders")}
        onViewAllCustomers={() => navigate("/customers")}
        onViewReports={() => navigate("/reports")}
      />
    </DashboardLayout>
  );
};

export default Home;
