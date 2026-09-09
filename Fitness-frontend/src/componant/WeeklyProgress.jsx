import React from "react";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TimerIcon from "@mui/icons-material/Timer";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const WeeklyProgress = ({
  weeklyCalories,
  weeklyDuration,
  weeklyActivities,
  activeDays,
  weekDays,
}) => {

  const totalDays = 7;

  const progress =
    Math.round((activeDays / totalDays) * 100);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #1C1C1C, #111)",

        border: "1px solid #FF6B00",

        borderRadius: 4,

        p: 3,

        color: "white",

        height: "100%",
      }}
    >

      {/* TITLE */}

      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.1rem",
          mb: 3,
        }}
      >
        WEEKLY PROGRESS
      </Typography>


      {/* ================= TOP SECTION ================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          justifyContent: "space-between",

          flexWrap: "wrap",

          gap: 3,
        }}
      >

        {/* ================= PROGRESS CIRCLE ================= */}

        <Box
          sx={{
            position: "relative",

            display: "inline-flex",

            justifyContent: "center",

            alignItems: "center",
          }}
        >

          <CircularProgress
            variant="determinate"
            value={100}
            size={200}
            thickness={4}

            sx={{
              color: "#2A2A2A",

              position: "absolute",
            }}
          />

          <CircularProgress
            variant="determinate"
            value={progress}
            size={200}
            thickness={4}

            sx={{
              color: "#FF6B00",
            }}
          />

          {/* CENTER TEXT */}

          <Box
            sx={{
              position: "absolute",

              display: "flex",

              flexDirection: "column",

              alignItems: "center",
            }}
          >

            <Typography
              sx={{
                fontSize: "2.3rem",

                fontWeight: "bold",
              }}
            >
              {progress}%
            </Typography>

            <Typography
              sx={{
                color: "#FF6B00",

                fontWeight: "bold",

                fontSize: "1.3rem",
              }}
            >
              {activeDays} / 7
            </Typography>

            <Typography
              sx={{
                color: "#999",

                fontSize: "0.9rem",
              }}
            >
              Days Active
            </Typography>

          </Box>

        </Box>


        {/* ================= WEEKLY STATS ================= */}

        <Box
          sx={{
            display: "flex",

            flexDirection: "column",

            gap: 2,

            minWidth: 180,
          }}
        >

          <WeeklyStat
            icon={<LocalFireDepartmentIcon />}
            value={weeklyCalories}
            label="Total Calories"
          />

          <WeeklyStat
            icon={<TimerIcon />}
            value={`${weeklyDuration} min`}
            label="Total Workout Time"
          />

          <WeeklyStat
            icon={<DirectionsRunIcon />}
            value={weeklyActivities}
            label="Activities"
          />

        </Box>

      </Box>


      {/* ================= THIS WEEK ================= */}

      <Typography
        sx={{
          mt: 4,

          mb: 2,

          fontSize: "0.85rem",

          fontWeight: "bold",

          color: "#AAA",
        }}
      >
        THIS WEEK
      </Typography>


      {/* DAYS */}

      <Box
        sx={{
          display: "flex",

          justifyContent: "space-between",

          gap: 1,
        }}
      >

        {weekDays.map((day) => (

          <Box
            key={day.name}

            sx={{
              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              gap: 1,
            }}
          >

            <Typography
              sx={{
                fontSize: "0.75rem",

                color: "#AAA",

                fontWeight: "bold",
              }}
            >
              {day.name}
            </Typography>


            <Box
              sx={{
                width: 28,

                height: 28,

                borderRadius: "50%",

                border: day.active
                  ? "1px solid #4CAF50"
                  : "1px solid #555",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                color: day.active
                  ? "#4CAF50"
                  : "#777",
              }}
            >

              {day.active && "✓"}

            </Box>

          </Box>

        ))}

      </Box>


      {/* ================= MESSAGE ================= */}

      <Box
        sx={{
          mt: 3,

          p: 2,

          backgroundColor: "#181818",

          borderRadius: 2,

          display: "flex",

          alignItems: "center",

          gap: 1,
        }}
      >

        <TrendingUpIcon
          sx={{
            color: "#66BB6A",
          }}
        />

        <Typography
          sx={{
            color: "#66BB6A",

            fontWeight: "bold",
          }}
        >
          Great job!
        </Typography>

        <Typography
          sx={{
            color: "#AAA",
          }}
        >
          You're on track to reach your fitness goals.
        </Typography>

      </Box>

    </Box>
  );
};


/* ===============================
   WEEKLY STAT
================================ */

const WeeklyStat = ({
  icon,
  value,
  label,
}) => {

  return (

    <Box
      sx={{
        display: "flex",

        alignItems: "center",

        gap: 2,
      }}
    >

      {/* ICON */}

      <Box
        sx={{
          width: 52,

          height: 52,

          borderRadius: 3,

          backgroundColor:
            "rgba(255,107,0,0.15)",

          color: "#FF6B00",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",
        }}
      >

        {icon}

      </Box>


      {/* TEXT */}

      <Box>

        <Typography
          sx={{
            fontSize: "1.2rem",

            fontWeight: "bold",
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            color: "#999",

            fontSize: "0.85rem",
          }}
        >
          {label}
        </Typography>

      </Box>

    </Box>

  );

};


export default WeeklyProgress;