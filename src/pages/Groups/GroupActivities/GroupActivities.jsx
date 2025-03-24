import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import ActivityItem from "./ActivityItem";
import AddActivityModal from "./AddActivityModal";
import EditActivityModal from "./EditActivityModal";
import "./GroupActivities.css";
import { useNavigate } from "react-router";



export default function GroupActivities({ group, isOwner }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);
  const handleEditModalOpen = (activity) => {
    setSelectedActivity(activity);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleSave = (activity) => {
    console.log(activity);
    
    setActivities((prev) => [...prev, activity]);
  };

  const startActivity = (activity) => {
    navigate('/study', {state: {name: activity.deck, owner: activity.owner}})
  }

  return (
    <section className="group-section-container">
      <div className="group-act-container">
        <div className="create-activity">
          <h2>Actividades del Grupo</h2>

          {isOwner && (
            <Button
              variant="outlined"
              endIcon={<AddOutlined />}
              onClick={handleAddModalOpen}
            >
              Crear Actividad
            </Button>
          )}
        </div>

        {activities.length === 0 ? (
          <p>Por el momento no hay actividades</p>
        ) : (
          <ul className="group-activities-cont">
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                title={activity.title}
                description={activity.description}
                type={activity.type}
                isOwner={isOwner}
                activityClick={() => startActivity(activity)}
                onEdit={() => handleEditModalOpen(activity)}
                />
            ))}
          </ul>
        )}
      </div>
      {addModalOpen && (
        <AddActivityModal
          handleClose={handleAddModalClose}
          handleSave={handleSave}
        />
      )}
      {editModalOpen && selectedActivity && (
        <EditActivityModal
          handleClose={handleEditModalClose}
          activity={selectedActivity}
        />
      )}
    </section>
  );
}
