'use client'

//마켓 생성 페이지
// 검색 엔진에 노출될 필요가 없는 private한 페이지
//로그인한 사용자 중 user role이 ARTIST인 사용자만 접근 가능

import CreateMarket from "@/components/artist/market/createMarket/createMarket.component"
import Header from "@/components/diary/Header"
import layoutstyle from "@styles/css/layout.module.css"





export default function CreateMarketPage() {
    return (
        <div className={layoutstyle.diary_frame}>
            <Header/>
            <CreateMarket/>
        </div>
    )
}   