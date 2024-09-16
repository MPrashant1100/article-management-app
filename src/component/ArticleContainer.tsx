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

  if (loading) {
    return (
      <Text level="h3" className="haeding-3 text-secondary">
        Loading....
      </Text>
    );
  }

  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-col w-full p-4 md:ml-4 h-screen m-2">
      <div className="md:w-1/4 p-2 md:border-r border-greyDark md:fixed md:top-20 md:left-0 md:h-auto bg-white">
        <AddArticle />
      </div>
      <div className="md:w-3/4 p-4 md:ml-auto">
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

        {view === "user" ? <UserArticles /> : <AllArticle />}
      </div>
    </div>
  );
};

export default ArticleContainer;
