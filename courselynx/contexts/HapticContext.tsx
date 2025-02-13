import React, { createContext, ReactNode, useState } from "react";
import * as Haptics from "expo-haptics";

interface HapticContextType {
  isHapticEnabled: boolean;
  toggleHaptic: () => void;
}

const defaultValue: HapticContextType = {
  isHapticEnabled: false,
  toggleHaptic: () => {},
};

interface HapticProviderProps {
  children: ReactNode;
}

export const HapticContext = createContext<HapticContextType>(defaultValue);

export const HapticProvider: React.FC<HapticProviderProps> = ({ children }) => {
  const [isHapticEnabled, setIsHapticEnabled] = useState(false);

  const toggleHaptic = () => {
    setIsHapticEnabled((prev) => {
      if (!prev) {
        Haptics.selectionAsync();
      }
      return !prev;
    });
  };

  return (
    <HapticContext.Provider value={{ isHapticEnabled, toggleHaptic }}>
      {children}
    </HapticContext.Provider>
  );
};
