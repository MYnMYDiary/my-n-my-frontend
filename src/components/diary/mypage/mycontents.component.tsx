'use client'

import { MyDiaryCategoryProvider } from "./contexts/mydiaryCategory.context"
import MyDiary from "./mydiary.component"
import style from '@styles/css/mypage/mypage.module.css'
import { TabType } from "@/app/(diary)/mypage/page"

export default function MyContents({activeTab}: {activeTab: TabType}) {
  return (
    <div className={style.contentFrame}>
      {/* 다이어리 */}
      {activeTab === TabType.DIARY && 
        <MyDiaryCategoryProvider>
          <MyDiary/>
        </MyDiaryCategoryProvider>
      }

      {/* {activeTab === TabType.FOLLOWER && <Follower/>}
      {activeTab === TabType.FOLLOWING && <Following/>} */}
    </div>
  )
}
