'use client'

import style from '@styles/css/mypage/mypage.module.css'
import { useMyDiaryCategory } from './contexts/mydiaryCategory.context';

const categories = [
    { id: '001', name: 'Monthly'},
    { id: '002', name: 'Weekly'},
    { id: '003', name: 'Daily'},
    { id: '004', name: 'Copy Notes'},
    { id: '005', name: 'Study Planer'},
  ]

  const month = [
    { id: '1', name: '1월'},
    { id: '2', name: '2월'},
    { id: '3', name: '3월'},
    { id: '4', name: '4월'},
    { id: '5', name: '5월'},
    { id: '6', name: '6월'},
    { id: '7', name: '7월'},
    { id: '8', name: '8월'},
    { id: '9', name: '9월'},
    { id: '10', name: '10월'},
    { id: '11', name: '11월'},
    { id: '12', name: '12월'},
  ]

export default function MyDiaryHeader() {

  const { selectedCategory, setSelectedCategory, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth } = useMyDiaryCategory();


  return(
    <div className={style.headerBox}>

      <div className={style.categoryBox}>
        {categories.map(c => 
          <div 
            key={c.id}
            className={`${style.category} ${selectedCategory === c.id ? style.selected : ''}`}
            onClick={() => setSelectedCategory(c.id)}
          >
            {c.name}
          </div>
        )}
      </div>

      <div className={style.dateBox}>
        {/* 연도선택 */}
        <select>
          <option value={'2025'}>2025</option>
        </select>

        {/* 월선택 */}
        <div className={style.monthBox}>
          {month.map(m => 
            <p 
            key={m.id} 
            className={`${selectedMonth === m.id ? style.selected : ''}`} 
            onClick={() => setSelectedMonth(m.id)}
            >
              {m.name}
            </p>
          )}
        </div>

      </div>

    </div>

  )
}