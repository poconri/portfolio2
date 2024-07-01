import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { createSlug } from "../../lib";
import { getPostsPath, getSinglePost } from "../../lib/blogging";
import { imageLoader, shimmer, toBase64 } from "../../lib/utils";
import { Breadcrumb } from "../../components/elements";
import { Layout } from "../../components/layout";
import { Spinner } from "../../components/utils";
import Comments from "../../components/utils/Comments";
import React from "react";
import MarkdownRenderer from "../../components/markdown-render";
import { Analytics } from "@vercel/analytics/react";

interface Meta {
  content: string;
  name: string;
}

interface PostPageProps {
  title: string;
  date: string;
  cover: string;
  category: string[];
  content: string;
  meta: string;
}

const PostPage = ({
  title,
  date,
  cover,
  category,
  content,
  meta,
}: PostPageProps) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const metaList: Meta[] = JSON.parse(meta);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );

  const slugValue = typeof slug === "string" ? slug : "";

  return (
    <>
      <Layout>
        <Head>
          <title>{title} - Ramon Pocón - Blog</title>
          {metaList.map((meta, index) => {
            if (meta.name.startsWith("og:")) {
              return (
                <meta key={index} property={meta.name} content={meta.content} />
              );
            } else if (meta.name.startsWith("twitter:")) {
              return (
                <meta key={index} property={meta.name} content={meta.content} />
              );
            }
            return <meta key={index} {...meta} />;
          })}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: title,
                image: [cover],
                datePublished: date,
                dateModified: date,
              }),
            }}
          />
        </Head>
        <Breadcrumb
          title={title}
          paths={[
            {
              name: "Home",
              link: "/",
            },
            {
              name: "Blogs",
              link: "/posts/1",
            },
            {
              name: title,
              link: "",
            },
          ]}
        />
        <div className="single-post py-24 lg:py-28 xl:py-32">
          <div className="container mx-auto">
            <div className="post-header mb-8">
              <div className="fiximage mb-5 overflow-hidden rounded border border-white border-opacity-20">
                <Image
                  loader={imageLoader}
                  unoptimized={true}
                  src={cover}
                  height={650}
                  width={1350}
                  alt="Blog Image"
                  layout="responsive"
                  objectFit="contain"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1350, 650)
                  )}`}
                />
              </div>
              <div className="flex flex-wrap justify-between gap-x-4">
                <div className="mb-0 flex gap-2 text-heading">
                  Category :{" "}
                  <div className="inline-flex list-none gap-1.5">
                    {category.map((cat, index) => (
                      <span
                        key={index}
                        className="after:content-[','] last:after:hidden"
                      >
                        <Link
                          href={`/category/${createSlug(cat)}/1`}
                          className="text-body hover:text-primary"
                        >
                          {cat}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mb-0 text-heading">
                  Published on :
                  <span className="ml-1.5 text-body">
                    {`${new Date(date).toLocaleDateString("en-us", {
                      month: "short",
                    })} ${new Date(date).toLocaleDateString("en-us", {
                      day: "2-digit",
                    })}, ${new Date(date).getFullYear()}`}
                  </span>
                </p>
              </div>
            </div>
            <>
              <MarkdownRenderer content={content} />
            </>
            <div className="post-comments mt-8">
              <Comments key={slugValue} title={title} slug={slugValue} />
            </div>
          </div>
        </div>
      </Layout>
      <Analytics />
    </>
  );
};

export default PostPage;

export function getStaticPaths() {
  const paths = getPostsPath();

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const postData = getSinglePost(slug);

  return {
    props: {
      ...postData,
    },
  };
}
