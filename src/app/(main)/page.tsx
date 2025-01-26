import styles from "./page.module.css";
import layoutstyle from "@/styles/layout.module.css"
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div className={layoutstyle.page_frame}>
      <div>홈 화면 엥</div>
      <PostList/>
    </div>
  );
}
