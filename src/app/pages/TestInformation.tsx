import { useNavigate, useParams } from "react-router";
import { Layout } from "../components/Layout";
import { Clock, Calendar, AlertCircle, BookOpen, CheckCircle, Shield, Eye } from "lucide-react";

const mockTests: Record<string, any> = {
  "1": {
    id: 1,
    title: "Math Midterm",
    subject: "Mathematics",
    date: "May 23, 2025",
    time: "10:00 AM - 11:00 AM",
    duration: 60,
    status: "Upcoming",
    totalQuestions: 25,
    totalMarks: 100,
    description: "This is a comprehensive midterm examination covering chapters 1-5. The test includes algebra, geometry, and basic calculus concepts.",
    instructions: [
      "Read each question carefully before answering",
      "All questions are mandatory",
      "Each question carries equal marks",
      "No negative marking for wrong answers",
      "You can review and change answers before submitting",
    ],
    rules: [
      "Do not switch tabs or minimize the browser",
      "Do not use calculators or external devices",
      "Keep your camera on during the test (if applicable)",
      "Any suspicious activity will result in automatic submission",
      "Once submitted, answers cannot be changed",
    ],
  },
  "2": {
    id: 2,
    title: "Science Quiz",
    subject: "Biology",
    date: "Today",
    time: "2:00 PM - 2:30 PM",
    duration: 30,
    status: "Active",
    totalQuestions: 5,
    totalMarks: 50,
    description: "A quick quiz on Cell Structure and Functions. This test will evaluate your understanding of cellular biology, organelles, and their functions.",
    instructions: [
      "Read each question carefully before answering",
      "All questions are mandatory",
      "Each question carries 10 marks",
      "No negative marking for wrong answers",
      "You can navigate between questions using the question panel",
    ],
    rules: [
      "Do not switch tabs or minimize the browser",
      "Do not use any reference materials",
      "Keep the test window in full screen",
      "Any attempt to cheat will result in test termination",
      "Timer will continue even if you refresh the page",
    ],
  },
  "3": {
    id: 3,
    title: "History Final",
    date: "May 13, 2025",
    time: "1:30 PM - 3:00 PM",
    duration: 90,
    status: "Submitted",
    score: "85%",
    totalQuestions: 30,
    totalMarks: 100,
    subject: "History",
  },
  "4": {
    id: 4,
    title: "English Grammar Test",
    date: "May 10, 2025",
    time: "9:00 AM - 9:45 AM",
    duration: 45,
    status: "Submitted",
    score: "92%",
    totalQuestions: 20,
    totalMarks: 50,
    subject: "English",
  },
};

export function TestInformation() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = mockTests[testId || "1"];

  if (!test) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800">Test not found</h2>
          <button
            onClick={() => navigate("/tests")}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Back to Tests
          </button>
        </div>
      </Layout>
    );
  }

  const handleStartTest = () => {
    navigate(`/tests/${testId}/attempt`);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/tests")}
          className="text-blue-500 hover:text-blue-600 font-medium mb-6"
        >
          ← Back to Tests
        </button>

        {/* Test Header */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                {test.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                  {test.subject}
                </span>
                <span
                  className={`px-4 py-2 rounded-lg font-medium ${
                    test.status === "Active"
                      ? "bg-green-100 text-green-600 animate-pulse"
                      : test.status === "Upcoming"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {test.status}
                </span>
              </div>
            </div>
          </div>

          {/* Test Stats */}
          <div className="grid grid-cols-4 gap-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <p className="font-bold text-gray-800">{test.date}</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock size={24} className="text-teal-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="font-bold text-gray-800">{test.duration} min</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen size={24} className="text-amber-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Questions</p>
              <p className="font-bold text-gray-800">{test.totalQuestions}</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} className="text-purple-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Marks</p>
              <p className="font-bold text-gray-800">{test.totalMarks}</p>
            </div>
          </div>
        </div>

        {/* For Upcoming Tests - Show Only Schedule */}
        {test.status === "Upcoming" && (
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={40} className="text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Test Scheduled
              </h2>
              <div className="max-w-md mx-auto">
                <div className="bg-amber-50 rounded-2xl p-6 mb-6">
                  <p className="text-gray-700 mb-3">This test is scheduled for:</p>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-amber-600">{test.date}</p>
                    <p className="text-xl font-semibold text-gray-800">{test.time}</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  The test will become available at the scheduled time. Please return at the specified time to attempt the test.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* For Submitted Tests - Show Results */}
        {test.status === "Submitted" && (
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Test Completed
              </h2>
              <div className="max-w-md mx-auto">
                <div className="bg-blue-50 rounded-2xl p-8 mb-6">
                  <p className="text-gray-700 mb-2">Your Score</p>
                  <p className="text-5xl font-bold text-blue-600 mb-4">{test.score}</p>
                  <p className="text-gray-600">Submitted on {test.date} at {test.time}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* For Active Tests - Show Instructions and Rules */}
        {test.status === "Active" && (
          <>
            {/* About This Test */}
            <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">About This Test</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {test.description}
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Eye size={20} className="text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Instructions</h2>
              </div>
              <div className="space-y-3">
                {test.instructions.map((instruction: string, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl">
                    <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1 text-lg">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Rules - Anti-Cheating */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 shadow-lg mb-6 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-red-800">Important Rules - No Cheating Policy</h2>
              </div>
              <div className="space-y-3">
                {test.rules.map((rule: string, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-red-200">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800 font-medium text-lg">{rule}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-red-100 rounded-xl">
                <p className="text-red-800 font-bold text-center text-lg">
                  ⚠️ Violation of any rule will result in automatic test termination and a score of zero
                </p>
              </div>
            </div>

            {/* Timer Warning */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-1">Time Limit: {test.duration} minutes</p>
                  <p className="text-gray-600">The timer will start immediately when you click "Start Test". The test will auto-submit when time runs out.</p>
                </div>
              </div>
            </div>

            {/* Start Test Button */}
            <button
              onClick={handleStartTest}
              className="w-full py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl font-bold text-xl hover:from-green-600 hover:to-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
            >
              Start Test Now
            </button>

            <p className="text-center text-gray-500 mt-4">
              By clicking "Start Test", you agree to follow all instructions and rules mentioned above
            </p>
          </>
        )}
      </div>
    </Layout>
  );
}
