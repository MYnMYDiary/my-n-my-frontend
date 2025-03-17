'use client'

import MyDiary from "./mydiary.component"
import style from '@styles/css/mypage/mypage.module.css'

export default function ProfileContent({activeTab}: {activeTab: 'follower' | 'following' | 'diary'}) {
  return (
    <div className={style.contentFrame}>
        {activeTab === 'diary' && <MyDiary/>}
        {/* {activeTab === 'follower' && <Follower/>}
        {activeTab === 'following' && <Following/>} */}
    </div>
  )
}
