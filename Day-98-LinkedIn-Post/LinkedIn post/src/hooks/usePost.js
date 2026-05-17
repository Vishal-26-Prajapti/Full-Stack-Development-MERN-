import { useState } from "react";

export default function usePost() {
  const [userName, setUserName] = useState("Alex Morgan");
  const [headline, setHeadline] = useState(
    "Software Engineer @ TechCorp | Building the Future",
  );

  const [postText, setPostText] = useState(
    `🚀 Thrilled to share that I've just wrapped up a brand new interactive project!`,
  );

  const [theme, setTheme] = useState("clean");
  const [liked, setLiked] = useState(false);

  return {
    userName,
    setUserName,
    headline,
    setHeadline,
    postText,
    setPostText,
    theme,
    setTheme,
    liked,
    setLiked,
  };
}
