import "@styles/css/globals.css";
import style from '@styles/css/layout.module.css'
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";


export default function RootLayout({ children }: { children: React.ReactNode }) {

  
  return (
    <div className={style.mainLayout}>
      <Header/>
      <CategoryBar/>
      {children}
    </div>
  );
}
