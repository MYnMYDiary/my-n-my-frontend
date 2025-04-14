'use client'

import { MarketProductImageProvider } from '@/components/artist/market/contexts/market-product-image.context'
import CreateMarketProductContents from '@/components/artist/market/create-market-product/contents.component'
import CreateMarketProductHeader from '@/components/artist/market/create-market-product/header.component'
import style from '@styles/css/artist/create-market-product.module.css'

export default function CreateMarketProductPage() {

    return (
        <div className={style.pageFrame}>
            <CreateMarketProductHeader />

            {/* 이미지 업로드 컨텍스트 제공 */}
            <MarketProductImageProvider>
                <CreateMarketProductContents />
            </MarketProductImageProvider>
        </div>
    )
}