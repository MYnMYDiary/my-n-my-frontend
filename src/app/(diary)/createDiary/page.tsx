'use client';

import React, { useState } from 'react'
import layoutstyle from "@/styles/layout.module.css"
import style from '@/styles/diary/createDiary.module.css'
import { IoImagesOutline } from 'react-icons/io5';

export default function CreateDiary() {

  const category = [
    {id: '001', name: 'Monthly'},
    {id: '002', name: 'Weekly'},
    {id: '003', name: 'Daily'},
    {id: '004', name: 'Copy Notes'},
  ]
  const [selectedCategory, setSelectedCategory] = useState('');
  console.log(selectedCategory);


  return (
    <div className={layoutstyle.diary_frame}>
        <div className={style.frame}>

            <div className={style.left}>
              {(selectedCategory === '001' || selectedCategory === '') && (
                <div className={style.imgBox_Monthly}>
                  <IoImagesOutline color="gray" size={40} />
                </div>
              )}

              {selectedCategory === '002' && (
                <div className={style.imgBox_Weekly}>
                  <IoImagesOutline color="gray" size={40} />
                </div>
              )}

              {selectedCategory === '003' && (
                <div className={style.imgBox_Daily}>
                  <IoImagesOutline color="gray" size={40} />
                </div>
              )}

              {selectedCategory === '004' && (
                <div className={style.imgBox_CopyNotes}>
                  <IoImagesOutline color="gray" size={40} />
                </div>
              )}

            </div>

            <div className={style.right}>

              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value='' disabled>카테고리</option>
                { category.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
      
              <input type='text' placeholder='제목'/>

              <textarea placeholder='설명'/>

              <button type='button' className={style.saveBtn}>저장</button>

            </div>
        </div>
    </div>
  )
}
