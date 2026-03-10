import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type EmailContextType = {
  email: string | undefined;
  setEmail: React.Dispatch<SetStateAction<string | undefined>>;
};

const EmailContext = createContext<EmailContextType | null>(null);

export function EmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | undefined>();
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmailContext() {
  const ctx = useContext(EmailContext);
  if (!ctx) throw new Error("Debe proporcionar el EmailProvider");
  return ctx;
}
