import { createContext, useContext, useState } from "react";

interface MyDiaryCategoryContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

const MyDiaryCategoryContext = createContext<MyDiaryCategoryContextType | undefined>(undefined);

export function MyDiaryCategoryProvider({ children }: { children: React.ReactNode }) {

  const date = new Date();
  const currentyear = date.getFullYear().toString();
  const currentmonth = (date.getMonth() + 1).toString();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('001');
  const [selectedYear, setSelectedYear] = useState<string>(currentyear);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentmonth);

  return (
    <MyDiaryCategoryContext.Provider value={{ selectedCategory, setSelectedCategory, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }}>
      {children}
    </MyDiaryCategoryContext.Provider>
  );
}

export function useMyDiaryCategory() {
  const context = useContext(MyDiaryCategoryContext);
  if (context === undefined) {
    throw new Error('useMyDiaryCategory must be used within a MyDiaryCategoryProvider');
  }
  return context;
}