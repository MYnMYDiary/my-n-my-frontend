"use client";

import { Space } from '@/constants/name.const'
import { setSpace } from '@/features/spaceSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/hooks'
import styles from '@styles/css/header.module.css'
import { useRouter } from 'next/navigation';
import { FaPencil } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5'

const space = [
    { id: 0, name: Space.COMMUNITY },
    { id: 1, name: Space.SHOPPING },
    { id: 2, name: Space.ARITST },
]

export default function Header(){

    const router = useRouter();
    const dispach = useAppDispatch();
    const spaceName = useAppSelector((state) => state.space.spaceName);
    const isLogin = useAppSelector((state) => state.user.isLogin);



    return(
        <div className={styles.headerBox}>

        <img src='/mynmyLogo_v1.png' onClick={() => router.push('/')}/>
        
        <div className={styles.main_category}>
            {space.map( s => {
                return(
                <h3 
                    className={spaceName == s.name ? styles.selected : ''} 
                    key={s.id}
                    onClick={() => dispach(setSpace(s.name))}
                >
                    {s.name}
                </h3>
            )}
            )}
        </div>

        <div className={styles.searchBox}>
            <IoSearchOutline size={20} color='#f26689' />
            <input type='text' placeholder='통합검색'/>
        </div>

        {isLogin ?
            <div className={styles.sub_category}>
                <p onClick={() => router.push('/mypage')}>마이페이지</p>
                <p>로그아웃</p>
            <p>고객센터</p>
            </div>

         :
            <div className={styles.sub_category}>
                <p onClick={() => router.push('/auth/login')}>로그인</p>
                <p onClick={() => router.push('/auth/join')}>회원가입</p>
                <p>고객센터</p>
            </div>
        }
        
        <div className={styles.writeButton} onClick={() => router.push('/createDiary')}>
            <p>다이어리 쓰기</p>
            <FaPencil size={18} color='#white' />
        </div>
      </div>
    )
}