
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BarChartIcon from "@mui/icons-material/BarChart";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { TypeAnimation } from "react-type-animation";
import { Login } from "@mui/icons-material";

const WelcomePage = ({ onLogin }) => {

  const features = [
    {
      icon: <DirectionsRunIcon sx={{ fontSize: 40, color: "#FF6B00" }} />,
      title: "Track Activities",
      description:
        "Record your workouts and keep all your fitness activities organized.",
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 40, color: "#FF6B00" }} />,
      title: "Monitor Progress",
      description:
        "Track your calories, workout duration, and fitness progress.",
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: "#FF6B00" }} />,
      title: "AI Recommendations",
      description:
        "Get smart activity recommendations after completing a workout.",
    },
  ];

  const getStartOfWeek = () => {
  const today = new Date();

  const day = today.getDay();

  // Monday = start of week
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(diff);

  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0B0B0B",
        color: "white",
      }}
    >

      {/* ================= NAVBAR ================= */}

      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#0B0B0B",
          borderBottom: "1px solid #222",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between" }}>

            {/* LOGO */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FitnessCenterIcon
                sx={{
                  color: "#FF6B00",
                  fontSize: 32,
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                FIT
                <Box component="span" sx={{ color: "#FF6B00" }}>
                  TRACK
                </Box>
              </Typography>

            </Box>


            {/* LOGIN BUTTON */}

            <Button
             
              onClick={()=>{
                onLogin();
               }}
              sx={{
                color: "white",
                border: "1px solid #FF6B00",
                borderRadius: 2,
                px: 3,
                py: 1,
                "&:hover": {
                  backgroundColor: "#FF6B00",
                },
              }}
            >
              LOGIN
            </Button>

          </Toolbar>
        </Container>
      </AppBar>


      {/* ================= HERO SECTION ================= */}

      <Container maxWidth="lg">

        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{
            minHeight: "70vh",
            py: 6,
          }}
        >

          {/* LEFT SIDE */}

          <Grid size={{ xs: 12, md: 7 }}>

            <Typography
              sx={{
                color: "#FF6B00",
                fontWeight: "bold",
                letterSpacing: 2,
                mb: 2,
              }}
            >
              TAKE CONTROL OF YOUR FITNESS
            </Typography>


            <Typography
  variant="h2"
  sx={{
    fontWeight: "bold",
    lineHeight: 1.1,
    mb: 3,
    fontSize: {
      xs: "3rem",
      md: "5rem",
    },
  }}
>
  YOUR FITNESS.
  <br />

  <Box
    component="span"
    sx={{
      color: "#FF6B00",
    }}
  >
    <TypeAnimation
  sequence={[
    "YOUR PROGRESS.",
    2000,

    "",
    500,

    "YOUR JOURNEY.",
    2000,

    "",
    500,

    "YOUR POWER.",
    2000,

    "",
    500,
  ]}
  speed={70}
  deletionSpeed={50}
  repeat={Infinity}
  cursor={true}
/>
  </Box>
</Typography>

            <Typography
              sx={{
                color: "#A0A0A0",
                fontSize: "1.2rem",
                maxWidth: 600,
                mb: 4,
              }}
            >
              Track your activities, monitor your progress,
              and build a stronger version of yourself.
              Your fitness journey starts here.
            </Typography>


            {/* BUTTONS */}

            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >

              <Button
                variant="contained"
                onClick={() => onLogin()}
                sx={{
                  backgroundColor: "black",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  border: "1px solid #FF6B00",

                  "&:hover": {
                    backgroundColor: "#E65F00",
                  },
                }}
              >
                START YOUR JOURNEY
              </Button>

            </Box>

          </Grid>


          {/* RIGHT SIDE FITNESS CARD */}

          <Grid
            size={{ xs: 12, md: 5 }}
          >

            <Box
              sx={{
                height: 400,
                borderRadius: 5,

                background:
                  "linear-gradient(135deg, #1A1A1A, #111)",

                border: "1px solid #333",

                display: "flex",
                flexDirection: "column",

                alignItems: "center",
                justifyContent: "center",

                boxShadow:
                  "0px 0px 40px rgba(255,107,0,0.15)",
              }}
            >

              <FitnessCenterIcon
                sx={{
                  fontSize: 150,
                  color: "#FF6B00",
                  mb: 2,
                }}
              />

              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                }}
              >
                TRAIN SMARTER
              </Typography>

              <Typography
                sx={{
                  color: "#A0A0A0",
                  mt: 1,
                }}
              >
                Every workout counts 🔥
              </Typography>

            </Box>

          </Grid>

        </Grid>


        {/* ================= FEATURES ================= */}

        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 5,
          }}
        >
          EVERYTHING YOU NEED TO
          <Box
            component="span"
            sx={{
              color: "#FF6B00",
              ml: 1,
            }}
          >
            STAY FIT
          </Box>
        </Typography>


        <Grid
          container
          spacing={3}
          sx={{
            pb: 10,
          }}
        >

          {features.map((feature, index) => (

            <Grid
              size={{ xs: 12, md: 4 }}
              key={index}
            >

              <Card
                sx={{
                  backgroundColor: "#151515",
                  color: "white",

                  height: "100%",

                  borderRadius: 4,

                  border:
                    "1px solid #252525",

                  transition:
                    "0.3s",

                  "&:hover": {

                    transform:
                      "translateY(-8px)",

                    border:
                      "1px solid #FF6B00",

                  },
                }}
              >

                <CardContent
                  sx={{
                    p: 4,
                  }}
                >

                  {feature.icon}


                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>


                  <Typography
                    sx={{
                      color: "#A0A0A0",
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Container>


      {/* ================= FOOTER ================= */}

      <Box
        sx={{
          borderTop:
            "1px solid #222",

          py: 3,

          textAlign:
            "center",

          color:
            "#777",
        }}
      >

        © 2026 FITTRACK — Build a stronger you.

      </Box>

    </Box>
  );
};


export default WelcomePage;

