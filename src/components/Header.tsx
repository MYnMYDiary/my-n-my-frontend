'use client';

import { Space } from '@/constants/name.const'
import { setSpace } from '@/features/spaceSlice';
import { dispach, useAppDispatch, useAppSelector } from '@/hooks/redux/hooks'
import styles from '@/styles/header.module.css'
import { IoIosArrowDown } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'

const space = [
    { id: 0, name: Space.COMMUNITY },
    { id: 1, name: Space.SHOPPING },
    { id: 2, name: Space.ARITST },
]

export default function Header(){

    const dispach = useAppDispatch();
    const spaceName = useAppSelector((state) => state.spaces.spaceName);




    return(
        <div className={styles.headerBox}>

        <img src='/mynmyLogo_v1.png'/>
        
        <div className={styles.main_category}>
            {space.map( s => (
                <h3 
                    className={spaceName == s.name ? styles.selected : ''} 
                    key={s.id}
                    onClick={() => dispach(setSpace(s.name))}
                >
                    {s.name}
                </h3>
            ))}
        </div>

        <div className={styles.searchBox}>
            <IoSearchOutline size={20} color='#f26689' />
            <input type='text' placeholder='통합검색'/>
        </div>

        <div className={styles.sub_category}>
            <p>로그인</p>
            <p>회원가입</p>
            <p>고객센터</p>
        </div>
        
        <div className={styles.writeButton}>
            <p>다이어리 쓰기</p>
            <IoIosArrowDown size={20} color='#white' />
        </div>
      </div>
    )
}