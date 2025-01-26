'use client';

import style from '@/styles/auth.module.css'
import { useRouter } from 'next/navigation';


export default function Login() {

    const router = useRouter();

    return(
        <div className={style.login_box}>
            <img src='/mynmyLogo_v4.png' onClick={() => router.push('/')}/>
            
            <div className={style.login}>
                <div className={style.login_input}>
                    <input type='text' placeholder='이메일'/>
                </div>

                <div className={style.login_input}>
                    <input type='password' placeholder='비밀번호'/>
                </div>
            </div>

            <button className={style.login_button}>로그인</button>

            <div className={style.option_box}>
                <p>비밀번호 재설정</p>
                <p>회원가입</p>
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