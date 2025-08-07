'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GoogleCallbackPage() {
    const router = useRouter()

    useEffect(() => {
        const url = new URL(window.location.href)
        const token = url.searchParams.get('token')

        if (token) {
            localStorage.setItem('accessToken', token)
            // 또는 쿠키에 저장하거나 상태관리로 전달
            router.push('/') // 메인 페이지로 이동
        } else {
            alert('로그인 실패: 토큰 없음')
        }
    }, [])

    return <p>로그인 처리 중입니다...</p>
}