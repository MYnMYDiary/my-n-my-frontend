"use client";

import { useFetchPosts } from "@/features/posts/postApi";

export default function PostList() {
  const { data: posts, isLoading, error } = useFetchPosts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
