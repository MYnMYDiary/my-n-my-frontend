import Market from "@/components/artist/market/market.component";
import MarketHeader from "@/components/artist/market/marketHeader.component";
import { API } from "@/api/interceptor/ServerAPI";

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

export default async function MarketPage({params}: {params: {id: number}}) {

    try {

        const marketId = params.id;

        const marketData = await API.get(`/market/${marketId}`, {
            revalidate: false, // 캐시 없이 항상 새로운 데이터
            // revalidate: 60, // 60초마다 새로운 데이터 가져오기
        });

    return (
        <>
            <MarketHeader market={marketData}/>         
            <Market marketData={marketData} />
        </>
    )
        
    } catch (error) {
        console.log(error);
        throw error;
    }

}





/**
 * 1. 초기 페이지 (page) - CSR (SEO 영향 받지 않음)
 * 2. MarketHeader - SSR (SEO: 검색이 될까..?)
 * 3. Market - CSR (무한스크롤, 필터, 정렬, 클릭 이벤트 등 동적 인터랙션이 많은 페이지 )
 * 4. Market에서 상품 상세 페이지 - SSR(SEO 중요!)
 */