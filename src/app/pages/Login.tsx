import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import logo from "figma:asset/ef1c20f5ffa153316bac772691a02934f3c923f3.png";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl p-14">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <img src={logo} alt="Macro Vision Academy Logo" className="w-full max-w-md mb-8" />
            <h2 className="text-3xl font-bold text-gray-800">Login Panel</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-3 text-lg">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-5 text-xl border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-3 text-lg">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-5 text-xl border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all pr-16 bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
                >
                  {showPassword ? <EyeOff size={28} /> : <Eye size={28} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-base text-center bg-red-50 py-4 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold py-5 rounded-2xl transition-colors shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>

            <button
              type="button"
              className="w-full text-gray-500 text-base hover:text-gray-700 transition-colors pt-2"
            >
              Forgot password?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}