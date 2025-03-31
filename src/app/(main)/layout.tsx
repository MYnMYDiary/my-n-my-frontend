import "@styles/css/globals.css";
import style from '@styles/css/layout.module.css'
import Header from "@/components/Header";


export default function RootLayout({ children }: { children: React.ReactNode }) {

  
  return (
    <div className={style.mainLayout}>
      <Header/>
      {children}
    </div>
  );
}
