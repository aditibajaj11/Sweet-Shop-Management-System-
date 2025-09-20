import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RegisterForm, { RegisterFormData } from "./components/RegisterForm";
import LoginForm, { LoginFormData } from "./components/LoginForm";
import { registerUser, loginUser } from "./api/auth";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      
      <Route
        path="/register"
        element={
          <RegisterForm
            onSubmit={async (data: RegisterFormData) => {
              try {
                const res = await registerUser(data);
                alert("Registration successful!");
                console.log("Register response:", res);
                navigate("/login");
              } catch (err: any) {
                alert("Registration failed: " + err.message);
              }
            }}
          />
        }
      />

      
      <Route
        path="/login"
        element={
          <LoginForm
            onSubmit={async (data: LoginFormData) => {
              try {
                const res = await loginUser(data);
                alert("Login successful!");
                console.log("Login response:", res);
                if (res.token) {
                  localStorage.setItem("token", res.token);
                  if (res.user?.role) {
                    localStorage.setItem("role", res.user.role);
                  }
                  navigate("/dashboard"); 
                }

;
              } catch (err: any) {
                alert("Login failed: " + err.message);
              }
            }}
          />
        }
      />
    
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
