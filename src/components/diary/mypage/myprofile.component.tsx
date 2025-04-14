import style from '@styles/css/mypage/mypage.module.css'
import { RiBrushAiFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import WriteDiaryButton from '@styles/styled-components/buttons/writeDiary.button';
import { TabType } from '@/app/(diary)/mypage/page';
import API from '@/api/interceptor/API';
import { useState, useEffect } from 'react';
import { useGetMyInfo } from '@/api/queries/mypage/getMyInfo.query';
import { useRouter } from 'next/navigation';



export default function MyProfile({setActiveTab}: {setActiveTab: (tab: TabType) => void}) {

    const router = useRouter();
    const {data: user} = useGetMyInfo();

    const handleMarketClick = () => {
        //마켓이 존재하면
        if(user?.market) {
            router.push(`/artist/market/${user.market}`);
        }

        if(!user?.market === null) {
            router.push('/artist/market/welcome');
        }
    }



    console.log(user);

  return (
    user && (
        <div className={style.profileBox}>

            <div className={style.imageBox}>
                <img src='mynmyLogo_v2.png' className={style.profileImage}/>
                {user.role === 'USER' && ''}
                {user.role === 'ARTIST' && <div className={style.iconBox}><RiBrushAiFill size={20} color='white'/></div>}
                {user.role === 'ADMIN' && <div className={style.iconBox}><MdAdminPanelSettings size={25} color='white'/></div>}
            </div>

            <h1>{user.nickname}</h1>
            <p>{user.email}</p>

            <div className={style.followBox}>
                <div className={style.follow} onClick={() => setActiveTab(TabType.FOLLOWER)}>
                    <h1>20</h1>
                    <p>팔로워</p>
                </div>
                <div className={style.follow} onClick={() => setActiveTab(TabType.FOLLOWING)}>
                    <h1>1600</h1>
                    <p>팔로잉</p>
                </div>
            </div>

            <WriteDiaryButton text='다이어리 쓰기' w={250} />

            <div className={style.menuBox}>
                {user.role === 'ARTIST'&& <p onClick={handleMarketClick}>마켓</p>}
                <p>개인정보수정</p>
                <p>주문내역</p>      
                <p>장바구니</p>
            </div>

        </div>
    )
  )
}
