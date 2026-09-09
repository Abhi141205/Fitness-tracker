import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getActivityDetail } from "../services/api";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  Button,
  Chip,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TimerIcon from "@mui/icons-material/Timer";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";


const ActivityDetail = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);

  const [recommendation, setRecommendation] = useState(null);


  useEffect(() => {

    const fetchActivityDetail = async () => {

      try {

        const response = await getActivityDetail(id);
        console.log("Activity Detail Response:", response.data);

        setActivity(response.data);    

        setRecommendation(response.data.recommendation);
        if (response.data) {

        clearInterval(intervalId);

      }

      } catch (error) {

        console.error(error);

      }

    };

    fetchActivityDetail();
    const intervalId = setInterval(() => {

    fetchActivityDetail();

  }, 3000);


 
  return () => {

    clearInterval(intervalId);

  };


  }, [id]);


  /*  LOADING ... */

  if (!activity) {

    return (

      <Box
        sx={{
          minHeight: "100vh",

          backgroundColor: "#0B0B0B",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",
        }}
      >

        <Typography
          sx={{
            color: "#FF6B00",
            fontSize: "1.2rem",
          }}
        >
          Loading your activity...
        </Typography>

      </Box>

    );

  }


  return (

    <Box
      sx={{
        minHeight: "100vh",

        backgroundColor: "#0B0B0B",

        color: "white",

        p: {
          xs: 2,
          md: 4,
        },
      }}
    >


       {/* BACK BUTTON    */}

      <Button
        startIcon={<ArrowBackIcon />}

        onClick={() => navigate("/activities")}

        sx={{
          color: "#FF6B00",

          mb: 4,

          fontWeight: "bold",

          "&:hover": {
            backgroundColor: "rgba(255,107,0,0.1)",
          },
        }}
      >
        BACK TO DASHBOARD
      </Button>


      {/*  PAGE HEADER........  */}

      <Box
        sx={{
          mb: 5,
        }}
      >

        <Typography
          sx={{
            color: "#FF6B00",

            fontWeight: "bold",

            letterSpacing: 2,

            mb: 1,
          }}
        >
          ACTIVITY INSIGHTS
        </Typography>


        <Typography
          variant="h3"

          sx={{
            fontWeight: "bold",

            mb: 1,
          }}
        >
          Your Workout Analysis
        </Typography>


        <Typography
          sx={{
            color: "#888",
          }}
        >
          Detailed activity statistics and AI-powered recommendations.
        </Typography>

      </Box>


      {/* ACTIVITY SUMMARY...... */}

      
<Grid
  container
  spacing={3}
  sx={{
    mb: 4,
  }}
>

  
  

  
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <StatCard
      icon={<DirectionsRunIcon />}
      label="ACTIVITY"
      value={activity.type}
    />
  </Grid>



  
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <StatCard
      icon={<TimerIcon />}
      label="DURATION"
      value={`${activity.duration} min`}
    />
  </Grid>


  
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <StatCard
      icon={<LocalFireDepartmentIcon />}
      label="CALORIES BURNED"
      value={`${activity.caloriesBurned} kcal`}
    />
  </Grid>



  
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <StatCard
      icon={<TrendingUpIcon />}
      label="ACTIVITY DATE"
      value={
        activity.createdAt
          ? new Date(activity.createdAt).toLocaleDateString()
          : "N/A"
      }
    />
  </Grid>
</Grid>
      
{/* EXERCISES PERFORMED.........*/}

{activity.type === "WEIGHT_TRAINING" &&
  activity.additionalMatrics?.exercises?.length > 0 && (

    <Box sx={{ mb: 5 }}>

      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 3,
        }}
      >
        💪 EXERCISES PERFORMED
      </Typography>


      <Grid container spacing={3}>

        {activity.additionalMatrics.exercises.map(
          (exercise, index) => (

            <Grid
              key={index}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >

              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #1A1A1A, #111)",

                  border:
                    "1px solid #292929",

                  borderRadius: 4,

                  color: "white",

                  height: "100%",

                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "#FF6B00",
                  },
                }}
              >

                <CardContent sx={{ p: 3 }}>

                  {/* EXERCISE NAME */}

                  <Typography
                    variant="h6"
                    sx={{
                      color: "#FF6B00",
                      fontWeight: "bold",
                      mb: 3,
                    }}
                  >
                    💪 {exercise.name}
                  </Typography>


                 

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >

                    <ExerciseStat
                      label="SETS"
                      value={exercise.sets}
                    />

                    <ExerciseStat
                      label="REPS"
                      value={exercise.reps}
                    />

                    <ExerciseStat
                      label="WEIGHT"
                      value={`${exercise.weight} kg`}
                    />

                  </Box>

                </CardContent>

              </Card>

            </Grid>

          )
        )}

      </Grid>

    </Box>

)}
    


      {/* AI SECTION .......*/}

      {recommendation ? (

        <Box>


         

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 1,

              mb: 3,
            }}
          >

            <AutoAwesomeIcon
              sx={{
                color: "#FF6B00",

                fontSize: 35,
              }}
            />


            <Typography
              variant="h4"

              sx={{
                fontWeight: "bold",
              }}
            >
              AI FITNESS COACH
            </Typography>

          </Box>


        

          <Card
            sx={{
              background:
                "linear-gradient(135deg, #1C1C1C, #111)",

              color: "white",

              border:
                "1px solid #FF6B00",

              borderRadius: 4,

              mb: 3,
            }}
          >

            <CardContent
              sx={{
                p: 4,
              }}
            >

              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 2,

                  mb: 3,
                }}
              >

                <AutoAwesomeIcon
                  sx={{
                    color: "#FF6B00",

                    fontSize: 40,
                  }}
                />


                <Box>

                  <Typography
                    variant="h5"

                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    AI Workout Analysis
                  </Typography>


                  <Typography
                    sx={{
                      color: "#888",
                    }}
                  >
                    Personalized insights based on your activity
                  </Typography>

                </Box>

              </Box>


              <Divider
                sx={{
                  borderColor: "#333",

                  mb: 3,
                }}
              />


              <Typography
                sx={{
                  color: "#CFCFCF",

                  fontSize: "1.1rem",

                  lineHeight: 1.8,
                }}
              >
                {recommendation}
              </Typography>

            </CardContent>

          </Card>





          {/*  AI CARDS ...... */}

          <Grid
            container

            spacing={3}
          >


            {/* IMPROVEMENTS */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >

              <RecommendationCard

                icon={<TrendingUpIcon />}

                title="IMPROVEMENTS"

                items={activity.improvements}

              />

            </Grid>


            {/* SUGGESTIONS */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >

              <RecommendationCard

                icon={<LightbulbIcon />}

                title="SUGGESTIONS"

                items={activity.suggestions}

              />

            </Grid>


            {/* SAFETY */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >

              <RecommendationCard

                icon={<HealthAndSafetyIcon />}

                title="SAFETY GUIDELINES"

                items={activity.safety}

              />

            </Grid>

          </Grid>

        </Box>

      ) : (

        <Card
          sx={{
            backgroundColor: "#151515",

            color: "white",

            border: "1px solid #252525",

            borderRadius: 4,
          }}
        >

          <CardContent
            sx={{
              p: 4,

              textAlign: "center",
            }}
          >

            <AutoAwesomeIcon
              sx={{
                fontSize: 60,

                color: "#FF6B00",

                mb: 2,
              }}
            />


            <Typography
              variant="h6"

              sx={{
                fontWeight: "bold",

                mb: 1,
              }}
            >
              AI Recommendation Not Available
            </Typography>


            <Typography
              sx={{
                color: "#888",
              }}
            >
              Your AI recommendation is still being generated.
            </Typography>

          </CardContent>

        </Card>

      )}

    </Box>

  );

};


