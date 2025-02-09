'use client'

import style from '@styles/css/mypage/mypage.module.css'

export default function MyDiary() {
  return (
    <div className={style.diaryFrame}>

        <div className={style.categoryBox}>
            <div className={style.category}>Monthly</div>
            <div className={style.category}>Weekly</div>
            <div className={style.category}>Daily</div>
            <div className={style.category}>Copy Notes</div>
        </div>

        <div className={style.diaryBox}>
            
        </div>

    </div>
  )
}
