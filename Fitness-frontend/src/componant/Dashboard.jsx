import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import {
  getActivities,
  getUserProfile,
  updateDailyGoal,
} from "../services/api";

import AddIcon from "@mui/icons-material/Add";

import ActivityForm from "./ActivityForm";

import TodayAtGlance from "./dashboard/TodayAtGlance";
import YourActivities from "./dashboard/ActivitySection";
import WeeklyProgress from "./dashboard/WeeklyProgress";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const Dashboard = ({ onLogout }) => {

  /* =====================================
     DATE HELPER
  ===================================== */

  const getLocalDateString = (date) => {

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  /* =====================================
     STATES
  ===================================== */

  const [dailyGoal, setDailyGoal] = useState(500);

  const [goalInput, setGoalInput] = useState("");

  const [openGoalDialog, setOpenGoalDialog] =
    useState(false);

  const [loadingGoal, setLoadingGoal] =
    useState(false);

  const [openForm, setOpenForm] =
    useState(false);

  const [activities, setActivities] =
    useState([]);


  const userId =
    localStorage.getItem("userId");


  /* =====================================
     TODAY DATE
  ===================================== */

  const today =
    getLocalDateString(new Date());


  /* =====================================
     FETCH ACTIVITIES
  ===================================== */

  const fetchActivities = async () => {

    try {

      const response =
        await getActivities();

      console.log(
        "ACTIVITIES FROM API:",
        response.data
      );

      setActivities(response.data);

    } catch (error) {

      console.error(
        "Error fetching activities:",
        error
      );

    }

  };


  /* =====================================
     FETCH USER DAILY GOAL
  ===================================== */

  const fetchUserProfile = async () => {

    try {

      if (!userId) return;

      const response =
        await getUserProfile(userId);

      const userGoal =
        response.data.dailyGoal;

      if (
        userGoal &&
        Number(userGoal) > 0
      ) {

        setDailyGoal(
          Number(userGoal)
        );

      }

    } catch (error) {

      console.error(
        "Error fetching user profile:",
        error
      );

    }

  };


  /* =====================================
     LOAD DATA
  ===================================== */

  useEffect(() => {

    fetchActivities();

    fetchUserProfile();

  }, []);


  /* =====================================
     OPEN DAILY GOAL DIALOG
  ===================================== */

  const handleOpenGoalDialog = () => {

    setGoalInput(dailyGoal);

    setOpenGoalDialog(true);

  };


  /* =====================================
     SAVE DAILY GOAL
  ===================================== */

  const handleSaveDailyGoal = async () => {

    try {

      if (
        !goalInput ||
        Number(goalInput) <= 0
      ) {

        alert(
          "Please enter a valid daily goal."
        );

        return;

      }


      setLoadingGoal(true);


      await updateDailyGoal(

        userId,

        Number(goalInput)

      );


      setDailyGoal(
        Number(goalInput)
      );


      setOpenGoalDialog(false);


    } catch (error) {

      console.error(
        "Error updating daily goal:",
        error
      );

      alert(
        "Failed to update daily goal."
      );

    } finally {

      setLoadingGoal(false);

    }

  };


  /* =====================================
     TODAY ACTIVITIES
  ===================================== */

  const todayActivities =
    activities.filter(

      (activity) =>
        activity.activityDate === today

    );


  /* =====================================
     TODAY CALORIES
  ===================================== */

  const todayCalories =

    todayActivities.reduce(

      (total, activity) =>

        total +

        Number(
          activity.caloriesBurned || 0
        ),

      0

    );


  /* =====================================
     TODAY WORKOUT TIME
  ===================================== */

  const todayDuration =

    todayActivities.reduce(

      (total, activity) =>

        total +

        Number(
          activity.duration || 0
        ),

      0

    );


  /* =====================================
     TODAY ACTIVITY COUNT
  ===================================== */

  const todayActivityCount =
    todayActivities.length;


  /* =====================================
     DAILY PROGRESS
  ===================================== */

  const dailyProgress =

    dailyGoal > 0

      ? Math.min(

          Math.round(

            (todayCalories / dailyGoal) * 100

          ),

          100

        )

      : 0;


  /* =====================================
     GET START OF WEEK

     MONDAY = FIRST DAY
  ===================================== */

  const getStartOfWeek = () => {

    const currentDate =
      new Date();


    const day =
      currentDate.getDay();


    const diff =

      currentDate.getDate() -

      day +

      (day === 0 ? -6 : 1);


    const startOfWeek =
      new Date(currentDate);


    startOfWeek.setDate(diff);


    startOfWeek.setHours(

      0,
      0,
      0,
      0

    );


    return startOfWeek;

  };


  const startOfWeek =
    getStartOfWeek();


  /* =====================================
     START OF WEEK STRING

     Example:
     2026-09-01
  ===================================== */

  const startOfWeekString =
    getLocalDateString(startOfWeek);


  /* =====================================
     END OF WEEK

     SUNDAY
  ===================================== */

  const endOfWeek =
    new Date(startOfWeek);


  endOfWeek.setDate(

    startOfWeek.getDate() + 6

  );


  const endOfWeekString =
    getLocalDateString(endOfWeek);


  /* =====================================
     WEEKLY ACTIVITIES

     activityDate format:
     YYYY-MM-DD

     String comparison works correctly
     because the format is ISO date.
  ===================================== */

  const weeklyActivitiesList =

    activities.filter(

      (activity) => {

        if (!activity.activityDate) {

          return false;

        }


        return (

          activity.activityDate >=
            startOfWeekString &&

          activity.activityDate <=
            endOfWeekString

        );

      }

    );


  /* =====================================
     WEEKLY CALORIES
  ===================================== */

  const weeklyCalories =

    weeklyActivitiesList.reduce(

      (total, activity) =>

        total +

        Number(
          activity.caloriesBurned || 0
        ),

      0

    );


  /* =====================================
     WEEKLY WORKOUT TIME
  ===================================== */

  const weeklyDuration =

    weeklyActivitiesList.reduce(

      (total, activity) =>

        total +

        Number(
          activity.duration || 0
        ),

      0

    );


  /* =====================================
     WEEKLY ACTIVITY COUNT
  ===================================== */

  const weeklyActivities =

    weeklyActivitiesList.length;


  /* =====================================
     ACTIVE DAYS

     activityDate is already:

     YYYY-MM-DD

     So no Date conversion needed.
  ===================================== */

  const activeDates =

    new Set(

      weeklyActivitiesList

        .map(

          (activity) =>
            activity.activityDate

        )

        .filter(Boolean)

    );


  const activeDays =
    activeDates.size;


  /* =====================================
     WEEK DAYS
  ===================================== */

  const weekDays = [

    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",

  ].map(

    (name, index) => {

      const date =
        new Date(startOfWeek);


      date.setDate(

        startOfWeek.getDate() +
        index

      );


      const dateString =
        getLocalDateString(date);


      return {

        name,

        active:

          activeDates.has(
            dateString
          ),

      };

    }

  );


  /* =====================================
     WEEKLY PROGRESS
  ===================================== */

  const weeklyProgress =

    Math.min(

      Math.round(

        (activeDays / 7) * 100

      ),

      100

    );


  /* =====================================
     HANDLE ACTIVITY ADDED
  ===================================== */

  const handleActivityAdded = () => {

    setOpenForm(false);

    fetchActivities();

  };


  /* =====================================
     HANDLE ACTIVITY DELETED
  ===================================== */

  const handleActivityDeleted = () => {

    fetchActivities();

  };


  return (

    <Box

      sx={{

        minHeight: "100vh",

        backgroundColor:
          "#0B0B0B",

        color:
          "white",

        p: {

          xs: 2,

          md: 4,

        },

      }}

    >


      {/* =====================================
          HEADER
      ===================================== */}

      <Box

        sx={{

          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          mb: 4,

          flexWrap:
            "wrap",

          gap: 2,

        }}

      >


        <Box >
           <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}>
                <FitnessCenterIcon
                sx={{
                  color: "#FF6B00",
                  fontSize: 45,
                  marginBottom:2.5
                }}
              />
           <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: 1,
                 marginLeft:1,
                  marginBottom:2
                }}
              >
                FIT
                <Box component="span" sx={{ color: "#FF6B00" }}>
                  TRACK
                </Box>
              </Typography>
          </Box>
          <Typography
  variant="h4"
  sx={{
    fontWeight: "bold",
    minHeight: "55px",
  }}
