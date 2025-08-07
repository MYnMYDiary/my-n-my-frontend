import LoginForm from '@/components/auth/login.components'
import style from '@styles/css/auth.module.css'
import { redirect } from 'next/navigation'

export default function LoginPage() {

    return(
        <div className={style.auth_box}>

            <a href='/'> <img src='/mynmyLogo_v4.png'/></a>

            <LoginForm/>

            <div className={style.option_box}>
                <a><p>비밀번호 재설정</p></a>
                <a href='/auth/join'><p>회원가입</p></a>
            </div>

            <p className={style.desc}>SNS 계정으로 간편하게 로그인 / 회원가입</p>

            <div className={style.socialLogin}>
                <img src='/btn_naver.svg'/>
                <img src='/btn_kakao.svg'/>
                <a href="http://localhost:8081/oauth2/authorization/google">
                    <img src='/btn_google.svg'/>
                </a>
            </div>
        </div>
    )
}