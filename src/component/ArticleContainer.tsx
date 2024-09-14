import { AddArticle, Text, UserArticles, AllArticle } from "@/component";
import { useUser } from "@/hooks";
import { useState } from "react";

const ArticleContainer = () => {
  const { user, loading } = useUser()
  const [view, setView ] = useState<"user" | "all">("user")

  if(loading) {
    return <Text level="h3" className="haeding-3 text-secondary">Loading....</Text>
  }

  if(!user) {
    return null
  }
  return (
    <div className="flex w-full p-4">
      {/* AddArticle component on the left side, fixed width */}
      <div className="w-1/4 p-2 border-r border-greyDark">
        <AddArticle />
      </div>

      {/* Articles view on the right side */}
      <div className="w-3/4 p-4">
        {/* Navigation Bar */}
        <div className="flex justify-between mb-4">
          <button
            className={`text-lg px-4 py-2 ${view === "user" ? "font-bold" : ""}`}
            onClick={() => setView("user")}
          >
            Your Posts
          </button>
          <button
            className={`text-lg px-4 py-2 ${view === "all" ? "font-bold" : ""}`}
            onClick={() => setView("all")}
          >
            All Posts
          </button>
        </div>

        {/* Conditional rendering based on selected view */}
        {view === "user" ? <UserArticles /> : <AllArticle/>}
      </div>
    </div>
  );
};

export default ArticleContainer;
