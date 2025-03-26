import style from '@styles/css/mypage/mypage.module.css'
import { RiBrushAiFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import WriteDiaryButton from '@styles/styled-components/buttons/writeDiary.button';
const user = {
    nickname: '고양이나무',
    email: 'isylsy166@gmail.com',
    role: 'artist',
    createdAt: '2025-02-04 19:57:08'
}

export default function MyProfile({setActiveTab}: {setActiveTab: (tab: 'follower' | 'following' | 'diary') => void}) {
  return (
    <div className={style.profileBox}>

        <div className={style.imageBox}>
            <img src='mynmyLogo_v2.png' className={style.profileImage}/>
            {user.role === 'user' && ''}
            {user.role === 'artist' && <div className={style.iconBox}><RiBrushAiFill size={20} color='white'/></div>}
            {user.role === 'admin' && <div className={style.iconBox}><MdAdminPanelSettings size={25} color='white'/></div>}
        </div>

        <h1>{user.nickname}</h1>
        <p>{user.email}</p>

        <div className={style.followBox}>
            <div className={style.follow} onClick={() => setActiveTab('follower')}>
                <h1>20</h1>
                <p>팔로워</p>
            </div>
            <div className={style.follow} onClick={() => setActiveTab('following')}>
                <h1>1600</h1>
                <p>팔로잉</p>
            </div>
        </div>

        <WriteDiaryButton text='다이어리 쓰기' w={250} />

    </div>
  )
}
