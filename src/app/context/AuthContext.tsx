import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "student" | "teacher" | "admin";

interface User {
  id: string;
  name: string;
  role: UserRole;
  grade?: string;
  studentId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const mockUsers = [
  { id: "1", username: "alex", password: "student", name: "Alex Johnson", role: "student" as UserRole, grade: "7B", studentId: "MV12345" },
  { id: "2", username: "teacher", password: "teacher", name: "Sarah Williams", role: "teacher" as UserRole },
  { id: "3", username: "admin", password: "admin", name: "John Smith", role: "admin" as UserRole },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      const { username: _, password: __, ...userData } = foundUser;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
