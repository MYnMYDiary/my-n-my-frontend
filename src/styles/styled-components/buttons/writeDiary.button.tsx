'use client'

import { FaPencil } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
interface WriteDiaryButtonProps {
  text: string;
  w: number;
}

/**
 * 다이어리 쓰기 버튼
 * @param text 버튼 텍스트
 * @param w 버튼 너비
 * @returns 
 */
export default function writeDiaryButton({text, w}: WriteDiaryButtonProps) {

  const router = useRouter();

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    width: `${w}px`,
    height: '53px',
    borderRadius: '8px',
    backgroundColor: '#f26689',
    color: 'white',
    fontSize: '17px',
    fontFamily: 'Cafe24Ssurround',
    justifyContent: 'center',
    padding: '0px 10px',
    boxSizing: 'border-box',
  }

  return (
    <div style={buttonStyle} onClick={() => router.push('/createDiary')}>
      <p style={{color: '#fff'}}>{text}</p>
      <FaPencil size={18} color='#fff' />
    </div>
  )
}