>
  <TypeAnimation
    sequence={[
        (el) => {
        el.style.color = "white";
      },
      "Track your progress.",
      2000,

      "",
      500,

      (el) => {
        el.style.color = "#FF6B00";
      },

      "Push your limits.",
      2000,

      "",
      500,
    ]}
    speed={70}
    deletionSpeed={50}
    repeat={Infinity}
    cursor={true}
    style={{
      fontSize: "2.125rem",
      fontWeight: "bold",
    }}
  />
</Typography>

        </Box>


        {/* HEADER BUTTONS */}

        <Box

          sx={{

            display:
              "flex",

            gap: 2,

          }}

        >


          <Button

            startIcon={
              <AddIcon />
            }

            onClick={() =>
              setOpenForm(true)
            }

            sx={{

              backgroundColor:
                "#FF6B00",

              color:
                "white",

              px: 3,

              py: 1.3,

              fontWeight:
                "bold",

              "&:hover": {

                backgroundColor:
                  "#E65F00",

              },

            }}

          >

            ADD ACTIVITY

          </Button>


          <Button

            onClick={onLogout}

            sx={{

              color:
                "#FF6B00",

              border:
                "1px solid #FF6B00",

              px: 3,

              py: 1.3,

              fontWeight:
                "bold",

              "&:hover": {

                backgroundColor:
                  "#FF6B00",

                color:
                  "white",

              },

            }}

          >

            LOGOUT

          </Button>

        </Box>

      </Box>


      {/* =====================================
          TODAY AT A GLANCE
      ===================================== */}

      <TodayAtGlance

        todayCalories={todayCalories}

        todayDuration={todayDuration}

        todayActivityCount={
          todayActivityCount
        }

        dailyGoal={dailyGoal}

        dailyProgress={dailyProgress}

        onEditGoal={
          handleOpenGoalDialog
        }

      />


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <Box

        sx={{

          display:
            "grid",

          gridTemplateColumns: {

            xs:
              "1fr",

            md:
              "2fr 1fr",

          },

          gap: 4,

        }}

      >


        <YourActivities

          activities={activities}

          onActivityDeleted={
            handleActivityDeleted
          }

        />


        <WeeklyProgress

          progress={
            weeklyProgress
          }

          activeDays={
            activeDays
          }

          weekDays={
            weekDays
          }

          calories={
            weeklyCalories
          }

          duration={
            weeklyDuration
          }

          activities={
            weeklyActivities
          }

        />

      </Box>


      {/* =====================================
          ADD ACTIVITY MODAL
      ===================================== */}

      <Dialog

        open={openForm}

        onClose={() =>
          setOpenForm(false)
        }

        maxWidth="sm"

        fullWidth

        PaperProps={{

          sx: {

            backgroundColor:
              "#151515",

            color:
              "white",

            borderRadius:
              4,

          },

        }}

      >

        <DialogContent>


          <Typography

            variant="h5"

            sx={{

              fontWeight:
                "bold",

              mb: 3,

              color:
                "#FF6B00",

            }}

          >

            ADD NEW ACTIVITY

          </Typography>


          <ActivityForm

            onActivityAdded={
              handleActivityAdded
            }

          />


        </DialogContent>

      </Dialog>


      {/* =====================================
          DAILY GOAL DIALOG
      ===================================== */}

      <Dialog

        open={openGoalDialog}

        onClose={() =>
          setOpenGoalDialog(false)
        }

        maxWidth="xs"

        fullWidth

        PaperProps={{

          sx: {

            backgroundColor:
              "#151515",

            color:
              "white",

            borderRadius:
              4,

          },

        }}

      >

        <DialogContent>


          <Typography

            variant="h5"

            sx={{

              fontWeight:
                "bold",

              color:
                "#FF6B00",

              mb: 1,

            }}

          >

            SET DAILY GOAL

          </Typography>


          <Typography

            sx={{

              color:
                "#0f0f0f",

              mb: 3,

            }}

          >

            Set your daily calorie burn target.

          </Typography>


          <TextField

            fullWidth

            autoFocus

            label="Daily Goal (Calories)"

            type="number"

            value={goalInput}

            onChange={(e) =>
              setGoalInput(
                e.target.value
              )
            }

            sx={{

              "& .MuiOutlinedInput-root": {

                color:
                  "black",

                "& fieldset": {

                  borderColor:
                    "#444",

                },

                "&:hover fieldset": {

                  borderColor:
                    "#FF6B00",

                },

                "&.Mui-focused fieldset": {

                  borderColor:
                    "#FF6B00",

                },

              },

              "& .MuiInputLabel-root": {

                color:
                  "#999",

              },

              "& .MuiInputLabel-root.Mui-focused": {

                color:
                  "#FF6B00",

              },

            }}

          />

        </DialogContent>


        <DialogActions

          sx={{

            p: 3,

            pt: 0,

          }}

        >


          <Button

            onClick={() =>
              setOpenGoalDialog(false)
            }

            sx={{

              color:
                "#141212",
                "&:hover": {

                backgroundColor:
                  "#7f7d7c",
                 color:
                "#dbd7d7",
              },

            }}

          >

            CANCLE

          </Button>


          <Button

            onClick={
              handleSaveDailyGoal
            }

            disabled={
              loadingGoal
            }

            variant="contained"

            sx={{

              backgroundColor:
                "#FF6B00",

              "&:hover": {

                backgroundColor:
                  "#E65F00",

              },

            }}

          >

            {loadingGoal
              ? "SAVING..."
              : "SAVE GOAL"}

          </Button>

        </DialogActions>

      </Dialog>


    </Box>

  );

};


export default Dashboard;