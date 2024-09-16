import { ArticleContainer, Footer, Header, Text } from "@/component";
import { useUser } from "@/hooks";

const Dashboard = () => {
  const { user, loading } = useUser();

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
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex overflow-auto">
        <ArticleContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
