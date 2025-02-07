import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  removeGroupPost,
  getGroupPosts,
  addGroupPost,
} from "../../../services/groupsSevice";
import AddGroupPost from "./AddGroupPost";
import "./GroupHome.css";
import { Button } from "@mui/material";

//Todo: add delete button when auth for post owner
export default function GroupHome({ group }) {
  const userId = useSelector((state) => state.auth.userId);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isGroupOwner = userId === group.owner;

  useEffect(() => {
    const fetchData = async () => {
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
      const postData = {
        text_content: newPostText,
      };

      const res = await addGroupPost(group.id, postData);

      setPosts([...posts, { id: res.post_id, text_content: newPostText }]);
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
      const res = await removeGroupPost(group.id, postId);

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
        <div className="posts-container">
          {posts.length === 0 ? (
            <p className="no-posts">Aún no hay anuncios</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-item">
                <p>{post.text_content}</p>
                {isGroupOwner && (
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeletePost(post.id)}
                    color="error"
                  >
                    Delete
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
