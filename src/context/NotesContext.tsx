import { createContext, useState, useContext, ReactNode } from "react";

type Summary = {
  id: string;
  originalText: string;
  summaryText: string;
  date: Date;
};

type NotesContextType = {
  originalNotes: string;
  setOriginalNotes: (notes: string) => void;
  summaryOutput: string;
  setSummaryOutput: (summary: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  summaryHistory: Summary[];
  addToHistory: (summary: Omit<Summary, "id" | "date">) => void;
  clearNotes: () => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [originalNotes, setOriginalNotes] = useState("");
  const [summaryOutput, setSummaryOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryHistory, setSummaryHistory] = useState<Summary[]>([]);

  const addToHistory = ({
    originalText,
    summaryText,
  }: Omit<Summary, "id" | "date">) => {
    const newSummary: Summary = {
      id: Date.now().toString(),
      originalText,
      summaryText,
      date: new Date(),
    };
    setSummaryHistory((prev) => [newSummary, ...prev]);
  };

  const clearNotes = () => {
    setOriginalNotes("");
    setSummaryOutput("");
  };

  return (
    <NotesContext.Provider
      value={{
        originalNotes,
        setOriginalNotes,
        summaryOutput,
        setSummaryOutput,
        isGenerating,
        setIsGenerating,
        summaryHistory,
        addToHistory,
        clearNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
