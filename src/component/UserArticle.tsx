import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/hooks";
import { ArticleDocumentModel, UserArticlesProps } from "@/interfaces";
import { Image, Text } from "@/component";

const UserArticles = ({ refresh }: UserArticlesProps) => {
  const [articles, setArticles] = useState<ArticleDocumentModel[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchUserArticles = async () => {
      if (user) {
        try {
          const article = await axios.get("/api/article/users-article", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setArticles(article.data.articles);
        } catch (error) {
          console.error("Failed to fetch articles");
        }
      }
    };

    fetchUserArticles();
  }, [user, refresh]);

  if (!user) {
    return <p>Please log in to see your articles.</p>;
  }

  const formatPublishDate = (publishDate: Date | string) => {
    const now = new Date();
    const postDate =
      typeof publishDate === "string" ? new Date(publishDate) : publishDate;
    const timeDiffMs = now.getTime() - postDate.getTime();
    const minutesDiff = Math.floor(timeDiffMs / (1000 * 60));
    const hoursDiff = Math.floor(timeDiffMs / (1000 * 60 * 60));

    if (minutesDiff < 60) {
      if (minutesDiff === 0) {
        return "Just now";
      }
      return `${minutesDiff}m`;
    }

    if (hoursDiff < 24) {
      return `${hoursDiff}h`;
    }

    return postDate.toLocaleDateString();
  };

  return (
    <div className="md:p-2">
      <div className="flex flex-col border border-2 p-2 md:p-4 mx-auto rounded-xl w-full">
        <Text
          level="h4"
          className="heading-4 text-greyDark font-bold mb-2 pl-4"
        >
          Your Articles
        </Text>
        <div className="">
          {articles.map((article) => (
            <div
              key={article._id}
              className="flex flex-col gap-1 border md:p-4 p-2 mx-auto md:w-5/6 w-full overflow-hidden break-words"
            >
              <div className="flex items-center p-1 gap-1">
                <Text level="h5" className="heading-5 text-secondary">
                  {user.username}
                </Text>
                <Text
                  level="p"
                  className="paragraph text-greyDark"
                  textCenter={true}
                >
                  .
                </Text>
                <Text level="p" className="paragraph text-greyDark">
                  {formatPublishDate(article.publishDate)}
                </Text>
              </div>
              <div className="flex flex-col p-2">
                <div className="">
                  <Text
                    level="h5"
                    className="heading-5 text-greyDark underline"
                  >
                    {article.title}
                  </Text>
                  <Text level="p" className="paragraph text-greyDark">
                    {article.description}
                  </Text>
                  <Text level="p" className="paragraph text-dark">
                    {article.articleText}
                  </Text>
                </div>
                <div className="flex md:w-1/2 w-full m-auto">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      className="my-2 rounded-lg hover:shadow"
                    />
                  )}
                </div>
                {/* {article.video && (
              <video
                src={article.video}
                controls
                className="my-2 rounded-lg"
              />
            )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserArticles;
