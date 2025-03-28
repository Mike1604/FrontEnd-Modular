import {
  LibraryBooksOutlined,
  PendingActionsOutlined,
  Edit,
  DeleteOutline,
  InfoOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ActivityItem({ title, description, type, isOwner, onEdit }) {
  return (
    <li className="act-item-cont">
      {type === "Leitner Clasico" ? (
        <LibraryBooksOutlined className="act-icon" />
      ) : (
        <PendingActionsOutlined className="act-icon" />
      )}

      <div className="act-content">
        <div className="act-header">
          <h2>{title}</h2>
          {isOwner && (
            <div>
              <IconButton className="act-item-btn" size="small">
                <InfoOutlined fontSize="small" />
              </IconButton>
              <IconButton className="act-item-btn" size="small" onClick={onEdit}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton className="act-item-btn" size="small" color="error">
                <DeleteOutline fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>
        <p>{type}</p>
        <p className="act-item-descr">{description}</p>
      </div>
    </li>
  );
}
