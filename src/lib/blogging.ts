import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { createSlug, filterPostsByPage, sortPostByDate } from ".";

const LIMIT = 6;

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string[];
  cover:string;
  thumb: string;
}

// Get all post
const getAllPosts = (): string[] => {
  return fs.readdirSync(path.join(process.cwd(), "src/posts"));
};

// get all posts slug
const getAllPostsSlug = (): string[] => {
  const files = getAllPosts();
  return files.map((filename: string) => filename.replace(/\.(md|mdx)$/, ""));
};

// Get all posts data
const getAllPostsData = (): Post[] => {
  const files = getAllPosts();
  const posts:Post[] = files.map((filename: string) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");

    const markdownWithMeta = fs.readFileSync(
      path.join(process.cwd(), "src/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      ...frontmatter,
    } as Post;
  });
  return posts.sort(sortPostByDate);
};

// Get posts by page
const getPostsByPage = (page = 1, limit = 6) => {
  const tempPosts = getAllPostsData();
  const posts = filterPostsByPage(tempPosts, page, limit);
  return {
    posts,
    hasMore: limit * page < tempPosts.length,
  };
};

// Get Page Paths
const getPagesPath = () => {
  const files = getAllPosts();
  const pages = Math.ceil(files.length / LIMIT);

  let paths = [];
  for (let i = 1; i <= pages; i++) {
    paths.push({
      params: {
        slug: String(i),
      },
    });
  }
  return paths;
};

// Get all posts path (for nextjs getStaticPaths)
const getPostsPath = () => {
  const postsSlug = getAllPostsSlug();

  const paths = postsSlug.map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });

  return paths;
};

// Get single post data
const getSinglePost = (slug:string) => {
  const post = fs.readFileSync(
    path.join(process.cwd(), "src/posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(post);
  return {
    ...frontmatter,
    content,
  };
};

// Get all Categories
const getAllCategories = () => {
  const posts:Post[] = getAllPostsData();

  const categories = posts.map((post) => post.category);

  return categories.flat();
};

// Get category paths (for nextjs getStaticPaths)
const getCategoryPaths = (): { params: { slug: string; page: string } }[] => {
  const allPosts: Post[] = getAllPostsData();
  const allCategories: string[] = getAllCategories();
  const categories = [...new Set(allCategories)];
  const paths = categories.map((category: string) => {
    const filteredPosts: Post[] = allPosts.filter((post: Post) => {
      const temp: string[] = post.category.map((cat) => createSlug(cat));
      return temp.includes(category.toLowerCase());
    });
    const pages: number = Math.ceil(filteredPosts.length / LIMIT);

    let tempPath: { params: { slug: string; page: string } }[] = [];
    for (let i = 1; i <= pages; i++) {
      tempPath.push({
        params: {
          slug: category.toLowerCase(),
          page: String(i),
        },
      });
    }
    return tempPath;
  });

  return paths.flat();
};

// Get all posts by category
const getPostsByCategory = (category:string, page = 1, limit = 6) => {
  const allPosts = getAllPostsData();

  const filteredPosts = allPosts.filter((post) => {
    const temp = post.category.map((cat) => createSlug(cat));
    return temp.includes(category);
  });

  const posts = filterPostsByPage(filteredPosts, page, limit);

  return {
    posts,
    hasMore: limit * page < filteredPosts.length,
  };
};

// Get recent posts
const getRecentPosts = () => {
  const allPosts = getAllPostsData();

  return allPosts.slice(0, 5);
};

export {
  getPostsByPage,
  getPostsByCategory,
  getPostsPath,
  getPagesPath,
  getSinglePost,
  getAllCategories,
  getCategoryPaths,
  getRecentPosts,
};
