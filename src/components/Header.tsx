"use client";

import { Space } from '@/constants/name.const';
import { setSpace } from '@/features/spaceSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/hooks';
import styles from '@styles/css/header.module.css';
import { usePathname, useRouter } from 'next/navigation';  // ✅ Next.js 13 이상에서 올바른 import
import { FaPencil } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { logout } from '@/api/apis/user/login.api';


const space = [
    { id: 0, name: Space.COMMUNITY },
    { id: 1, name: Space.SHOPPING },
    { id: 2, name: Space.ARTIST },
];

export default function Header() {
    // 페이지 이동
    const router = useRouter();

    const [isLogin, setIsLogin] = useState<boolean>(false); // 기본값 false
    const authStatus = useAuth(); // useAuth()는 항상 최신 상태를 반환
    
    useEffect(() => {
        setIsLogin(authStatus); // ✅ useAuth() 값이 변경될 때마다 상태 업데이트
    }, [authStatus]); 

    //let isLogin = useAuth();
    console.log("로그인 상태: ", isLogin)

    const dispatch = useAppDispatch();
    const spaceName = useAppSelector((state) => state.space.spaceName);

    const handleLogout = async () => {
        logout(); //토큰 모두 삭제
        setIsLogin(false);
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
                    <p onClick={handleLogout}>로그아웃</p>
                    <p>고객센터</p>
                </div>
            ) : (
                <div className={styles.sub_category}>
                    <p onClick={() => router && router.push('/auth/login')}>로그인</p>
                    <p onClick={() => router && router.push('/auth/join')}>회원가입</p>
                    <p>고객센터</p>
                </div>
            )}

            <div className={styles.writeButton} onClick={() => router.push('/createDiary')}>
                <p>다이어리 쓰기</p>
                <FaPencil size={18} color='#fff' />
            </div>
        </div>
    );
}
