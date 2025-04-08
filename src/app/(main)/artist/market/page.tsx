'use client'

import Market from "@/components/artist/market/market.component";
import MarketHeader from "@/components/artist/market/marketHeader.component";
import { useGetMarket } from "@/api/queries/market/getMarket.query";
import WelcomeForArtist from "@/components/artist/market/createMarket/welcomeForArtist.component";  
import { Fragment } from "react";
import { useGetMyInfo } from "@/api/queries/mypage/getMyInfo.query";

export interface MarketData {
    createdAt: string;
    endDate: string;
    id: number;
    image: string;
    introduction: string;
    isOpen: boolean;
    name: string;
    notice: string;
    startDate: string;
    subscribers: number;
    updatedAt: string;
    userId: number;
}

export default function MarketPage() {

    // 마켓 조회 API 호출
    const { data: marketData } = useGetMarket();
    console.log(marketData);

    const {data: user} = useGetMyInfo();
    console.log(user);

    return (
        <Fragment>
            {marketData?.exists && user &&
                <div>
                    <MarketHeader marketData={marketData.data} user={user}/>         
                    <Market marketData={marketData.data} />
                </div>
            }
            {!marketData?.exists && <WelcomeForArtist/>}
        </Fragment>
    )
}





/**
 * 1. 초기 페이지 (page) - CSR (SEO 영향 받지 않음)
 * 2. MarketHeader - SSR (SEO: 검색이 될까..?)
 * 3. Market - CSR (무한스크롤, 필터, 정렬, 클릭 이벤트 등 동적 인터랙션이 많은 페이지 )
 * 4. Market에서 상품 상세 페이지 - SSR(SEO 중요!)
 */