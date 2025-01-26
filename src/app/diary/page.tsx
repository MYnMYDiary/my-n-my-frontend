import { useGetAllDiarys } from "@/features/diary/diaryApi";

export default function DiaryPage() {

  const {data: diarys, isLoading, error} = useGetAllDiarys();

    return(
      <>
        <h2>다이어리 화면</h2>
        {diarys.map((diary:any) => (
          <p key={diary.id} >diary.title</p>
        ))}
      </>
    )
  }