import CreateDiary from '@/components/diary/createDiary/createDiary.component';
import layoutstyle from "@styles/css/layout.module.css"

export default function page() { 

  return(
    <div className={layoutstyle.diary_frame}>
      <CreateDiary/>
    </div>
  )     
}

