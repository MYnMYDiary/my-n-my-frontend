'use client'
import style from '@styles/css/artist/market.module.css'
const SettingMenuModal = () => {
    return (
        <div className={style.modalFrame}>
            <p>마켓정보수정</p>
            <p>상품관리</p>
            <p>상품등록</p>
            <p>주문내역</p>
            <p>통계</p>
        </div>
    )
}   

export default SettingMenuModal;