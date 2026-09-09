import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

import React, { useState } from "react";
import { addActivity } from "../services/api";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";


function ActivityForm({ onActivityAdded }) {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    additionalMatrics: {},
  });

  const [exercises, setExercises] = useState([
    {
      name: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ]);

  // ===============================
  // UPDATE EXERCISE
  // ===============================

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];

    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };

    setExercises(updatedExercises);
  };

  // ===============================
  // ADD EXERCISE
  // ===============================

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        name: "",
        sets: "",
        reps: "",
        weight: "",
      },
    ]);
  };

  // ===============================
  // REMOVE EXERCISE
  // ===============================

  const removeExercise = (index) => {
    if (exercises.length === 1) return;

    setExercises(exercises.filter((_, i) => i !== index));
  };

  // ===============================
  // SUBMIT ACTIVITY
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const activityData = {
  ...activity,

  duration: Number(activity.duration),

  activityDate: activityDate,

  additionalMatrics:
    activity.type === "WEIGHT_TRAINING"
      ? {
          exercises: exercises.map((exercise) => ({
            name: exercise.name,
            sets: Number(exercise.sets),
            reps: Number(exercise.reps),
            weight: Number(exercise.weight),
          })),
        }
      : {},
};

      console.log("Sending Activity:", activityData);

      await addActivity(activityData);

      // Close modal / refresh activities
      if (onActivityAdded) {
        onActivityAdded();
      }

      // Reset Activity
      setActivity({
        type: "RUNNING",
        duration: "",
        additionalMatrics: {},
      });

      // Reset Exercises
      setExercises([
        {
          name: "",
          sets: "",
          reps: "",
          weight: "",
        },
      ]);
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };



  const [activityDate, setActivityDate] = useState(
  new Date().toISOString().split("T")[0]
);


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
      }}
    >
      {/* ================= ACTIVITY TYPE ================= */}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel >Activity Type</InputLabel>

        <Select
          value={activity.type}
          label="Activity Type"
          onChange={(e) =>
            setActivity({
              ...activity,
              type: e.target.value,
            })
          }
        >
          <MenuItem value="RUNNING">
          <DirectionsRunIcon />
             Running
          </MenuItem>

          <MenuItem value="WALKING">
          <DirectionsWalkIcon/>
             Walking
          </MenuItem>

          <MenuItem value="CYCLING">
          <DirectionsBikeIcon/>
             Cycling
          </MenuItem>

          <MenuItem value="SWIMMING">
         < PoolIcon/>
             Swimming
          </MenuItem>

          <MenuItem value="WEIGHT_TRAINING">
          <FitnessCenterIcon/>
             Strength Training
          </MenuItem>

          <MenuItem value="YOGA">
          <SelfImprovementIcon/>
            Yoga
          </MenuItem>

          

          <MenuItem value="CARDIO">
         < RunCircleIcon/>
             Cardio
          </MenuItem>

          <MenuItem value="STRETCHING">
          <SportsGymnasticsIcon/>
             Stretching
          </MenuItem>

          
        </Select>
      </FormControl>

      {/* ================= DURATION ================= */}

      <TextField
        fullWidth
        required
        label="Duration (Minutes)"
        type="number"
        sx={{ mb: 3 }}
        value={activity.duration}
        onChange={(e) =>
          setActivity({
            ...activity,
            duration: e.target.value,
          })
        }
      />

     <TextField
  label="Activity Date"
  type="date"
  sx={{ mb: 3}}
  value={activityDate}
  onChange={(e) => setActivityDate(e.target.value)}
  fullWidth
  InputLabelProps={{
    shrink: true,
  }}
/>

     
      {/* =====================================
          WEIGHT TRAINING SECTION
      ===================================== */}

      {activity.type === "WEIGHT_TRAINING" && (
        <Box
          sx={{
            mt: 2,
            mb: 3,
            p: 2.5,
            borderRadius: 2,
            border: "1px solid #333",
            backgroundColor: "#181818",
          }}
        >
          {/* TITLE */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <FitnessCenterIcon
              sx={{
                color: "#FF6B00",
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#FF6B00",
              }}
            >
              Strength Exercises
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#999",
              fontSize: "0.9rem",
              mb: 3,
            }}
          >
            Add the exercises you performed during your workout.
          </Typography>

          <Divider
            sx={{
              borderColor: "#333",
              mb: 3,
            }}
          />

          {/* ================= EXERCISES ================= */}

          {exercises.map((exercise, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                p: 2,
                mb: 2,
                borderRadius: 2,
                border: "1px solid #333",
                backgroundColor: "#f4ecec",
              }}
            >
              {/* EXERCISE HEADER */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Exercise {index + 1}
                </Typography>

                {exercises.length > 1 && (
                  <IconButton
                    onClick={() => removeExercise(index)}
                    sx={{
                      color: "#ff5252",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>

              {/* EXERCISE NAME */}

              <TextField
                fullWidth
                required
                label="Exercise Name"
                placeholder="Example: Squat"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                  },
                }}
                value={exercise.name}
                onChange={(e) =>
                  handleExerciseChange(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />

              {/* SETS / REPS / WEIGHT */}

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {/* SETS */}

                <TextField
                  required
                  label="Sets"
                  type="number"
                  value={exercise.sets}
                  onChange={(e) =>
                    handleExerciseChange(
                      index,
                      "sets",
                      e.target.value
                    )
                  }
                />

                {/* REPS */}

                <TextField
                  required
                  label="Reps"
                  
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseChange(
                      index,
                      "reps",
                      e.target.value
                    )
                  }
                />

                {/* WEIGHT */}

                <TextField
                  required
                  label="Weight (kg)"
                 
                  value={exercise.weight}
                  onChange={(e) =>
                    handleExerciseChange(
                      index,
                      "weight",
                      e.target.value
                    )
                  }
                />
              </Box>
            </Box>
          ))}

          {/* ADD EXERCISE BUTTON */}

          <Button
            fullWidth
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={addExercise}
            sx={{
              borderColor: "#FF6B00",
              color: "#FF6B00",
              py: 1.2,

              "&:hover": {
                borderColor: "#FF6B00",
                backgroundColor: "rgba(255,107,0,0.08)",
              },
            }}
          >
            ADD ANOTHER EXERCISE
          </Button>
        </Box>
      )}

      {/* ================= SUBMIT BUTTON ================= */}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          py: 1.7,

          backgroundColor: "#FF6B00",

          fontWeight: "bold",

          fontSize: "1rem",

          "&:hover": {
            backgroundColor: "#E65F00",
          },
        }}
      >
        ADD ACTIVITY
      </Button>
    </Box>
  );
}

export default ActivityForm;