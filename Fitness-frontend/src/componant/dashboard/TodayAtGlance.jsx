import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TimerIcon from "@mui/icons-material/Timer";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


const TodayAtGlance = ({
  todayCalories = 0,
  todayDuration = 0,
  todayActivityCount = 0,
  dailyGoal = 0,
  onEditGoal,
}) => {

  // Calculate daily progress safely
  const dailyProgress =
    dailyGoal > 0 ? Math.min(Math.round((todayCalories / dailyGoal) * 100),
    100 ): 0;


  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #151515, #0F0F0F)",
        border: "1px solid #252525",
        borderRadius: 4,
        p: {
          xs: 2,
          md: 3,
        },
        mb: 4,
      }}
    >

      {/* ================= TITLE ================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
          flexWrap: "wrap",
        }}
      >

        <CalendarMonthIcon
          sx={{
            color: "#FF6B00",
          }}
        />

        <Typography
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          TODAY AT A GLANCE
        </Typography>

        <Typography
          sx={{
            color: "#999",
            ml: 1,
          }}
        >
          {new Date().toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          )}
        </Typography>

      </Box>


      {/* ================= STATS ================= */}

      <Grid container spacing={3}>

        {/* CALORIES */}

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <TodayStat
            icon={<LocalFireDepartmentIcon />}
            title="Calories Burned"
            value={`${todayCalories} kcal`}
          />

        </Grid>


        {/* WORKOUT TIME */}

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <TodayStat
            icon={<TimerIcon />}
            title="Workout Time"
            value={`${todayDuration} min`}
          />

        </Grid>


        {/* ACTIVITIES */}

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <TodayStat
            icon={<DirectionsRunIcon />}
            title="Activities"
            value={todayActivityCount}
          />

        </Grid>


        {/* ================= DAILY GOAL ================= */}

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >

            {/* TITLE + EDIT */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >

              <Typography
                sx={{
                  color: "#AAA",
                  fontWeight: "bold",
                }}
              >
                Daily Goal
              </Typography>


              <Button
                size="small"
                onClick={onEditGoal}
                sx={{
                  color: "#FF6B00",
                  fontWeight: "bold",
                  minWidth: "auto",

                  "&:hover": {
                    backgroundColor:
                      "rgba(255,107,0,0.1)",
                  },
                }}
              >
                EDIT
              </Button>

            </Box>


            {/* GOAL VALUE */}

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 1,
              }}
            >
              {todayCalories} / {dailyGoal} kcal
            </Typography>


            {/* PROGRESS */}

            <Typography
              sx={{
                color: "#FF6B00",
                fontSize: "0.85rem",
                mb: 1,
              }}
            >
              {dailyProgress}% Completed
            </Typography>


            {/* PROGRESS BAR */}

            <Box
              sx={{
                height: 7,
                width: "100%",
                backgroundColor: "#333",
                borderRadius: 5,
                overflow: "hidden",
              }}
            >

              <Box
                sx={{
                  width: `${dailyProgress}%`,
                  height: "100%",
                  backgroundColor: "#FF6B00",
                  borderRadius: 5,
                  transition: "width 0.4s ease",
                }}
              />

            </Box>

          </Box>

        </Grid>

      </Grid>

    </Box>
  );
};


/* =====================================
   TODAY STAT COMPONENT
===================================== */

const TodayStat = ({
  icon,
  title,
  value,
}) => {

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        height: "100%",
      }}
    >

      {/* ICON */}

      <Box
        sx={{
          width: 64,
          height: 64,
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
            color: "#AAA",
            fontWeight: "bold",
            fontSize: "0.85rem",
          }}
        >
          {title}
        </Typography>


        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mt: 0.5,
          }}
        >
          {value}
        </Typography>


        <Typography
          sx={{
            color: "#777",
            fontSize: "0.8rem",
          }}
        >
          Today
        </Typography>

      </Box>

    </Box>
  );
};


export default TodayAtGlance;