import React, { createContext, useContext, useState } from 'react';

interface MyPageModalContextType {
  isOpen: boolean;
  selectedDiary: any | null; // 필요한 타입으로 변경하세요
  openModal: (diary: any) => void;
  closeModal: () => void;
}

const MyPageModalContext = createContext<MyPageModalContextType | undefined>(undefined);

export function MyPageModalProvider({ children }: { children: React.ReactNode }) {
  
  const [isOpen, setIsOpen] = useState(true);
  const [selectedDiary, setSelectedDiary] = useState(null);

  const openModal = (diary: any) => {
    setSelectedDiary(diary);
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setSelectedDiary(null);
  };

  return (
    <MyPageModalContext.Provider value={{ isOpen, selectedDiary, openModal, closeModal }}>
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