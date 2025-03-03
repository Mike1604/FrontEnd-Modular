import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import {
  removeGroupPost,
  getGroupPosts,
  addGroupPost,
} from "../../../services/groupsSevice";
import AddGroupPost from "./AddGroupPost";
import PostItem from "./PostItem"; // Importamos el nuevo componente

import "./GroupHome.css";

export default function GroupHome({ group }) {
  const userId = useSelector((state) => state.auth.userId);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getGroupPosts(group.id);
        setPosts(res);
      } catch (e) {
        alert("An error occurred while fetching posts");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [group]);

  const handleAddPost = async (newPostText) => {
    try {
      setIsLoading(true);
      const postData = { text_content: newPostText };

      const res = await addGroupPost(group.id, postData);

      setPosts([...posts, res.post]);
    } catch (e) {
      alert("An error occurred while adding the post");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      setIsLoading(true);
      await removeGroupPost(group.id, postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (e) {
      alert("An error occurred while deleting the post");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="group-section-container">
      <div className="group-home-container">
        <AddGroupPost onAddPost={handleAddPost} isLoading={isLoading} />
        <div className={`posts-container ${isLoading}`}>
          {isLoading ? (
            <CircularProgress />
          ) : posts.length === 0 ? (
            <p className="no-posts">Aún no hay anuncios</p>
          ) : (
            posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                userId={userId}
                groupOwner={group.owner}
                onDelete={handleDeletePost}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
