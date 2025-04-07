'use client'

import MarketContents from "@/components/artist/market/settingMarket/marketContents.component";
import MarketProfile from "@/components/artist/market/settingMarket/marketProfile.component";
import style from '@styles/css/artist/marketSetting.module.css'

const MarketSettingPage = () => {
    return (
        <div className={style.pageFrame}>
            <MarketProfile />
            <MarketContents />
        </div>
    )
}

export default MarketSettingPage;