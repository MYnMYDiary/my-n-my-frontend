'use client'

import style from '@styles/css/artist/market.module.css'
import { IoMdHeartEmpty } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineShop } from "react-icons/ai";
import SettingMenuModal from './settingMarket/settingMenuModal.component';
import { useState, useRef, useEffect } from 'react';





const marketMockData = {
    userRole: 'ARTIST',
    profileImage: '/mynmyLogo_v2.png',
    profileName: '연메이드 상시마켓',
    likeCount: 100,
    isLiked: false,
}

export default function MarketHeader() {

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
                    <h3>연메이드 상시마켓</h3>
                    <div className={style.likeBox}>
                        <IoMdHeartEmpty size={30} />
                        <p>100</p>
                    </div>
                    {marketMockData.userRole === 'USER' && (
                        <div className={style.plusButton}>
                            <FaPlus />
                            구독하기
                        </div>
                    )}
                    {marketMockData.userRole === 'ARTIST' && (
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