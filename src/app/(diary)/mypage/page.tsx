'use client' // 마이페이지같은 경우 SEO가 중요하지 않기 때문에 클라이언트 컴포넌트로 만듬

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ProfileContent from '@/components/diary/mypage/profileContent.component'
import style from '@styles/css/mypage/mypage.module.css'
import DetailDiary from '@/components/diary/detailDiary.component'
import { MyPageModalProvider } from '@/components/diary/mypage/contexts/mypageModal.context'

const Profile = dynamic(() => import('@/components/diary/mypage/profile.component'), {
  ssr: false
})

export default function Page() {

  const [activeTab, setActiveTab] = useState<'follower' | 'following' | 'diary'>('diary')

  return (
    <MyPageModalProvider>
      <div className={style.frame}>
        <Profile setActiveTab={setActiveTab} />
        <ProfileContent activeTab={activeTab} />

        <DetailDiary/>
      </div>
    </MyPageModalProvider>
  )
}
