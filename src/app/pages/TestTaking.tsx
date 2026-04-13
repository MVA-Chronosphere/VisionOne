import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Layout } from "../components/Layout";
import { Clock, AlertCircle, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const mockTest = {
  id: 2,
  title: "Science Quiz",
  duration: 30,
  questions: [
    {
      id: 1,
      question: "What is the chemical symbol for water?",
      options: ["CO₃", "H₂O", "O₄", "CH₄"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Jupiter", "Mars", "Saturn"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "What is the speed of light?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      correctAnswer: 0,
    },
    {
      id: 5,
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Liver", "Skin", "Brain"],
      correctAnswer: 2,
    },
  ],
};

export function TestTaking() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(mockTest.duration * 60); // in seconds
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowSubmitConfirm(false);
  };

  const calculateScore = () => {
    let correct = 0;
    mockTest.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / mockTest.questions.length) * 100);
  };

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-12">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={60} className="text-green-500" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Test Submitted!</h2>
            <p className="text-xl text-gray-600 mb-8">
              {mockTest.title}
            </p>
            <div className="inline-block px-12 py-6 bg-blue-50 rounded-2xl mb-8">
              <p className="text-sm text-gray-600 mb-2">Your Score</p>
              <p className="text-5xl font-bold text-blue-600">{score}%</p>
            </div>
            <p className="text-gray-600 mb-8">
              You answered {Object.keys(answers).length} out of {mockTest.questions.length} questions
            </p>
            <button
              onClick={() => navigate("/tests")}
              className="px-12 py-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-md text-lg"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const question = mockTest.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockTest.questions.length) * 100;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Timer & Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{mockTest.title}</h2>
              <p className="text-gray-500">Question {currentQuestion + 1} of {mockTest.questions.length}</p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-xl">
              <Clock size={24} className="text-blue-600" />
              <span className={`text-2xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`w-full p-6 text-left text-lg rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                  answers[question.id] === index
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={answers[question.id] === index}
                  onChange={() => handleAnswer(question.id, index)}
                  className="w-6 h-6 border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 focus:ring-offset-0"
                />
                <span className="text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div className="flex gap-2">
            {mockTest.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-12 h-12 rounded-xl font-medium transition-all ${
                  index === currentQuestion
                    ? "bg-blue-500 text-white shadow-md"
                    : answers[mockTest.questions[index].id] !== undefined
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion < mockTest.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-md"
            >
              Next
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors shadow-md"
            >
              Submit Test
            </button>
          )}
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} className="text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Submit Test?
              </h3>
              <p className="text-gray-600 mb-2 text-center">
                You have answered {Object.keys(answers).length} out of {mockTest.questions.length} questions.
              </p>
              <p className="text-gray-600 mb-8 text-center">
                Time remaining: {formatTime(timeRemaining)}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Continue Test
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-md"
                >
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
