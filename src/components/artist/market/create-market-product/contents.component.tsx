'use client'

import style from '@styles/css/artist/create-market-product.module.css'
import CreateMarketProductImage from './create-product-image.component'
import { useState } from 'react';
import { useMarketProductImage } from '../contexts/market-product-image.context';
import { useObjectUrl } from '@/hooks/image/useObjectUrl';
import { useCreateMarketProduct } from '@/api/queries/market/create-market-product.query';
import { useRouter } from 'next/navigation';
export default function CreateMarketProductContents() {

    // 1. 상품 정보(API 호출 시 필요한 정보)
    const [categoryId, setCategoryId] = useState<string>(''); //카테고리 ID 
    const [name, setName] = useState<string>(''); //상품명
    const [price, setPrice] = useState<number>(0); //가격
    const [description, setDescription] = useState<string>(''); //상품 설명
    const [stock, setStock] = useState<number>(0); //재고  


    const { previewImage} = useMarketProductImage();
    const { revokeAll } = useObjectUrl();
    const { createMarketProduct } = useCreateMarketProduct();
    const router = useRouter();



    const validateProduct = () => {

        if(categoryId === '') {
            alert('카테고리를 선택해주세요.');
            return;
        }

        if(previewImage.length === 0) {
            alert('이미지를 추가해주세요.');
            return;
        }

        if(name === '') {
            alert('상품명을 입력해주세요.');
            return;
        }

        if(price === 0) {   
            alert('가격을 입력해주세요.');
            return;
        }

        if(stock === 0) {
            alert('재고를 입력해주세요.');
            return;
        }   
        return true;
    }

    // 상품 등록 (최종)
    const handleCreateProduct = async () => {

        if( validateProduct()) { // 검증을 통과하면

            // 이미지 파일 이름 생성
            const imageList = previewImage.map((image) => {
                const fileName = `market-product-${image.split('/').pop() || ''}.jpg`;
                return fileName;
            })
  
            if(imageList.length !== 0) {      
                const marketProductData = {
                    categoryId,
                    name,
                    price,
                    description,
                    stock,
                    isSale: true,
                    images: imageList
                }
                console.log('상품정보: ', marketProductData);
                createMarketProduct(marketProductData);
            }


            revokeAll();
        }
    }

    return (
        <div className={style.contentsFrame}>

            {/* 이미지 선택 */}
            <CreateMarketProductImage/>

            {/* 상품 정보 입력 */}
            <div className={style.productInfoBox}>

                <select 
                    className={style.selectCategory} 
                    onChange={(e) => setCategoryId(e.target.value)}
                    defaultValue=""  // 초기 선택값 설정
                >
                    <option value="" disabled>상품 카테고리 선택</option>
                    <option value="STI">스티커</option>
                    <option value="MTE">마스킹테이프</option>
                    <option value="PCD">엽서</option>
                    <option value="NTP">메모지</option>
                </select>

                <input type='text' placeholder='상품 이름' onChange={(e) => setName(e.target.value)}/>
                <textarea placeholder='상품 설명' onChange={(e) => setDescription(e.target.value)}/>
                <input 
                    type='number' 
                    placeholder='가격'
                    min="0"
                    onKeyDown={(e) => {
                        if(e.key === '-' || e.key === 'e' || e.key === '.') {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <input 
                    type='number'
                    placeholder='재고'
                    min="0"
                    onKeyDown={(e) => {
                        if(e.key === '-' || e.key === 'e' || e.key === '.') {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => setStock(Number(e.target.value))}
                />
            </div>

            <button className={style.createProductBtn} onClick={handleCreateProduct}>상품 등록</button>
        </div>
    )
} 