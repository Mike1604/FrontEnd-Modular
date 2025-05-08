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
    <li className={activity.done ? 'act-item-cont-done' : 'act-item-cont'}>
      {activity.type === "Leitner Clasico" ? (
        <LibraryBooksOutlined className="act-icon" />
      ) : (
        <PendingActionsOutlined className="act-icon" />
      )}

      <div className="act-content">
        <div className="act-header">
          {activity.done ?
              <h2>{activity.title}</h2>
              :
            <h2 onClick={activityClick}>{activity.title}</h2>
          }
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
        { activity.done ?
            <p style={{color: "white"}}>Examen Completado. Calificación {activity.calification}.</p> :
            <p onClick={activityClick}>{activity.type} {activity.id}</p>
        }
        { activity.done ?
            <p className="act-item-descr">{activity.description}</p> :
            <p onClick={activityClick} className="act-item-descr">{activity.description}</p>
        }
      </div>
    </li>
  );
}
