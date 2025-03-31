"use client";

import { Space } from '@/constants/name.const';
import { setSpace } from '@/features/spaceSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/hooks';
import styles from '@styles/css/header.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';  // ✅ Next.js 13 이상에서 올바른 import
import { IoSearchOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { logout } from '@/api/apis/user/login.api';
import WriteDiaryButton from '@styles/styled-components/buttons/writeDiary.button';



const space = [
    { id: 'D', name: Space.COMMUNITY, url: 'diary' },
    { id: 'S', name: Space.SHOPPING, url: 'shopping' },
    { id: 'A', name: Space.ARTIST, url: 'artist' },
];

export default function Header() {

    const pathname = usePathname();
    const spaceName = pathname.split('/')[1] || '';

    // 페이지 이동
    const router = useRouter();

    const [isLogin, setIsLogin] = useState<boolean>(false); // 기본값 false
    const authStatus = useAuth(); // useAuth()는 항상 최신 상태를 반환
    
    useEffect(() => {
        setIsLogin(authStatus); // ✅ useAuth() 값이 변경될 때마다 상태 업데이트
    }, [authStatus]); 

    //let isLogin = useAuth();
    console.log("로그인 상태: ", isLogin)


    const handleLogout = async () => {
        logout(); //토큰 모두 삭제
        setIsLogin(false);
    }

    return (
        <div className={styles.headerBox}>
            <img src='/mynmyLogo_v1.png' onClick={() => router.push('/')} />

            <div className={styles.main_category}>
                {space.map((s) => (
                    <h3 key={s.id}
                        className={spaceName === s.url ? styles.selected : ''} 
                        onClick={() => router.push(`/${s.url}`)}
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

            <WriteDiaryButton text='다이어리 쓰기' w={150} />
        </div>
    );
}
