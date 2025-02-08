import LoginForm from '@/components/auth/login.components'
import style from '@styles/css/auth.module.css'
import { NextResponse } from 'next/server';

export default function LoginPage() {

    return(
        <div className={style.auth_box}>

            <LoginForm/>

            <p className={style.desc}>SNS 계정으로 간편하게 로그인 / 회원가입</p>

            <div className={style.socialLogin}>
                <img src='/btn_naver.svg'/>
                <img src='/btn_kakao.svg'/>
                <img src='/btn_google.svg'/>
            </div>
        </div>
    )
}