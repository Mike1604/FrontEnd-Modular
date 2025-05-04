import {
  LibraryBooksOutlined,
  PendingActionsOutlined,
  Edit,
  DeleteOutline,
  InfoOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ActivityItem({ activity, isOwner, onEdit, activityClick, onInfo, onDelete }) {

  return (
    <li className="act-item-cont">
      {activity.type === "Leitner Clasico" ? (
        <LibraryBooksOutlined className="act-icon" />
      ) : (
        <PendingActionsOutlined className="act-icon" />
      )}

      <div className="act-content">
        <div className="act-header">
          <h2 onClick={activityClick}>{activity.title}</h2>
          {isOwner && (
            <div>
              <IconButton className="act-item-btn" size="small" onClick={onInfo}>
                <InfoOutlined fontSize="small" />
              </IconButton>
              <IconButton className="act-item-btn" size="small" onClick={onEdit}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton className="act-item-btn" size="small" color="error" onClick={onDelete}>
                <DeleteOutline fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>
        <p onClick={activityClick}>{activity.type}</p>
        <p onClick={activityClick} className="act-item-descr">{activity.description} {activity.id}</p>
      </div>
    </li>
  );
}
