'use client'

import style from '@/styles/css/diary/createDiary.module.css'
import { FiSearch } from "react-icons/fi";
import { useState } from 'react';
import API from '@/api/interceptor/API';

interface CreateTagsProps {
    tags: string[]
    setTags: (tags: string[]) => void
}

const CreateTags = ({tags, setTags}: CreateTagsProps) => {

    const [searchTag, setSearchTag] = useState<string>(''); //검색 태그
    const [tagList, setTagList] = useState<{name: string}[]>([]); //태그 리스트


    const handleSearchTag = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearchTag(e.target.value); //입력한 값

        const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(searchTag); //한글 판별
        const isEnglish = /^[a-zA-Z]+$/.test(searchTag); //영어 판별

        if(searchTag.length > 1 && isKorean){
            //console.log(searchTag.substring(0, 1));
            //api 호출
            const {data} = await API.post(
                '/diary/tag',
                {
                    tag: searchTag.substring(0, 1)
                }
            )
            setTagList(data);   
        }

        if(searchTag.length > 2 && isEnglish){
            //console.log(searchTag.substring(0, 3));
            //api 호출
            const {data} = await API.post(
                '/diary/tag',
                {
                    tag: searchTag.substring(0, 1)
                }
            )
            setTagList(data);
        }
    }

    const handleAddTag = (tag: string) => {
        // 이미 존재하는 태그인지 확인
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    }


    // console.log(searchTag);
    // console.log(searchTag.length);

  return (
    <div className={style.addTagBox}>

        <div className={style.searchTagBox}>
            <input type='text' placeholder='태그 검색' onChange={handleSearchTag}/>
            <FiSearch />
        </div>

        <div className={style.tagListBox}>
            {searchTag.length !== 0 &&
                <div className={style.searchTagList}>
                    {tagList
                        .filter(tag => tag.name.includes(searchTag))
                        .map((tag, i) => (
                            <div key={i} className={style.tag} onClick={() => handleAddTag(tag.name)}>{tag.name}</div>
                        ))
                    }
                    {tagList.filter(tag => tag.name.includes(searchTag)).length === 0 &&
                        <div className={style.tagMessageBox}>
                            <div className={style.tagMessage}>검색 결과가 없습니다.</div>
                            <div className={style.addTagText} onClick={() => handleAddTag(searchTag)}>+ 태그 등록</div>
                        </div>
                    }
                </div>
            }
        </div>

    </div>
  )
}

export default CreateTags;