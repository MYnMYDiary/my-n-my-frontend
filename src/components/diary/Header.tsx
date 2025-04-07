'use client';

import React from 'react'
import styles from '@styles/css/diary/header.module.css'
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {

    const router = useRouter();
    const pathname = usePathname().split('/');

    const title = [
        {id: 'createDiary', name: '다이어리 쓰기'},
        {id: 'mypage', name: '마이페이지'},
        {id: 'createMarket', name: '마켓 만들기'}
    ]

    return (
    <div className={styles.headerBox}>

        <div className={styles.left}>
            <div className={styles.logo} onClick={() => router.push('/')}></div>
        </div>

        <div className={styles.right}>
            {title.map( t => pathname[1] === t.id ? <h1 key={t.id}>{t.name}</h1> : '')}
        </div>

    </div>
    )
}
