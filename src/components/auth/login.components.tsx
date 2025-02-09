"use client";

import { loginWithEmail } from '@/api/apis/user/login.api';
import style from '@styles/css/auth.module.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function LoginForm() {

    //로그인시 api로 보내기 위한 상태값
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const router = useRouter();

    const handleLogin = async() => {
        try {
            const accessToken = await loginWithEmail({ user: { email, password } });
            localStorage.setItem("accessToken", accessToken); // ✅ accessToken 저장
            // ✅ 쿠키가 완전히 반영될 시간을 주기 위해 `setTimeout()` 추가
            setTimeout(() => {
                router.replace('/');
            }, 500); // 0.5초 대기 후 이동
        } catch (error) {
            console.error(error);
            alert("로그인 실패!");
        }
    };

    return(
        <>         
            <div className={style.login}>
                <div className={style.login_input}>
                    <input type='text' placeholder='이메일' onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className={style.login_input}>
                    <input type='password' placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>

            <button className={style.login_button} onClick={handleLogin}>로그인</button>
        </>
    )
}