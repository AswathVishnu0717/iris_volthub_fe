// src/pages/Login.tsx
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/auth";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Title } = Typography;

// Styled Components for Centering
const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  width:200vh;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

const StyledCard = styled(Card)`
  width: 350px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.token, data.user);
      message.success("Login successful!");
      navigate("/dashboard");
    },
    onError: () => {
      message.error("Invalid email or password");
    },
  });

  const onFinish = (values: { email: string; password: string }) => {
    mutation.mutate(values);
  };

  return (
    <LoginContainer>
      <StyledCard>
        <Title level={3}>Login</Title>
        <Form name="loginForm" layout="vertical" onFinish={onFinish}>
          <Form.Item 
            name="email" 
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item 
            name="password" 
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={mutation.isPending}>
            Login
          </Button>
        </Form>
      </StyledCard>
    </LoginContainer>
  );
};

export default Login;
