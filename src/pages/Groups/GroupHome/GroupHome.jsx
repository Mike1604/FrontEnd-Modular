import React, { useState } from "react";
import AddGroupPost from "./AddGroupPost";
import "./GroupHome.css";

export default function GroupHome({ group }) {
  const [posts, setPosts] = useState([]);

  const handleAddPost = (newPost) => {
    setPosts([...posts, { id: Date.now(), text: newPost }]); // Agrega un post con un ID único
  };

  return (
    <section className="group-section-container">
      <div className="group-home-container">
        <AddGroupPost onAddPost={handleAddPost} />

        <div className="text-container">
          <div className="posts-container">
            {posts.length === 0 ? (
              <p className="no-posts">Aún no hay publicaciones</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="post-item">
                  {post.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
