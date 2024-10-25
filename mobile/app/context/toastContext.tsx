// context/ToastContext.tsx
import React, { createContext, useContext, useRef, useState } from "react";
import Toast, { ToastType } from "../components/toast";

interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<ToastType>("info");
  const [duration, setDuration] = useState<number>(3000);

  const showToast = (
    msg: string,
    toastType: ToastType = "info",
    toastDuration: number = 3000
  ) => {
    setMessage(msg);
    setType(toastType);
    setDuration(toastDuration);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, toastDuration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={message}
        visible={visible}
        type={type}
        duration={duration}
        onHide={() => setVisible(false)}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
