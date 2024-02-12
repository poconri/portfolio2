import Image from "next/image";
import Link from "next/link";
import { createSlug } from "../../lib";
import { imageLoader, shimmer, toBase64 } from "../../lib/utils";

interface BlogProps {
  post: {
    title: string;
    date: string;
    thumb: string;
    category: string[];
    slug: string;
  };
}

const Blog = ({ post: { title, date, thumb, category, slug } }: BlogProps) => {
  return (
    <article className="blog card p-4 md:p-5">
      <div className="blog-top relative mb-4">
        <Link legacyBehavior href={`/postdetails/${slug}`}>
          <a className="fiximage hover-scale block" title={title}>
            <Image
              loader={imageLoader}
              unoptimized={true}
              src={thumb}
              height={240}
              width={400}
              alt="Blog Image"
              layout="responsive"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(400, 240)
              )}`}
            />
          </a>
        </Link>
        <div className="blog-date absolute left-auto right-5 top-5 inline-block min-h-[60px] min-w-[60px] rounded bg-primary p-2 text-center text-grey">
          <span className="month block text-sm uppercase leading-none">
            {new Date(date).toLocaleDateString("en-us", {
              month: "short",
            })}
          </span>
          <span className="date block text-2xl leading-none">
            {new Date(date).toLocaleDateString("en-us", {
              day: "2-digit",
            })}
          </span>
          <span className="year block text-sm leading-none">
            {new Date(date).getFullYear()}
          </span>
        </div>
      </div>
      <h5 className="mb-0">
        <Link
          href={`/postdetails/${slug}`}
          className=" block overflow-hidden overflow-ellipsis whitespace-nowrap transition-colors duration-500 hover:text-primary"
          title={title}
        >
          {title}
        </Link>
      </h5>
      <div className="flex list-none gap-1.5 text-sm">
        {category.map((cat, i) => (
          <span key={i} className="after:content-[','] last:after:hidden">
            <Link href={`/category/${createSlug(cat)}/1`} className=" hover:text-primary">
              {cat}
            </Link>
          </span>
        ))}
      </div>
    </article>
  );
};

export default Blog;
