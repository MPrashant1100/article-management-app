import {
  AddArticle,
  Text,
  UserArticles,
  AllArticle,
  Button,
} from "@/component";
import { useUser } from "@/hooks";
import { useState } from "react";

const ArticleContainer = () => {
  const { user, loading } = useUser();
  const [view, setView] = useState<"user" | "all">("user");
  const [refresh, setRefresh] = useState(false);

  if (loading) {
    return (
      <Text level="h3" className="heading-3 text-secondary">
        Loading....
      </Text>
    );
  }

  if (!user) {
    return null;
  }

  const handleArticleAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col w-full p-2 md:p-4 md:ml-4 h-screen m-2">
      <div className="md:w-1/4 w-full md:p-2 md:border-r border-greyDark md:fixed md:top-20 md:left-0 md:h-auto bg-white">
        <AddArticle onArticleAdded={handleArticleAdded}/>
      </div>
      <div className="md:w-3/4 md:p-4 py-2 md:ml-auto w-full">
        <div className="flex justify-between mb-4">
          <Button
            variant="SQUARE"
            size="md"
            className={`text-lg px-4 py-2 ${
              view === "user" ? "font-bold" : ""
            }`}
            onClick={() => setView("user")}
          >
            Your Posts
          </Button>
          <Button
            variant="SQUARE"
            size="md"
            className={`text-lg px-4 py-2 ${view === "all" ? "font-bold" : ""}`}
            onClick={() => setView("all")}
          >
            All Posts
          </Button>
        </div>

        {view === "user" ? <UserArticles refresh={refresh} /> : <AllArticle />}
      </div>
    </div>
  );
};

export default ArticleContainer;
