'use client'

import { MyDiaryCategoryProvider } from "./contexts/mydiaryCategory.context"
import MyDiary from "./mydiary.component"
import style from '@styles/css/mypage/mypage.module.css'

export default function MyContents({activeTab}: {activeTab: 'follower' | 'following' | 'diary'}) {
  return (
    <div className={style.contentFrame}>
      {/* 다이어리 */}
      {activeTab === 'diary' && 
        <MyDiaryCategoryProvider>
          <MyDiary/>
        </MyDiaryCategoryProvider>
      }

        {/* {activeTab === 'follower' && <Follower/>}
        {activeTab === 'following' && <Following/>} */}
    </div>
  )
}
