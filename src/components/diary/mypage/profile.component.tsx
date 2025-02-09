'use client'

import style from '@styles/css/mypage/mypage.module.css'

const user = {
    nickname: '고양이나무',
    email: 'isylsy166@gmail.com',
    role: 'artist',
    createdAt: '2025-02-04 19:57:08'
}


export default function Profile() {
  return (
    <div className={style.profileBox}>
        <img src='mynmyLogo_v2.png' className={style.profileImage}/>

        <h1>{user.nickname}</h1>
        <p>{user.email}</p>

        <div className={style.followBox}>
            <div className={style.follow}>
                <h1>20</h1>
                <p>팔로워</p>
            </div>
            <div className={style.follow}>
                <h1>1600</h1>
                <p>팔로잉</p>
            </div>
        </div>

        <div className={style.userInfoBox}>
            <pre>{`자기소개를 작성하는 곳 \n ex)안녕하세요`}</pre>
        </div>
        {user.role === 'user' && ''}
        {user.role === 'artist' && <p className={style.role_message}>작가로 활동중이에요!</p>}
        {user.role === 'admin' && <p className={style.role_message}>관리자 계정입니다</p>}
    </div>
  )
}
