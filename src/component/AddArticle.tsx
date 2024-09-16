import { useState } from "react";
import { Button, InputField, Text, TextArea } from "@/component";
import axios from "axios";
import { useUser } from "@/hooks";
import { onArticleAddedProps } from "@/interfaces";

const AddArticle = ({ onArticleAdded }: onArticleAddedProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [articleText, setArticleText] = useState("");
  const [image, setImage] = useState<string | ArrayBuffer | null>("");
  const [video, setVideo] = useState<string | ArrayBuffer | null>("");
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

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
            "Content-Type": "application/json",
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

      onArticleAdded();
    } catch (error) {
      alert("Failed to add article. Please try again.");
    }
  };

  return (
    <div className="flex md:px-2 py-auto w-full">
      <div className="flex flex-col gap-2 mx-auto w-full p-2">
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
          {/* <InputField
            onChange={(e) => handleFileChange(e, setVideo)}
            type="file"
            value={""}
            placeholder="Upload Video"
            className="text-greyDark"
          /> */}
          <InputField
            onChange={(e) => handleFileChange(e, setImage)}
            type="file"
            value={""}
            placeholder="Upload Image"
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
  );
};

export default AddArticle;
