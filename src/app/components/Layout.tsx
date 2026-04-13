import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, FileText, ClipboardCheck, Calendar, LogOut, Menu, User, Shield } from "lucide-react";
import logo from "figma:asset/ef1c20f5ffa153316bac772691a02934f3c923f3.png";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: FileText, label: "Forms", path: "/forms" },
    { icon: ClipboardCheck, label: "Tests", path: "/tests" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
  ];

  if (user?.role === "admin") {
    navigationItems.push({ icon: Shield, label: "Admin", path: "/admin" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Macro Vision Academy Logo" className="h-20 w-auto" />
            {user?.role === "student" && user.grade && (
              <div className="ml-4">
                <p className="text-xl font-semibold text-gray-800">{user.name}</p>
                <p className="text-base text-gray-500">Grade {user.grade}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-8 py-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-lg"
          >
            <LogOut size={24} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-semibold transition-all whitespace-nowrap text-lg ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
                }`}
              >
                <Icon size={26} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}