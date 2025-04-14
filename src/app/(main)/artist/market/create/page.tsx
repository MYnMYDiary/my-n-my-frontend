'use client'

import { useGetMarket } from '@/api/queries/market/get-market.query';
import SelectMarketDate from '@/components/artist/market/create-market/selectMarketDate.component';
import { CURRENT_DATE } from '@/constants/date.const';
import styles from '@/styles/css/artist/createMarket.module.css'
import { useState, useEffect } from 'react';
import { Dayjs } from 'dayjs';
import { RiImageEditLine } from "react-icons/ri";
import dayjs from 'dayjs';
import { useCreateMarket } from '@/api/queries/market/create-market.query';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>로딩중...</p>
});

export default function CreateMarketPage() {

    const { data: marketData } = useGetMarket();
    const { createMarket } = useCreateMarket();

    console.log(marketData);

    const [image, setImage] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [introduction, setIntroduction] = useState<string>('');
    const [notice, setNotice] = useState<string>('');
    const [startDate, setStartDate] = useState<string | null>(CURRENT_DATE); //연도
    const [endDate, setEndDate] = useState<string | null>(CURRENT_DATE); //월
    const [isOpen, setIsOpen] = useState<boolean>(false); //상시 오픈 여부

    // marketData가 로드되면 상태 업데이트
    useEffect(() => {
        if (marketData?.exists) {
            setName(marketData.data.name);
            setIntroduction(marketData.data.introduction);
            setNotice(marketData.data.notice);
        }
    }, [marketData]);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            // ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ],
        clipboard: {
            matchVisual: false
        }
    };


    // 연도 선택
    const handleStartDateChange = (e: Dayjs | null) => {
        if(e){
            const year = e.year().toString();
            const month = (e.month()+1).toString();
            const day = e.date().toString();
            setStartDate(`${year}-${month}-${day}`);
        }
    }

    // 월 선택
    const handleEndDateChange = (e: Dayjs | null) => {
        if(e){
            const year = e.year().toString();
            const month = (e.month()+1).toString();
            const day = e.date().toString();
            setEndDate(`${year}-${month}-${day}`);
        }
    }

    const handleIsOpenChange = () => {
        setIsOpen(!isOpen);
        if(!isOpen){
            setStartDate(null);
            setEndDate(null);
        }else{
            setStartDate(CURRENT_DATE);
            setEndDate(CURRENT_DATE);
        }   
    }

    const validateDatePick = () => {
        if(startDate && endDate){
            if(dayjs(startDate) > dayjs(endDate)){
                alert('시작날짜가 종료날짜보다 이후일 수 없습니다.');
                return false;
            }
        }
        return true;
    }

    const validateMarketOpen = () => {
        // 시작날짜가 없으면 상시 오픈
        if (!startDate) {
            setIsOpen(true);
            return;
        }

        // 시작날짜가 현재날짜보다 미래면 마켓 닫힘
        if (dayjs(CURRENT_DATE) < dayjs(startDate)) {
            setIsOpen(false);
            return;
        }

        // 시작날짜가 현재날짜와 같거나 과거면 마켓 오픈
        setIsOpen(true);
    }

    const handleCreateMarket = () => {
        if(!validateDatePick()){
            return;
        }
        validateMarketOpen();
        if(!name || name.length < 1){
            alert('마켓 이름을 입력해주세요.');
            return;
        }
        console.log(name);
        console.log(introduction);
        console.log(notice);
        console.log(startDate);
        console.log(endDate);
        console.log(isOpen);
        
        createMarket({
            image,
            name,
            introduction,
            notice,
            startDate,
            endDate,
            isOpen
        }); 
    }

    return (
        marketData && (
            <div className={styles.frame}>
                <div className={styles.imageBox}>
                    <img src="/mynmyLogo_v2.png" alt="마켓 프로필 이미지" className={styles.profileImage} />
                    <div className={styles.imageEditButton}>
                        <RiImageEditLine />
                    </div>
                </div>

                <div className={styles.textBox}>

                    {marketData.exists ? 
                    <input type="text" className={styles.input} value={marketData.data.name} onChange={(e) => setName(e.target.value)} /> : 
                    <input type="text" className={styles.input} placeholder='마켓 이름' onChange={(e) => setName(e.target.value)} />
                    }

                    {/* <textarea className={styles.input} value={marketData.data.introduction} onChange={(e) => setIntroduction(e.target.value)} /> :     
                    <textarea className={styles.input} placeholder='마켓을 자유롭게 소개해주세요!' onChange={(e) => setIntroduction(e.target.value)} /> */}

                    {marketData.exists ? 
                        <div className={styles.quillWrapper}>
                            <ReactQuill 
                                theme="snow"
                                value={introduction}
                                onChange={(value) => setIntroduction(value)}
                                modules={modules}
                                placeholder="마켓을 자유롭게 소개해주세요!"
                            />
                        </div> : 
                        <div className={styles.quillWrapper}>
                            <ReactQuill 
                                theme="snow"
                                onChange={(value) => setIntroduction(value)}
                                modules={modules}
                                placeholder="마켓을 자유롭게 소개해주세요!"
                            />
                        </div>
                    }

                    {/* {marketData.exists ? 
                    <textarea className={styles.input} value={marketData.data.notice} onChange={(e) => setNotice(e.target.value)} /> :     
                    <textarea className={styles.input} placeholder='안내사항을 입력해주세요.' onChange={(e) => setNotice(e.target.value)} />
                    } */}

                    {marketData.exists ? 
                        <div className={styles.quillWrapper}>
                            <ReactQuill 
                                theme="snow"
                                value={notice}
                                onChange={(value) => setNotice(value)}
                                modules={modules}
                                placeholder="안내사항을 입력해주세요."
                            />
                        </div> : 
                        <div className={styles.quillWrapper}>
                            <ReactQuill 
                                theme="snow"
                                onChange={(value) => setNotice(value)}
                                modules={modules}
                                placeholder="안내사항을 입력해주세요."
                            />
                        </div>
                    }

                </div>

                <SelectMarketDate 
                    startDate={startDate} 
                    endDate={endDate} 
                    handleStartDateChange={handleStartDateChange} 
                    handleEndDateChange={handleEndDateChange}
                    isOpen={isOpen}
                />

                <div className={styles.checkboxBox}>
                    <input type='checkbox' className={styles.checkbox} checked={isOpen} onChange={handleIsOpenChange} />
                    <label className={styles.checkboxLabel}>상시 오픈</label>
                </div>

                <div className={styles.buttonBox}>
                    <button className={styles.button} onClick={handleCreateMarket}>{marketData.exists ? '마켓 수정' : '마켓 등록'}</button>
                </div>
            </div>
        )
    )
}
