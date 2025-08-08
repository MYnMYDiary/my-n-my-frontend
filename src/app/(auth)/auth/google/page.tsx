'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GoogleCallbackPage() {
    const router = useRouter()

    useEffect(() => {
        const url = new URL(window.location.href)
        const accessToken = url.searchParams.get('token')

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken)

            // refreshToken 저장
            fetch('http://localhost:8081/auth/set-refresh', {
                method: 'POST',
                credentials: 'include', // 쿠키 받아오게 설정
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(() => {
                router.push('/');
            })

        } else {
            alert('로그인 실패: 토큰 없음')
        }
    }, [])

    return <p>로그인 처리 중입니다...</p>
}