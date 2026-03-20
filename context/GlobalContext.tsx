import { getCurrentUser } from "@/lib/appwrite";
import { Moment } from "moment";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface TripStyle {
  name: string;
  lat: number;
  lon: number;
  mapUrl: string;
  photo: string;
  traveler: {
    id: number;
    title: string;
    desc: string;
    icon: string;
    people: string;
  };
  startDate: Moment;
  endDate: Moment;
  totalNumberOfDays: number;
  budget: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  trip: TripStyle | null;
  setTrip: React.Dispatch<React.SetStateAction<TripStyle | null>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [trip, setTrip] = useState<TripStyle | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setUser(res);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading,
        trip,
        setTrip,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;
