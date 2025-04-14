'use client'

import { useGetImageForServer } from '@/api/queries/common/get-image-for-server.query';
import { useObjectUrl } from '@/hooks/image/useObjectUrl';
import style from '@styles/css/artist/marketProductCard.module.css'

export interface ProductData {
    categoryId: string;
    id: number;
    images: string[];
    name: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    stock: number;
    marketId: number;
    isSale: boolean;
    description: string;
}

interface MarketProductCardProps {
    productData: ProductData;
}

const MarketProductCard = ({ productData }: MarketProductCardProps) => {

    const { data: imageData } = useGetImageForServer(productData.images[0]);
    const imageUrl = imageData ? URL.createObjectURL(imageData) : '';
    console.log('이미지데이터',imageData);

    console.log(productData);

    return (
        <div className={style.card_frame}>
                <div key={productData.id} className={style.product_card}>
                    <img src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} className={style.product_image} />
                    <div className={style.product_info}>
                        <p>{productData.name}</p>
                        <h3>{productData.price}원</h3>
                    </div>
                </div>

        </div>
    )
}

export default MarketProductCard;