/*  STAT CARD*/

const StatCard = ({ icon, label, value }) => {

  return (

    <Card
      sx={{
        backgroundColor: "#151515",

        color: "white",

        border:
          "1px solid #252525",

        borderRadius: 4,

        height: "100%",

        transition: "0.3s",

        "&:hover": {

          transform:
            "translateY(-5px)",

          borderColor:
            "#FF6B00",

        },
      }}
    >

      <CardContent>


        <Box
          sx={{
            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",
          }}
        >

          <Box>

            <Typography
              sx={{
                color: "#888",

                fontSize: "0.75rem",

                fontWeight: "bold",

                mb: 1,
              }}
            >
              {label}
            </Typography>


            <Typography
              variant="h6"

              sx={{
                fontWeight: "bold",

                textTransform: "capitalize",
              }}
            >
              {value}
            </Typography>

          </Box>


          <Box
            sx={{
              width: 50,

              height: 50,

              borderRadius: 3,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              backgroundColor:
                "rgba(255,107,0,0.15)",

              color:
                "#FF6B00",
            }}
          >

            {icon}

          </Box>

        </Box>

      </CardContent>

    </Card>

  );

};


/* AI RECOMMENDATION CARD*/

const RecommendationCard = ({ icon, title, items }) => {

  return (

    <Card
      sx={{
        backgroundColor: "#151515",

        color: "white",

        border:
          "1px solid #252525",

        borderRadius: 4,

        height: "100%",
      }}
    >

      <CardContent
        sx={{
          p: 3,
        }}
      >


        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: 1,

            mb: 3,

            color:
              "#FF6B00",
          }}
        >

          {icon}


          <Typography
            variant="h6"

            sx={{
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>

        </Box>


        {items && items.length > 0 ? (

          items.map((item, index) => (

            <Box
              key={index}

              sx={{
                display: "flex",

                gap: 1,

                mb: 2,
              }}
            >

              <Typography
                sx={{
                  color:
                    "#FF6B00",
                }}
              >
                •
              </Typography>


              <Typography
                sx={{
                  color:
                    "#B0B0B0",

                  lineHeight:
                    1.6,
                }}
              >
                {item}
              </Typography>

            </Box>

          ))

        ) : (

          <Typography
            sx={{
              color:
                "#777",
            }}
          >
            No recommendations available.
          </Typography>

        )}

      </CardContent>

    </Card>

  );

};
const ExerciseStat = ({ label, value }) => {

  return (

    <Box>

      <Typography
        sx={{
          color: "#777",
          fontSize: "0.7rem",
          fontWeight: "bold",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontWeight: "bold",
          color: "white",
        }}
      >
        {value}
      </Typography>

    </Box>

  );

};


export default ActivityDetail;
