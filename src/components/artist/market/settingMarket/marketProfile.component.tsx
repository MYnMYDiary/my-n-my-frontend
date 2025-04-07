'use client '

import style from '@styles/css/artist/marketSetting.module.css'

const MarketProfile = () => {
    return (
        <div className={style.profileFrame}>
            <img src="/mynmyLogo_v2.png" alt="마켓 프로필 이미지" className={style.profileImage} />
            <div className={style.profileInfo}>
                <h1>마켓 이름</h1>
                <p>구독자수</p>
            </div>
        </div>
    )
}

export default MarketProfile;