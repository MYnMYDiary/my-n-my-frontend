import Image from "next/image";
import styles from "./page.module.css";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <>
      <div>홈 화면 엥</div>
      <PostList/>
    </>
  );
}
