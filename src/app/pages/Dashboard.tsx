import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Layout } from "../components/Layout";
import { FileText, ClipboardCheck, Calendar, TrendingUp, Users, UserCheck } from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "pending" | "submitted">("all");

  // Mock data
  const stats = {
    forms: { pending: 2, total: 5 },
    tests: { active: 1, total: 3 },
    appointments: { upcoming: 2, total: 4 },
  };

  const recentItems = [
    {
      id: 1,
      title: "Event Participation Form",
      date: "May 30, 2024",
      category: "Events",
      status: "Pending",
      type: "form",
    },
    {
      id: 2,
      title: "Science Quiz",
      date: "Today, 2:00 PM",
      category: "Tests",
      status: "Active",
      type: "test",
    },
    {
      id: 3,
      title: "School Counselor Appointment",
      date: "May 19, 2025 - 2:00 PM",
      category: "Appointments",
      status: "Confirmed",
      type: "appointment",
    },
    {
      id: 4,
      title: "Midterm Grade Submission",
      date: "June 5, 2024",
      category: "Grades",
      status: "Pending",
      type: "form",
    },
  ];

  const filteredItems = recentItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "pending") return item.status === "Pending";
    if (filter === "submitted") return item.status === "Submitted" || item.status === "Confirmed";
    return true;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="mb-2">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Welcome, {user?.name}!</h2>
          <p className="text-lg text-gray-500">Here's what's happening today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-8">
          <button
            onClick={() => navigate("/forms")}
            className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-10 text-left hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="bg-blue-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
              <FileText size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-blue-900 mb-2">Forms</h3>
            <p className="text-4xl font-bold text-blue-600 mb-2">{stats.forms.pending}</p>
            <p className="text-base text-blue-700">Pending</p>
          </button>

          <button
            onClick={() => navigate("/tests")}
            className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-3xl p-10 text-left hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="bg-teal-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
              <ClipboardCheck size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-teal-900 mb-2">Tests</h3>
            <p className="text-4xl font-bold text-teal-600 mb-2">{stats.tests.active}</p>
            <p className="text-base text-teal-700">Active Now</p>
          </button>

          <button
            onClick={() => navigate("/appointments")}
            className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl p-10 text-left hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="bg-amber-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
              <Calendar size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-amber-900 mb-2">Appointments</h3>
            <p className="text-4xl font-bold text-amber-600 mb-2">{stats.appointments.upcoming}</p>
            <p className="text-base text-amber-700">Upcoming</p>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
              filter === "all"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
              filter === "pending"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("submitted")}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
              filter === "submitted"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Submitted
          </button>
        </div>

        {/* Recent Items */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">Recent Items</h3>

          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === "appointment") {
                  navigate("/appointments");
                } else if (item.type === "test") {
                  navigate(`/tests/${2}`);
                } else {
                  navigate(`/${item.type}s/${item.id}`);
                }
              }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-base text-gray-500">{item.date}</p>
                </div>
                <div className="flex items-center gap-5">
                  <span className={`px-6 py-3 rounded-xl text-base font-semibold ${
                    item.status === "Active" ? "bg-green-50 text-green-600 animate-pulse" :
                    item.status === "Confirmed" ? "bg-teal-50 text-teal-600" :
                    "bg-amber-50 text-amber-600"
                  }`}>
                    {item.status}
                  </span>
                  <button className="px-8 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors text-base">
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}