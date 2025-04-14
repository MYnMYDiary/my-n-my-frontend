import styles from '@/styles/css/artist/welcomeForArtist.module.css'
import { redirect } from 'next/navigation';
export default function WelcomeForArtist() {


    return (
        <div className={styles.frame}>
            <div className={styles.textBox}>
                <p>안녕하세요 <b>작가님!</b></p>
                <br/>
                <p>MY & MY에서 작가로 활동하게 되신것을 진심으로 환영합니다.</p>
                <p>저희 MY&MY는 작가님들이 팬분들과 소통하며 마켓을 직접 오픈해 자유롭게 작가님의 작품을 판매할 수 있는 플랫폼입니다.</p>
                <p>아래 버튼을 클릭해 마켓을 생성하고 작가 활동을 시작해 주세요!</p>
            </div>
            <button className={styles.button} onClick={() => redirect('/artist/market/create')}>마켓 만들기</button>
        </div>
    )
}