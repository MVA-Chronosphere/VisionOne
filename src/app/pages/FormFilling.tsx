import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { X, Save, Send } from "lucide-react";

const formTemplates: Record<string, any> = {
  "1": {
    title: "Event Participation Form",
    category: "Events",
    fields: [
      {
        id: "event",
        label: "Select Event",
        type: "radio",
        options: ["Science Fair", "Debate Competition", "Sports Day"],
      },
      {
        id: "reason",
        label: "Why do you want to participate?",
        type: "textarea",
      },
      {
        id: "consent",
        label: "I have parental consent",
        type: "checkbox",
      },
    ],
  },
  "2": {
    title: "Midterm Grade Submission",
    category: "Grades",
    fields: [
      {
        id: "subject",
        label: "Subject",
        type: "text",
      },
      {
        id: "grade",
        label: "Grade",
        type: "text",
      },
      {
        id: "comments",
        label: "Comments",
        type: "textarea",
      },
    ],
  },
};

export function FormFilling() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const form = formTemplates[formId || "1"];

  if (!form) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800">Form not found</h2>
          <button
            onClick={() => navigate("/forms")}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Back to Forms
          </button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/forms");
    }, 2000);
  };

  const handleSaveDraft = () => {
    alert("Draft saved successfully!");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{form.title}</h2>
              <span className="inline-block mt-2 px-4 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                {form.category}
              </span>
            </div>
            <button
              onClick={() => navigate("/forms")}
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* User Info */}
          {user?.role === "student" && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Name</p>
                  <p className="font-medium text-gray-800">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Student ID</p>
                  <p className="font-medium text-gray-800">{user.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Grade</p>
                  <p className="font-medium text-gray-800">{user.grade}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8">
          <h3 className="text-xl font-bold text-gray-800">Form Details</h3>

          {form.fields.map((field: any) => (
            <div key={field.id}>
              <label className="block text-gray-700 font-medium mb-3">
                {field.label}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  value={formData[field.id] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.id]: e.target.value })
                  }
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  value={formData[field.id] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.id]: e.target.value })
                  }
                  rows={4}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg resize-none"
                />
              )}

              {field.type === "radio" && (
                <div className="space-y-3">
                  {field.options.map((option: string) => (
                    <label
                      key={option}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name={field.id}
                        value={option}
                        checked={formData[field.id] === option}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.id]: e.target.value })
                        }
                        className="w-6 h-6 border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 focus:ring-offset-0"
                      />
                      <span className="text-lg text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {field.type === "checkbox" && (
                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData[field.id] || false}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.id]: e.target.checked })
                    }
                    className="w-6 h-6 border-2 border-gray-300 rounded bg-white"
                  />
                  <span className="text-lg text-gray-700">{field.label}</span>
                </label>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={handleSaveDraft}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-lg"
            >
              <Save size={22} />
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-md text-lg"
            >
              <Send size={22} />
              Submit
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Form Submitted!
              </h3>
              <p className="text-gray-600">
                Your form has been submitted successfully.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
