'use client'

import style from '@styles/css/artist/market.module.css'
import { IoMdHeartEmpty } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineShop } from "react-icons/ai";
import SettingMenuModal from './settingMarket/settingMenuModal.component';
import { useState, useRef, useEffect } from 'react';
import { MyInfo, useGetMyInfo } from '@/api/queries/mypage/getMyInfo.query';
import { MarketData } from '@/app/(main)/artist/market/page';



const MarketHeader = ({marketData, user}: {marketData: MarketData, user: MyInfo}) => {


    const [isSettingMenuOpen, setIsSettingMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // 메뉴 바깥 클릭 시 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsSettingMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={style.headerFrame}>

            <div className={style.headerImage}>
                <div className={style.profileBox}>
                    <img src='/mynmyLogo_v2.png' className={style.profileImage} />
                    <h3>{marketData.name}</h3>
                    <p className={style.profileName}>{user?.nickname}</p>
                    <div className={style.likeBox}>
                        <IoMdHeartEmpty size={30} />
                        <p>{marketData.subscribers}</p>
                    </div>
                    {user?.role === 'USER' && (
                        <div className={style.plusButton}>
                            <FaPlus />
                            구독하기
                        </div>
                    )}
                    {user?.role === 'ARTIST' && (
                        <div ref={menuRef} className={style.marketSettingButton} onClick={() => setIsSettingMenuOpen(!isSettingMenuOpen)}>
                            <AiOutlineShop />
                            마켓관리
                            {isSettingMenuOpen && <SettingMenuModal />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}   

export default MarketHeader;