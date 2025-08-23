import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

// Define the type for the JWT payload
interface DecodedToken {
  userId: string;
}

// Define the type for the context value
interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the type for the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// ✅ Give `createContext` the proper type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");

      if (storedToken) {
        const decodedToken = jwtDecode<DecodedToken>(storedToken);
        setUserId(decodedToken.userId);
        setToken(storedToken);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, userId, setUserId, isLogin, setIsLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to avoid `undefined` issue
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
