import { useState } from "react";
import { useNavigate } from "react-router";
import { Layout } from "../components/Layout";
import { FileText, Calendar } from "lucide-react";

const mockForms = [
  {
    id: 1,
    title: "Event Participation Form",
    date: "May 30, 2024",
    category: "Events",
    status: "Pending",
    description: "Submit which event you want to participate in",
  },
  {
    id: 2,
    title: "Midterm Grade Submission",
    date: "June 5, 2024",
    category: "Grades",
    status: "Pending",
    description: "Teacher grade submission for midterm exams",
  },
  {
    id: 3,
    title: "Field Trip Permission",
    date: "May 20, 2024",
    category: "Events",
    status: "Submitted",
    description: "Permission slip for upcoming field trip",
  },
  {
    id: 4,
    title: "Library Book Request",
    date: "May 15, 2024",
    category: "Library",
    status: "Submitted",
    description: "Request new books for the library",
  },
];

export function FormsList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "pending" | "submitted">("all");

  const filteredForms = mockForms.filter((form) => {
    if (filter === "all") return true;
    return form.status.toLowerCase() === filter;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Forms</h2>
          <p className="text-gray-500">Manage and submit your forms</p>
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
            onClick={() => setFilter("pending")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              filter === "pending"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("submitted")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              filter === "submitted"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Submitted
          </button>
        </div>

        {/* Forms List */}
        <div className="grid gap-4">
          {filteredForms.map((form) => (
            <div
              key={form.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="flex items-center gap-6">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    form.status === "Pending"
                      ? "bg-blue-100 text-blue-500"
                      : "bg-green-100 text-green-500"
                  }`}
                >
                  <FileText size={28} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {form.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{form.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      <span>{form.date}</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                      {form.category}
                    </span>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      form.status === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {form.status}
                  </span>
                  {form.status === "Pending" && (
                    <button
                      onClick={() => navigate(`/forms/${form.id}`)}
                      className="px-8 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors shadow-md"
                    >
                      Open
                    </button>
                  )}
                  {form.status === "Submitted" && (
                    <button
                      onClick={() => navigate(`/forms/${form.id}`)}
                      className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      View
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
