import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./authcontext";

interface SocketContextType {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

// ✅ Hook that guarantees non-null
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { authUser, userId } = useAuth();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://192.168.0.10:6000/", {
        query: { userId },
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, userId]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
