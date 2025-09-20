import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

export default function ProtectedRoute({ children,requiredRole }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    
    return <Navigate to="/login" replace />;
  }
  if(requiredRole && role !== requiredRole){
    return <Navigate to="/dashboard" replace />;
  }


  return <>{children}</>;
}
