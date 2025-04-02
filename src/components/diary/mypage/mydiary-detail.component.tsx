'use client'

import style from '@styles/css/diary/detailDiary.module.css'
import { useState, useEffect } from 'react';
import { useMyPageModal } from '@/components/diary/mypage/contexts/mypageModal.context';
import { useGetMyDiary } from '@/api/queries/mypage/getMyDiary.query';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useGetDiaryImage } from '@/api/queries/diary/getDiary.query';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import API from '@/api/interceptor/API';



export default function MyDiaryDetail() {

  const { isOpen, closeModal } = useMyPageModal();
  const {selectedDiary, selectedCategory, selectedYear, selectedMonth} = useMyPageModal();
  const [currentDiaryId, setCurrentDiaryId] = useState(selectedDiary);

  // 선택한 다이어리가 변경될 때 현재 다이어리 아이디 업데이트
  useEffect(() => {
    setCurrentDiaryId(selectedDiary);
  }, [selectedDiary]);

  // 모달이 열리거나 닫힐 때 스크롤 제어
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

    // 컴포넌트가 언마운트될 때 스크롤을 다시 활성화
    return () => {
        document.body.style.overflow = 'unset';
    };
}, [isOpen]);
  

  // API 호출
  const { data: diary, refetch } = useGetMyDiary(currentDiaryId, selectedCategory ?? '', selectedYear ?? '', selectedMonth ?? '');
  const {data:imageUrl} = useGetDiaryImage(diary?.data?.diary_image);

  const handleNextDiary = () => {
    if (diary?.next) {
        setCurrentDiaryId(diary.next);
    }
  };

  const handlePrevDiary = () => {
    if (diary?.prev) {
        setCurrentDiaryId(diary.prev);
    }
  };

  // 좋아요 클릭 이벤트 핸들러
  const handleLike = async () => {
    try {
      const {data} = await API.post(`/diary/like/${currentDiaryId}`);
      // 좋아요 API 호출 후 다이어리 데이터 새로 가져오기
      await refetch();
  } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
  }
  }
    

  // console.log('현재 다이어리 아이디: ',currentDiaryId);
  // console.log('선택한 다이어리 아이디: ',selectedDiary);
  console.log('다이어리 데이터: ',diary);
  // console.log('이전 다이어리: ', diary?.prev);
  // console.log('다음 다이어리: ', diary?.next);
  // console.log('다이어리 태그: ', diary?.tags);

  return (
    <>
      {isOpen && diary?.data && (
        <div className={style.background}>
          <div className={style.modal}>

            {/* 모달 헤더 */}
            <div className={style.modalHeader}>
              <p>마이페이지 {'>'} {diary.data.category}</p>
              <IoCloseCircleOutline size={25} onClick={closeModal}/>
            </div>

            {/* 다이어리 상세보기 */}
            <div className={style.modalContent}>

              {/* 이미지 박스 */}
              <div className={style.imageBox}>
                {diary.prev && <SlArrowLeft size={35} onClick={handlePrevDiary}/>}
                <img src={imageUrl} alt="diary_image" />
                {diary.next && <SlArrowRight size={35} onClick={handleNextDiary}/>}
              </div>

              <div className={style.diaryInfo}>

                {/* 다이어리 제목, 내용 좋아요 */}
                <div className={style.diaryTextBox}>
                    <h3>{diary.data.title}</h3>
                    <pre className={style.diaryContent}>{diary.data.content}</pre>

                    {/* 다이어리 태그 */}
                    <div className={style.tagBox}>
                      {diary.tags.map((tag: string) => (
                          <p key={tag}>#{tag}</p>
                      ))}
                    </div>

                    {/* 좋아요 개수 */}
                    <div className={style.likeCount}>
                      {diary.data.isLiked ? <IoMdHeart size={25} onClick={handleLike}/> : <IoMdHeartEmpty size={25} onClick={handleLike} />}
                      {diary.data.likecount}
                    </div>
                </div>

                {/* 댓글 */}
                <div className={style.commentBox}>
                    <p>{`댓글(${diary.data.commentcount})`}</p>
                    <div className={style.commentList}></div>
                </div>



              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
