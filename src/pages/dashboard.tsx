import { ArticleContainer, Text } from "@/component";
import { useUser } from "@/hooks";

const Dashboard = () => {
  const { user, loading, logout } = useUser()

  if(loading) {
    return <Text level="h3" className="haeding-3 text-secondary">Loading....</Text>
  }

  if(!user) {
    return null
  }
  return (
    <div>
      <ArticleContainer/>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
