import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteActivity } from "../services/api";


function ActivityList({
  activities = [],
  onActivityDeleted,
}) {

  const navigate = useNavigate();


  /* =====================================
     DELETE ACTIVITY
  ===================================== */

  const handleDelete = async (event, activityId) => {

    // Prevent opening activity details page
    event.stopPropagation();



    try {

      await deleteActivity(activityId);

      // Refresh activities in Dashboard
      if (onActivityDeleted) {
        onActivityDeleted();
      }

    } catch (error) {

      console.error(
        "Error deleting activity:",
        error
      );

      alert("Failed to delete activity");

    }

  };


  return (

    <Grid container spacing={2}>

      {activities.map((activity) => (

        <Grid
          key={activity.id}
          size={{ xs: 12, sm: 6, md: 4 }}
        >

          <Card

            onClick={() =>
              navigate(`/activities/${activity.id}`)
            }

            sx={{
              cursor: "pointer",

              backgroundColor: "#1E1E1E",

              color: "white",

              borderRadius: 3,

              border: "1px solid #2A2A2A",

              transition: "0.3s",

              position: "relative",

              "&:hover": {
                transform: "translateY(-5px)",
                borderColor: "#FF6B00",
              },
            }}
          >

            {/* DELETE BUTTON */}

            <IconButton

              onClick={(event) =>
                handleDelete(
                  event,
                  activity.id
                )
              }

              sx={{
                position: "absolute",

                top: 10,

                right: 10,

                color: "#ff4444",

                "&:hover": {
                  backgroundColor:
                    "rgba(255, 68, 68, 0.15)",
                },
              }}
            >

              <DeleteIcon />

            </IconButton>


            <CardContent sx={{ p: 3 }}>

              <Typography
                variant="h6"

                sx={{
                  fontWeight: "bold",

                  color: "#FF6B00",

                  mb: 2,

                  pr: 4,
                }}
              >
                {activity.type}
              </Typography>


              <Typography
                sx={{
                  color: "#A0A0A0",
                  mb: 1,
                }}
              >

                ⏱ Duration:{" "}

                <Box
                  component="span"

                  sx={{
                    color: "white",
                  }}
                >
                  {activity.duration} min
                </Box>

              </Typography>


              <Typography
                sx={{
                  color: "#A0A0A0",
                }}
              >

                🔥 Calories:{" "}

                <Box
                  component="span"

                  sx={{
                    color: "white",
                  }}
                >
                  {activity.caloriesBurned}
                </Box>

              </Typography>

            </CardContent>

          </Card>

        </Grid>

      ))}


      {/* NO ACTIVITIES */}

      {activities.length === 0 && (

        <Typography
          sx={{
            color: "#777",
            p: 3,
          }}
        >
          No activities yet. Add your first activity! 💪
        </Typography>

      )}

    </Grid>

  );

}


export default ActivityList;