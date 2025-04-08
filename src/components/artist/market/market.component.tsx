'use client'

import style from '@styles/css/artist/market.module.css'
import { useState } from 'react'
import MarketProductCard from './createMarket/marketProductCard.component'
import { MarketData } from '@/app/(main)/artist/market/page'
const categories = [
    {id: '001',name: '소개'},
    {id: '002',name: '안내사항'},
]

const marketInfo = {
    intro: `안녕하세요! 연메이드입니다.\n짧게 짧게 상시마켓을 열어둘테니 힐링하고 가세요🤍\n언제나 찾아와 주시는 모든 분들 감사드립니다!\n🤍 4월 4일, 7일, 10일발송합니다!\n(오후 12시 이후 주문 건은 다음 발송일에 발송됩니다.)\n🤍 5만원 이상 구매시 무료배송`,

    guide: `1. 주문 및 배송 안내\n- 준등기는 우편함으로 배송되기 때문에 분실 될 가능성이 있으며 180g 이하일 경우에만 가능 합니다. 안전배송을 원하시면 택배를 추천해드려요.\n\n
2. 주문 제작 상품 여부\n - 주문 제작 상품은 제작 후, 반품/취소가 어려울 수 있습니다. 꼭 확인 후 주문해주세요\n
3. 교환/환불 안내\n - 받으신 물품이 주문 내역과 다르거나, 불량인 경우 교환/환불 가능합니다. \n- 물품 수령 후, 7일 이내 문의 연락 주세요. \n- 화면과 실제 색감에 차이가 있을 수 있습니다. \n- 이와 같은 사유와 단순 변심 교환 환불은 가능하나 \n
왕복배송비는 본인부담이라는 점 양해 부탁드립니다. \n

- 업체에서 파본으로 인정하지 않은것은 교환과 환불이 어렵다는 점 양해 부탁드립니다. \n
- 씰스티커는 특성상 2-3mm의 칼선 밀림이 있을 수 있습니다. 이 점 또한 업체에서 정상으로 처리 해주시는 부분이라서 교환과 환불이 어렵습니다.
- 미세한 잉크튐, 먼지끼임 등 업체에서 정상으로 처리 해주시는 부분이라서 교환과 환불이 어렵습니다.
- 같은 제품일지라도 발주 시기, 인쇄물 특성상 색상 차이가 미세하게 있을 수 있습니다.
- 펜 종류 특성상 파스텔 처럼 번짐 현상이 있습니다.
- 예민하신 분들은 신중한 구매 부탁드립니다.

4. 문의 연락\n
문의 사항은 @apbttou 인스타그램으로 부탁드립니다!`
}

const productMockData = [
    {
        id: 1,
        name: '미니메이드 로고 프린트',
        price: 1500,
        image: '/mynmyLogo_v2.png'
    },
    {
        id: 2,
        name: '미니메이드 로고 프린트',
        price: 1500,
        image: '/mynmyLogo_v2.png'
    },
    {
        id: 3,
        name: '미니메이드 로고 프린트',
        price: 1500,
        image: '/mynmyLogo_v2.png'
    },
    {
        id: 4,
        name: '미니메이드 로고 프린트',
        price: 1500,
        image: '/mynmyLogo_v2.png'
    },
    {
        id: 5,
        name: '미니메이드 로고 프린트',
        price: 1500,
        image: '/mynmyLogo_v2.png'
    },
    {
        id: 6,
        name: '미니메이드 로고 프린트',
        price: 1500,
        image: '/mynmyLogo_v2.png'
    },

    
]

export default function Market({marketData}: {marketData: MarketData}) {

    const [selectedCategory, setSelectedCategory] = useState<string>('001')




    // 상품 : 4개씩 그룹화된 배열로 변환
    const cardRows = [];
    for (let i = 0; i < productMockData.length; i += 4) {
        cardRows.push(productMockData.slice(i, i + 4));
    }


    return (
        <div className={style.marketFrame}>

            {/* 마켓 정보 */}
            <div className={style.marketInfoBox}>

                <div className={style.marketInfoCategoryBox}>
                    {categories.map(c => 
                        <div 
                            key={c.id}
                            className={`${style.marketInfoCategory} ${selectedCategory === c.id ? style.selected : ''}`}
                            onClick={() => setSelectedCategory(c.id)}
                        >
                            {c.name}
                        </div>
                    )}
                </div>

                <div className={style.marketInfoContentBox}>
                    {selectedCategory === '001' && 
                        <div 
                            className={style.marketIntroBox} 
                            dangerouslySetInnerHTML={{ __html: marketData?.introduction || '' }} 
                        />
                    }
                    {selectedCategory === '002' && 
                        <div 
                            className={style.marketGuideBox} 
                            dangerouslySetInnerHTML={{ __html: marketData?.notice || '' }} 
                        />
                    }
                </div>

            </div>

            {/* 마켓 상품 카드 */}
            <div className={style.marketProductCardBox}>
                {cardRows.map((row, rowIndex) => (
                    <div key={rowIndex} className={style.productRow}>
                        {row.map(product => (
                            <MarketProductCard 
                                key={product.id} 
                                productData={product} 
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}