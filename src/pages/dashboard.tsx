import { ArticleContainer, Text } from "@/component";
import { useUser } from "@/hooks";

const Dashboard = () => {
  const { user, loading } = useUser()

  if(loading) {
    return <Text level="h3" className="haeding-3 text-secondary">Loading....</Text>
  }

  if(!user) {
    return null
  }
  return (
    <div>
      <ArticleContainer/>
    </div>
  );
};

export default Dashboard;
