'use client'

import style from '@styles/css/artist/marketProductCard.module.css'

interface ProductData {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface MarketProductCardProps {
    productData: ProductData;
}

const MarketProductCard = ({ productData }: MarketProductCardProps) => {
    return (
        <div className={style.card_frame}>
                <div key={productData.id} className={style.product_card}>
                    <img src={productData.image} className={style.product_image} />
                    <div className={style.product_info}>
                        <p>{productData.name}</p>
                        <h3>{productData.price}원</h3>
                    </div>
                </div>

        </div>
    )
}

export default MarketProductCard;