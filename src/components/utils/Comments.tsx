import { useState, useEffect } from "react";
import { DiscussionEmbed } from "disqus-react";
import Spinner from "./Spinner";

interface CommentsProps {
  title: string;
  slug: string;
}

const Comments = ({ title, slug }: CommentsProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );

  return (
    <DiscussionEmbed
      shortname={process.env.NEXT_PUBLIC_DISCUSS_SHORTNAME || ""}
      config={{
        url: process.env.NEXT_PUBLIC_SITE_URL,
        identifier: slug,
        title: title,
      }}
    />
  );
};

export default Comments;
