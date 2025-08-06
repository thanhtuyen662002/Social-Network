import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import "./index.css";
import LoginPage from "./app/login/page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  // Route for all 404
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </AuthProvider>
  </React.StrictMode>
);
