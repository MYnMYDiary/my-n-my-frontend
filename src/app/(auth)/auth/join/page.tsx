'use client';

import { AuthInfoType, useJoinWithEmail, useSendAuthEmail, useVerityEmail } from '@/features/auth/authApi';
import style from '@styles/css/auth.module.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Join() {

    const [email, setEmail] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [confirmPwdMessage, setconfirmPwdMessage] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');


    // 페이지 이동
    const router = useRouter();

    // API 통신
    const {sendEmail} = useSendAuthEmail();
    const {sendVerifyCode, isSuccess} = useVerityEmail();
    const {joinEmail} = useJoinWithEmail()

    /**
     * 비밀번호 확인 함수
     */
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckPassword = e.target.value;
        setCheckPassword(newCheckPassword);  // 비동기 상태 업데이트

        // 즉시 비교하기 위해 newCheckPassword를 활용
        if (password === newCheckPassword) {
            setconfirmPwdMessage('');
        } else {
            setconfirmPwdMessage('비밀번호가 일치하지 않습니다.');
        }
    };

    const handleJoin = () => {
        if(email == ''){ alert('이메일을 입력해주세요'); return; }
        if(!isSuccess){ alert('이메일 인증을 완료해주세요'); return; }
        if(password == ''){ alert('비밀번호를 입력해주세요'); return; }
        if(checkPassword == ''){ alert('비밀번호를 확인해주세요'); return; }
        if(nickname == ''){ alert('닉네임을 입력해주세요'); return; }

        joinEmail({email,password,nickname});
    }

    return(
        <div className={style.auth_box}>
            <img src='/mynmyLogo_v4.png' onClick={() => router.push('/')}/>

            <div className={style.join}>

                <div className={style.join_input}>
                    <input type='text' placeholder='이메일' onChange={(e) => setEmail(e.target.value) }/>
                </div>

                <button type='button' className={style.btnAuth} onClick={() => sendEmail({email})}>인증번호 보내기</button>

                <div className={style.join_input}>
                    <input type='text' placeholder='인증번호' onChange={(e) => setCode(e.target.value)}/>
                </div>

                <button type='button' className={style.btnAuth} onClick={() => sendVerifyCode({email, code})}>인증하기</button>
                {isSuccess ?<p className={style.confirmMessage}>인증되었습니다.</p> : ''}
                <div className={style.join_input}>
                    <input type='password' placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className={style.join_input}>
                    <input type='password' placeholder='비밀번호 확인' onChange={handlePassword}/>
                </div>
                <p className={style.confirmMessage}>{confirmPwdMessage}</p>

                <div className={style.join_input}>
                    <input type='text' placeholder='닉네임' onChange={(e)=>setNickname(e.target.value)}/>
                </div>
            </div>

            <button type='button' className={style.btnSave} onClick={handleJoin}>가입하기</button>
        </div>
    )
}