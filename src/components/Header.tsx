"use client";  // ✅ 클라이언트 컴포넌트 선언

import { Space } from '@/constants/name.const';
import { setSpace } from '@/features/spaceSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/hooks';
import styles from '@styles/css/header.module.css';
import { useRouter } from 'next/navigation';  // ✅ Next.js 13 이상에서 올바른 import
import { FaPencil } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { logout } from '@/features/user/userSlice';

const space = [
    { id: 0, name: Space.COMMUNITY },
    { id: 1, name: Space.SHOPPING },
    { id: 2, name: Space.ARITST },  // ✅ 오타 수정
];

export default function Header() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const spaceName = useAppSelector((state) => state.space.spaceName);
    const isLogin = useAppSelector((state) => state.user.isLogin);

    const handleWriteDiary = () => {
        if(!isLogin){
            router.push('/auth/login')
        }else{
            router.push('/createDiary')
        }
    }

    return (
        <div className={styles.headerBox}>
            <img src='/mynmyLogo_v1.png' onClick={() => router.push('/')} />

            <div className={styles.main_category}>
                {space.map((s) => (
                    <h3 
                        className={spaceName === s.name ? styles.selected : ''} 
                        key={s.id}
                        onClick={() => dispatch(setSpace(s.name))}
                    >
                        {s.name}
                    </h3>
                ))}
            </div>

            <div className={styles.searchBox}>
                <IoSearchOutline size={20} color='#f26689' />
                <input type='text' placeholder='통합검색' />
            </div>

            {isLogin ? (
                <div className={styles.sub_category}>
                    <p onClick={() => router && router.push('/mypage')}>마이페이지</p>
                    <p onClick={() => dispatch(logout())}>로그아웃</p>
                    <p>고객센터</p>
                </div>
            ) : (
                <div className={styles.sub_category}>
                    <p onClick={() => router && router.push('/auth/login')}>로그인</p>
                    <p onClick={() => router && router.push('/auth/join')}>회원가입</p>
                    <p>고객센터</p>
                </div>
            )}

            <div className={styles.writeButton} onClick={handleWriteDiary}>
                <p>다이어리 쓰기</p>
                <FaPencil size={18} color='#fff' />
            </div>
        </div>
    );
}
