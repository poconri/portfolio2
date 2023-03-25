import { Post } from "./blogging";

const sortPostByDate = (a:Post, b:Post) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}

const filterPostsByPage = (arr:Post[], page:number, limit:number) => {
    return arr.slice(limit * page - limit, limit * page);
};

const createSlug = (string:string) => {
    return string.split(" ").join("-").toLowerCase();
};

export { sortPostByDate, filterPostsByPage, createSlug };
