import { Analytics } from "@vercel/analytics/react";
import { getPostsByPage, Post } from "../lib/blogging";
import Homepage from "./homepage";

function index({ posts }: { posts: Post[] }) {
  return (
    <>
      <Homepage posts={posts} />
      <Analytics />
    </>
  );
}

export function getStaticProps() {
  const { posts } = getPostsByPage();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default index;
