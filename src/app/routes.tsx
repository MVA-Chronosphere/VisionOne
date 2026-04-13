import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { FormsList } from "./pages/FormsList";
import { FormFilling } from "./pages/FormFilling";
import { TestsList } from "./pages/TestsList";
import { TestInformation } from "./pages/TestInformation";
import { TestTaking } from "./pages/TestTaking";
import { Appointments } from "./pages/Appointments";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: "/forms",
    element: <ProtectedRoute><FormsList /></ProtectedRoute>,
  },
  {
    path: "/forms/:formId",
    element: <ProtectedRoute><FormFilling /></ProtectedRoute>,
  },
  {
    path: "/tests",
    element: <ProtectedRoute><TestsList /></ProtectedRoute>,
  },
  {
    path: "/tests/:testId",
    element: <ProtectedRoute><TestInformation /></ProtectedRoute>,
  },
  {
    path: "/tests/:testId/attempt",
    element: <ProtectedRoute><TestTaking /></ProtectedRoute>,
  },
  {
    path: "/appointments",
    element: <ProtectedRoute><Appointments /></ProtectedRoute>,
  },
  {
    path: "/admin",
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
  },
]);