'use client';

import { setCategory } from '@/features/spaceSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/hooks';
import style from '@/styles/category.module.css'

const category = [
    { id: 0, name: 'Home'},
    { id: 1, name: 'Monthly'},
    { id: 2, name: 'Weekly'},
    { id: 3, name: 'Daily'},
    { id: 3, name: 'Copy Notes'},
]

export default function CategoryBar() {

        const dispach = useAppDispatch();
        const categoryName = useAppSelector((state) => state.spaces.category);

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