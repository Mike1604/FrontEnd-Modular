import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import ActivityItem from "./ActivityItem";
import AddActivityModal from "./AddActivityModal";
import EditActivityModal from "./EditActivityModal";
import "./GroupActivities.css";

const dummyData = [
  {
    title: "Verb Vocabulary",
    description: "Group activity to learn the most common verbs in English.",
    type: "Leitner Clasico",
    evaluation: "Leitner",
    deck: "Verbs in English",
  },
  {
    title: "Adjective Vocabulary",
    description: "Test on descriptive adjectives in English.",
    type: "Examen",
    evaluation: "Basada en texto",
    deck: "Adjectives in English",
  },
  {
    title: "Noun Vocabulary",
    description: "Review activity on countable and uncountable nouns.",
    type: "Leitner Clasico",
    evaluation: "Leitner",
    deck: "Nouns in English",
  },
  {
    title: "Common Phrases Vocabulary",
    description: "Test on common phrases for daily conversation.",
    type: "Examen",
    evaluation: "Leitner",
    deck: "Common Phrases in English",
  },
  {
    title: "Pronoun Vocabulary",
    description: "Review of personal and possessive pronouns in English.",
    type: "Leitner Clasico",
    evaluation: "Basada en texto",
    deck: "Pronouns in English",
  },
];

export default function GroupActivities({ group, isOwner }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);

  //Update this when activities available in backend
  useEffect(() => {
    setActivities(dummyData);
  }, []);
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
