'use client'

import style from '@styles/css/artist/market.module.css'
import { useState } from 'react'
import MarketProductCard, { ProductData } from './create-market/marketProductCard.component'
import { MarketData } from '@/app/(main)/artist/market/[id]/page'
import { useGetMarketProducts } from '@/api/queries/market/get-market-products.query'
import { useObjectUrl } from '@/hooks/image/useObjectUrl'


const categories = [
    {id: '001',name: '소개'},
    {id: '002',name: '안내사항'},
]

export default function Market({marketData}: {marketData: MarketData}) {

    const [selectedCategory, setSelectedCategory] = useState<string>('001')
    const { data: marketProducts } = useGetMarketProducts(marketData.id);


    // 상품 : 4개씩 그룹화된 배열로 변환
    const cardRows = [];
    for (let i = 0; i < marketProducts?.length; i += 4) {
        cardRows.push(marketProducts.slice(i, i + 4));
    }

    console.log('마켓정보',marketData);
    console.log('마켓상품',marketProducts);

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
                        {row.map((product: ProductData) => (
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