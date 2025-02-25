import { Button, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PostItem({ post, userId, groupOwner, onDelete }) {
  const canDelete = post.post_owner.id === userId || userId === groupOwner;

  return (
    <div className="post-item">
      <div className="post-header">
        <Avatar src={`${post.post_owner.profile_picture_path}?t=${Date.now()}`}>
          {`${post.post_owner.first_name?.[0]}${post.post_owner.last_name?.[0]}`}
        </Avatar>
        <div className="post-info">
          <span className="post-owner-name">
            {post.post_owner.first_name} {post.post_owner.last_name}{" "}
            {post.post_owner.id === groupOwner && " (Admin)"}
          </span>
          <span className="post-date">
            {new Date(post.created_at).toLocaleString()}
          </span>
        </div>
        {canDelete && (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(post.id)}
            color="error"
            className="delete-button"
          >
            Delete
          </Button>
        )}
      </div>
      <p className="post-text">{post.text_content}</p>
    </div>
  );
}
