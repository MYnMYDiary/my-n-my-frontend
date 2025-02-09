import MyDiary from '@/components/diary/mypage/mydiary.component'
import Profile from '@/components/diary/mypage/profile.component'
import style from '@styles/css/mypage/mypage.module.css'

export default function page() {
  return (
    <div className={style.frame}>
      <Profile/>
      <MyDiary/>
    </div>
  )
}
