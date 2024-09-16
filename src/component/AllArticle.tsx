import { ArticleDocumentModel } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, Image } from "@/component";
import { useUser } from "@/hooks";

const AllArticle = () => {
  const [articles, setArticles] = useState<ArticleDocumentModel[]>([]);
  const { user, loading } = useUser();

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const allArticles = await axios.get("/api/article");
        console.log("All", allArticles);
        setArticles(allArticles.data.allArticles || []);
      } catch (error) {
        console.error("Failed to fetch all articles");
      }
    };

    fetchAllArticles();
  }, []);

  const formatPublishDate = (publishDate: Date | string) => {
    const now = new Date();
    const postDate =
      typeof publishDate === "string" ? new Date(publishDate) : publishDate;
    const timeDiffMs = now.getTime() - postDate.getTime();
    const minutesDiff = Math.floor(timeDiffMs / (1000 * 60));
    const hoursDiff = Math.floor(timeDiffMs / (1000 * 60 * 60));

    if (minutesDiff < 60) {
      return minutesDiff === 0 ? "Just now" : `${minutesDiff}m`;
    }

    if (hoursDiff < 24) {
      return `${hoursDiff}h`;
    }

    return postDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <Text level="h3" className="heading-3 text-secondary">
        Loading....
      </Text>
    );
  }

  return (
    <>
      <div className="p-2">
        <div className="flex flex-col border border-2 p-4 mx-auto rounded-xl">
          <Text level="h4" className="heading-4 text-greyDark font-bold mb-2 pl-4">
            All Articles
          </Text>
          {articles.map((article) => (
            <div key={article._id} className="flex flex-col gap-1 border md:p-4 p-2 mx-auto md:w-5/6">
              <div className="flex items-center p-1 gap-1">
                <Text level="h5" className="heading-5 text-secondary">
                  {user ? user.username : "Unknown Author"}
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
              <Text level="h5" className="heading-5 text-greyDark underline">
                {article.title}
              </Text>
              <Text level="p" className="paragraph text-greyDark">
                {article.description}
              </Text>
              <Text level="p" className="paragraph text-dark">
                {article.articleText}
              </Text>
              <div className="flex w-1/2 m-auto">
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
    </>
  );
};

export default AllArticle;
