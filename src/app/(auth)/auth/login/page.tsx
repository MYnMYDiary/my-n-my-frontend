'use client';

import { useLoginWithEmail } from '@/features/\buser/userApi';
import style from '@/styles/auth.module.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Login() {

    //로그인시 api로 보내기 위한 상태값
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const {login} = useLoginWithEmail();

    const handleLogin = () => {
        login(email, password);
    }



    return(
        <div className={style.auth_box}>
            <img src='/mynmyLogo_v4.png' onClick={() => router.push('/')}/>
            
            <div className={style.login}>
                <div className={style.login_input}>
                    <input type='text' placeholder='이메일' onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className={style.login_input}>
                    <input type='password' placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>

            <button className={style.login_button} onClick={handleLogin}>로그인</button>

            <div className={style.option_box}>
                <p>비밀번호 재설정</p>
                <p onClick={() => router.push('/auth/join')}>회원가입</p>
            </div>

            <p className={style.desc}>SNS 계정으로 간편하게 로그인 / 회원가입</p>

            <div className={style.socialLogin}>
                <img src='/btn_naver.svg'/>
                <img src='/btn_kakao.svg'/>
                <img src='/btn_google.svg'/>
            </div>
        </div>
    )
}