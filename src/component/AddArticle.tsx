import { useState } from "react";
import { Button, InputField, Text, TextArea } from "@/component";
import axios from "axios";
import { useUser } from "@/hooks";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [articleText, setArticleText] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const { user, loading } = useUser();

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

  const handleAddArticle = async () => {
    try {
      const article = await axios.post(
        "/api/article/addarticle",
        {
          title,
          description,
          articleText,
          image,
          video,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (article) {
        setTitle("");
        setDescription("");
        setArticleText("");
        setImage("");
        setVideo("");
      }
    } catch (error) {
      alert("Failed to add article. Please try again.");
    }
  };

  return (
    <>
      <div className="flex p-4">
        <div className="flex flex-col gap-4">
          <div className="flex">
            <Text level="h4" className="heading-4 text-greyDark">
              Add a new article
            </Text>
          </div>
          <div className="flex flex-col gap-3 border border-2 p-2 rounded-xl">
            <InputField
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
              placeholder="Title"
              className="text-greyDark"
            />
            <InputField
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              value={description}
              placeholder="Description"
              className="text-greyDark"
            />
            <TextArea
              label="Article Text"
              type="text"
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
            />
            <InputField
              onChange={(e) => setVideo(e.target.value)}
              type="file"
              value={video}
              placeholder="Video URL"
              className="text-greyDark"
            />
            <InputField
              onChange={(e) => setImage(e.target.value)}
              type="text"
              value={image}
              placeholder="Image URL"
              className="text-greyDark"
            />
          </div>
          <div className="flex">
            <Button
              variant="PRIMARY"
              onClick={handleAddArticle}
              className="w-full rounded-xl px-2 mx-1"
              size="md"
            >
              Add Article
            </Button>
          </div>
        </div>

      </div>
    </>
  );
};

export default AddArticle;
