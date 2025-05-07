import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import ActivityItem from "./ActivityItem";
import AddActivityModal from "./AddActivityModal";
import InfoActivityModal from "./InfoActivityModal";
import "./GroupActivities.css";
import { useNavigate } from "react-router";
import {
  getGroupActs,
  addGroupActivity,
  updateGroupAct,
  deleteGroupAct, generateExam,
} from "../../../services/groupsSevice";
import {useSelector} from "react-redux";

export default function GroupActivities({ group, isOwner }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);


  useEffect(() => {
    const fetchGroupsActs = async () => {
      try {
        const data = await getGroupActs(group.id, userId);
        setActivities(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroupsActs();
  }, [group.id]);

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);
  const handleEditModalOpen = (activity) => {
    setSelectedActivity(activity);
    setEditModalOpen(true);
  };
  const handleInfoModalOpen = (activity) => {
    setSelectedActivity(activity);
    setInfoModalOpen(true);
  };
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleInfoModalClose = () => setInfoModalOpen(false);

  const handleSave = async (activity) => {
    try {
      const { deckSearch, ...activityToSend } = activity;
      if (activityToSend.type == "Examen") {
        // Create an exam
        const exam_generated = await generateExam(group.id, activityToSend);
        const res = await addGroupActivity(group.id, activityToSend, exam_generated.id);
        console.log(res);
        setActivities((prev) => [...prev, res.group_act]);
      } else {
        const res = await addGroupActivity(group.id, activityToSend);
        console.log(res);
        setActivities((prev) => [...prev, res.group_act]);
      }


    } catch (error) {
      console.error("Error adding group activity", error);
    }
  };

  const handleEditAct = async (activityID, activity) => {
    try {
      const res = await updateGroupAct(group.id, activityID, activity);
      const updatedData = res.activity;
      setActivities((prevActs) =>
        prevActs.map((act) =>
          act.id === act.id
            ? {
                ...updatedData,
              }
            : act
        )
      );
    } catch (error) {
      console.error("Error updating group activity", error);
    }
    setEditModalOpen(false);
  };

  const handleDeleteAct = async (activityID) => {
    try {
      const res = await deleteGroupAct(group.id, activityID);
      console.log(res);

      setActivities((prevActs) =>
        prevActs.filter((act) => activityID !== act.id)
      );
    } catch (error) {
      console.error("Error updating group activity", error);
    }
    setEditModalOpen(false);
  };

  const startActivity = (activity) => {
    console.log(activity)
    if (activity.type == 'Examen') {
      navigate('/exam', {
        state: { id: activity.exam_id}
      })
    } else {
      navigate("/study", {
        state: { name: activity.deck, owner: activity.deckOwner },
      });
    }
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
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isOwner={isOwner}
                activityClick={() => startActivity(activity)}
                onEdit={() => handleEditModalOpen(activity)}
                onInfo={() => handleInfoModalOpen(activity)}
                onDelete={() => handleDeleteAct(activity.id)}
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
        <InfoActivityModal
          mode={"edit"}
          handleClose={handleEditModalClose}
          activity={selectedActivity}
          handleSave={handleEditAct}
        />
      )}
      {infoModalOpen && selectedActivity && (
        <InfoActivityModal
          mode={"info"}
          handleClose={handleInfoModalClose}
          activity={selectedActivity}
        />
      )}
    </section>
  );
}
