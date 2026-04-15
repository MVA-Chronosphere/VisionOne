import { useState } from "react";
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
  const [hasReadInstructions, setHasReadInstructions] = useState(false);
  const test = mockTests[testId || "1"];

  if (!test) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800">Test not found</h2>
          <button
            onClick={() => navigate("/tests")}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
          className="text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          ← Back to Test List
        </button>

        {/* Test Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {test.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                {test.subject && (
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                    {test.subject}
                  </span>
                )}
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                  {test.status}
                </span>
              </div>
            </div>
          </div>

          {/* Test Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
            <div className="text-center border border-gray-200 rounded-md p-4">
              <div className="w-14 h-14 bg-blue-600 rounded-md flex items-center justify-center mx-auto mb-3">
                <Calendar size={24} className="text-white" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <p className="font-semibold text-gray-900">{test.date}</p>
            </div>
            <div className="text-center border border-gray-200 rounded-md p-4">
              <div className="w-14 h-14 bg-blue-600 rounded-md flex items-center justify-center mx-auto mb-3">
                <Clock size={24} className="text-white" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="font-semibold text-gray-900">{test.duration} min</p>
            </div>
            <div className="text-center border border-gray-200 rounded-md p-4">
              <div className="w-14 h-14 bg-blue-600 rounded-md flex items-center justify-center mx-auto mb-3">
                <BookOpen size={24} className="text-white" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Questions</p>
              <p className="font-semibold text-gray-900">{test.totalQuestions}</p>
            </div>
            <div className="text-center border border-gray-200 rounded-md p-4">
              <div className="w-14 h-14 bg-blue-600 rounded-md flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} className="text-white" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Total Marks</p>
              <p className="font-semibold text-gray-900">{test.totalMarks}</p>
            </div>
          </div>
        </div>

        {/* For Upcoming Tests - Show Only Schedule */}
        {test.status === "Upcoming" && (
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Test Scheduled
              </h2>
              <div className="max-w-md mx-auto">
                <div className="rounded-md p-6 mb-6">
                  <p className="text-gray-700 mb-3">This test is scheduled for:</p>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-gray-900">{test.date}</p>
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
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Test Completed
              </h2>
              <div className="max-w-md mx-auto">
                <div className="bg-blue-50 rounded-md p-8 mb-6">
                  <p className="text-gray-700 mb-2">Your Score</p>
                  <p className="text-5xl font-bold text-blue-600 mb-4">{test.score}</p>
                  <p className="text-gray-600">Submitted on {test.date} at {test.time}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* For Active Tests - Show Instructions and Rules in a Single Professional Card */}
        {test.status === "Active" && (
          <div className="bg-white rounded-md p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-3">About This Test</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{test.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Instructions</h3>
              <div className="space-y-4 text-gray-700 leading-7">
                {test.instructions.map((instruction: string, index: number) => (
                  <p key={index}>{index + 1}. {instruction}</p>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Important Rules</h3>
              <div className="space-y-4 text-gray-700 leading-7">
                {test.rules.map((rule: string, index: number) => (
                  <p key={index}>{index + 1}. {rule}</p>
                ))}
              </div>
            </div>

            <div className="mb-8 border-t border-gray-200 pt-6 text-gray-700 leading-7">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Test Details</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <p><strong>Duration:</strong> {test.duration} minutes</p>
                <p><strong>Questions:</strong> {test.totalQuestions}</p>
                <p><strong>Date:</strong> {test.date}</p>
                <p><strong>Time:</strong> {test.time}</p>
                <p><strong>Total Marks:</strong> {test.totalMarks}</p>
                <p><strong>Status:</strong> {test.status}</p>
              </div>
            </div>

            <div className="mb-6 text-gray-700 leading-7">
              <p className="font-semibold text-gray-900 mb-3">Time Limit</p>
              <p>The timer will start immediately when you click "Start Test". The test will be submitted automatically when the time expires.</p>
            </div>

            <label className="flex items-start gap-3 mb-6 text-gray-700">
              <input
                type="checkbox"
                checked={hasReadInstructions}
                onChange={(event) => setHasReadInstructions(event.target.checked)}
                className="w-6 h-6 mt-1 text-blue-600 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-base font-medium leading-6">
                I have read and understood the instructions and rules.
              </span>
            </label>

            <button
              onClick={handleStartTest}
              disabled={!hasReadInstructions}
              className={`w-full py-5 rounded-md font-semibold text-lg transition-colors ${hasReadInstructions ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Start Test Now
            </button>

            <p className="text-center text-gray-500 mt-4">
              By clicking "Start Test Now", you agree to follow the instructions and important rules listed above.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
