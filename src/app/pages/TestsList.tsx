import { useState } from "react";
import { useNavigate } from "react-router";
import { Layout } from "../components/Layout";
import { ClipboardCheck, Calendar, Clock } from "lucide-react";

const mockTests = [
  {
    id: 1,
    title: "Math Midterm",
    date: "May 23, 2025",
    time: "10:00 AM - 11 AM",
    duration: "60 min",
    status: "Upcoming",
    description: "Chapters 1-5",
  },
  {
    id: 2,
    title: "Science Quiz",
    date: "Today",
    time: "2:00 PM",
    duration: "30 min",
    status: "Active",
    description: "Biology - Cell Structure",
  },
  {
    id: 3,
    title: "History Final",
    date: "May 13, 2025",
    time: "1:30 PM",
    duration: "90 min",
    status: "Submitted",
    score: "85%",
  },
  {
    id: 4,
    title: "English Grammar Test",
    date: "May 10, 2025",
    time: "9:00 AM",
    duration: "45 min",
    status: "Submitted",
    score: "92%",
  },
];

export function TestsList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  const filteredTests = mockTests.filter((test) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return test.status === "Upcoming" || test.status === "Active";
    return test.status === "Submitted";
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600";
      case "Upcoming":
        return "bg-amber-50 text-amber-600";
      case "Submitted":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-500";
      case "Upcoming":
        return "bg-blue-100 text-blue-500";
      case "Submitted":
        return "bg-green-100 text-green-500";
      default:
        return "bg-blue-100 text-blue-500";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Tests</h2>
          <p className="text-gray-500">View and take your scheduled tests</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              filter === "all"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              filter === "upcoming"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              filter === "completed"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Tests List */}
        <div className="grid gap-4">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="flex items-center gap-6">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getIconColor(test.status)}`}>
                  <ClipboardCheck size={28} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {test.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{test.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      <span>{test.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{test.time}</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                      {test.duration}
                    </span>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(test.status)}`}>
                    {test.status}
                  </span>
                  {test.score && (
                    <span className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium">
                      Score: {test.score}
                    </span>
                  )}
                  {test.status === "Active" && (
                    <button
                      onClick={() => navigate(`/tests/${test.id}`)}
                      className="px-8 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors shadow-md animate-pulse"
                    >
                      Start Test
                    </button>
                  )}
                  {test.status === "Upcoming" && (
                    <button
                      onClick={() => navigate(`/tests/${test.id}`)}
                      className="px-8 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors shadow-md"
                    >
                      View Details
                    </button>
                  )}
                  {test.status === "Submitted" && (
                    <button
                      onClick={() => navigate(`/tests/${test.id}`)}
                      className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}