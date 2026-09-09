import {
Box,
Typography,
} from "@mui/material";

import ActivityList from "../ActivityList";

const ActivitySection = ({
activities,
onActivityDeleted,
}) => {

return (


<Box>

  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      mb: 3,
    }}
  >
    YOUR ACTIVITIES
  </Typography>


  {/* SCROLLABLE ACTIVITY BOX */}

  <Box
    sx={{
      backgroundColor: "#151515",
      border: "1px solid #252525",
      borderRadius: 4,
      p: 2,

      /* Scroll settings */

      maxHeight: "400px",
      overflowY: "auto",

      /* Optional scrollbar styling */

      "&::-webkit-scrollbar": {
        width: "6px",
      },

      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#FF6B00",
        borderRadius: "10px",
      },

      "&::-webkit-scrollbar-track": {
        backgroundColor: "#252525",
      },
    }}
  >

    <ActivityList
      activities={activities}
      onActivityDeleted={onActivityDeleted}
    />

  </Box>

</Box>


);

};

export default ActivitySection;
