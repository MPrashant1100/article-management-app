import { AddArticle, Text, UserArticles } from "@/component";
import { useUser } from "@/hooks";

const ArticleContainer = () => {
  const { user, loading } = useUser()

  if(loading) {
    return <Text level="h3" className="haeding-3 text-secondary">Loading....</Text>
  }

  if(!user) {
    return null
  }
  return (
    <div className="flex">
      <AddArticle/>
      <UserArticles/>
    </div>
  );
};

export default ArticleContainer;
