import {
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TimerIcon from "@mui/icons-material/Timer";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CheckIcon from "@mui/icons-material/Check";


const WeeklyProgress = ({
  progress,
  activeDays,
  weekDays,
  calories,
  duration,
  activities,
}) => {

  const radius = 95;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (progress / 100) * circumference;


  return (

    <Card
      sx={{
        background:
          "linear-gradient(135deg, #151515, #0D0D0D)",

        border: "1px solid #FF6B00",

        borderRadius: 4,

        color: "white",

        height: "100%",
      }}
    >

      <CardContent sx={{ p: 3 }}>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
        >
          WEEKLY PROGRESS
        </Typography>


        {/* CIRCLE + STATS */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            flexDirection: {
              xs: "column",
              sm: "row",
              md: "column",
              lg: "row",
            },

            gap: 2,
          }}
        >


          {/* PROGRESS CIRCLE */}

          <Box
            sx={{
              position: "relative",
              width: 210,
              height: 210,
              flexShrink: 0,
            }}
          >

            <svg
              width="210"
              height="210"
              viewBox="0 0 210 210"
            >

              <circle
                cx="105"
                cy="105"
                r={radius}
                fill="transparent"
                stroke="#292929"
                strokeWidth="14"
              />


              <circle
                cx="105"
                cy="105"
                r={radius}
                fill="transparent"
                stroke="#FF6B00"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 105 105)"
                style={{
                  transition:
                    "stroke-dashoffset 0.6s ease",
                }}
              />

            </svg>


            {/* CIRCLE TEXT */}

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,

                width: "100%",
                height: "100%",

                display: "flex",
                flexDirection: "column",

                alignItems: "center",
                justifyContent: "center",
              }}
            >

              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {progress}%
              </Typography>


              <Typography
                sx={{
                  color: "#FF6B00",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                }}
              >
                {activeDays} / 7
              </Typography>


              <Typography sx={{ color: "#AAA" }}>
                Days Active
              </Typography>

            </Box>

          </Box>


          {/* WEEKLY STATS */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flexGrow: 1,
            }}
          >

            <WeeklyStat
              icon={<LocalFireDepartmentIcon />}
              value={`${calories} kcal`}
              label="Total Calories"
            />


            <WeeklyStat
              icon={<TimerIcon />}
              value={`${duration} min`}
              label="Total Workout Time"
            />


            <WeeklyStat
              icon={<DirectionsRunIcon />}
              value={activities}
              label="Activities"
            />

          </Box>

        </Box>


        {/* DAYS OF WEEK */}

        <Typography
          sx={{
            fontWeight: "bold",
            color: "#AAA",
            fontSize: "0.85rem",

            mt: 3,
            mb: 2,
          }}
        >
          THIS WEEK
        </Typography>


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
                  fontSize: "0.7rem",
                  color: "#AAA",
                  fontWeight: "bold",
                }}
              >
                {day.name}
              </Typography>


              <Box
                sx={{
                  width: 30,
                  height: 30,

                  borderRadius: "50%",

                  border: day.active
                    ? "2px solid #4CAF50"
                    : "2px solid #555",

                  color: "#4CAF50",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >

                {day.active && (
                  <CheckIcon
                    sx={{
                      fontSize: 18,
                    }}
                  />
                )}

              </Box>

            </Box>

          ))}

        </Box>

      </CardContent>

    </Card>

  );
};


/* =====================================
   WEEKLY SMALL STAT
===================================== */

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

      <Box
        sx={{
          width: 55,
          height: 55,

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


      <Box>

        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
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