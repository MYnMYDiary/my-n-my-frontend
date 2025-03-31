/**
 * 다이어리 조회시 가져오는 다이어리의 데이터 타입
 * @property space - 공간 이름
 * @property category - 카테고리 이름
 * @property id - 다이어리 아이디
 * @property title - 다이어리 제목
 * @property likecount - 좋아요 수
 * @property diary_image - 다이어리 이미지
 * @property createdat - 다이어리 생성일
 */
export interface DiaryType{
    space: string,
    category: string,
    categoryid: string,
    year: string,
    month: string,
    id: number,
    title: string,
    likecount: number,
    diary_image: string,
    createdat: string
  }