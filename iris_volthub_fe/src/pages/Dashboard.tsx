// src/pages/Dashboard.tsx
import { Button, Typography } from "antd";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Welcome to Dashboard</Title>
      <Button type="primary" danger onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
