'use client';

import { setCategory } from '@/features/spaceSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/hooks';
import style from '@styles/css/category.module.css'
import { useEffect, useState } from 'react';

const category = [
    { id: 0, name: 'Home'},
    { id: 1, name: 'Monthly'},
    { id: 2, name: 'Weekly'},
    { id: 3, name: 'Daily'},
    { id: 4, name: 'Copy Notes'},
]

export default function CategoryBar() {

        const dispach = useAppDispatch();
        const categoryName = useAppSelector((state) => state.space.category);

        const [hydrated, setHydrated] = useState(false);

        // 클라이언트에서만 실행되도록 설정
        useEffect(() => {
            setHydrated(true);
        }, []);
    
        if (!hydrated) return null; // Hydration 문제를 방지하기 위해 서버 렌더링을 방지

    return(
        <div className={style.frame}>
            {category.map(c => (
                <div 
                    key={c.id} 
                    className={`${style.category} ${categoryName === c.name ? style.selected : ''}`}
                    onClick={() => dispach(setCategory(c.name))}
                >
                    {c.name}
                </div>
            ))}
        </div>
    )
}