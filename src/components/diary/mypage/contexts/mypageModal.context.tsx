import { DiaryType } from '@/interfaces/diary/list-diary.interface';
import React, { createContext, useContext, useState } from 'react';

interface MyPageModalContextType {
  isOpen: boolean;
  selectedDiary: any | null; // 필요한 타입으로 변경하세요
  selectedCategory: string | null;
  selectedYear: string | null;
  selectedMonth: string | null;
  openModal: (diary: any) => void;
  closeModal: () => void;
  setSelectedYear: (year: string | null) => void;
  setSelectedMonth: (month: string | null) => void;
  setSelectedCategory: (category: string | null) => void;
}

const MyPageModalContext = createContext<MyPageModalContextType | undefined>(undefined);

export function MyPageModalProvider({ children }: { children: React.ReactNode }) {
  
  const [isOpen, setIsOpen] = useState<boolean>(false); // 모달 열림 여부
  const [selectedDiary, setSelectedDiary] = useState<number | null>(null); // 선택된 다이어리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 선택된 카테고리
  const [selectedYear, setSelectedYear] = useState<string | null>(null); //선택한 다이어리의 연도
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null); //선택한 다이어리의 월


  const openModal = (diary: DiaryType) => {
    setSelectedDiary(diary.id);
    setSelectedYear(diary.year);
    setSelectedMonth(diary.month);
    setSelectedCategory(diary.categoryid);
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setSelectedDiary(null);
    setSelectedYear(null);
    setSelectedMonth(null);
    setSelectedCategory(null);
  };

  return (
    <MyPageModalContext.Provider value={{ 
      isOpen, 
      selectedDiary, 
      selectedCategory,
      selectedYear, 
      selectedMonth, 
      openModal, 
      closeModal,
      setSelectedYear,
      setSelectedMonth,
      setSelectedCategory
    }}>
      {children}
    </MyPageModalContext.Provider>
  );
}

export function useMyPageModal() {
  const context = useContext(MyPageModalContext);
  if (context === undefined) {
    throw new Error('useMyPageModal must be used within a MyPageModalProvider');
  }
  return context;
}