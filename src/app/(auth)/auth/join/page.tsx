'use client';

import style from '@/styles/auth.module.css'
import { useRouter } from 'next/navigation';

export default function Join() {

    const router = useRouter();

    return(
        <div className={style.auth_box}>
            <img src='/mynmyLogo_v4.png' onClick={() => router.push('/')}/>

            <div className={style.join}>

                <div className={style.join_input}>
                    <input type='text' placeholder='이메일'/>
                </div>

                <button type='button' className={style.btnAuth}>인증번호 보내기</button>

                <div className={style.join_input}>
                    <input type='text' placeholder='인증번호'/>
                </div>

                <button type='button' className={style.btnAuth}>인증하기</button>

                <div className={style.join_input}>
                    <input type='password' placeholder='비밀번호'/>
                </div>

                <div className={style.join_input}>
                    <input type='password' placeholder='비밀번호 확인'/>
                </div>

                <div className={style.join_input}>
                    <input type='text' placeholder='닉네임'/>
                </div>
            </div>

            <button type='button' className={style.btnSave}>가입하기</button>
        </div>
    )
}