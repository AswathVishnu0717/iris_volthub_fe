// src/api/auth.ts
import axios from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

export const loginApi = async ({ email, password }: LoginRequest) => {
  const response = await axios.post("/api/login", { email, password });
  return response.data;
};
