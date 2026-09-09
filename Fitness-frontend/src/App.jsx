import { Box, Button } from "@mui/material"
import { Activity, useContext, useEffect ,useState} from "react"
import { AuthContext } from "react-oauth2-code-pkce"
import { useDispatch } from "react-redux";
import { BrowserRouter as Router , Navigate , Route , Routes ,useLocation } from "react-router"
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./componant/ActivityForm";
import ActivityList from "./componant/ActivityList";
import WelcomePage from "./componant/Welcome"
import ActivitiesDetail from "./componant/ActivityDetail";
import { CssBaseline } from "@mui/material";
import Dashboard from "./componant/Dashboard";

const ActivitiesPage = ({ onLogout }) => {
  return <Dashboard onLogout={onLogout} />;
};
function App() {
const {token, tokenData , logIn, logOut , isAuthenticated}
          =useContext(AuthContext);

const dispatch =  useDispatch();
const[authReady , setAuthReady]=useState(false);       

useEffect(()=>{
  if(token){
    dispatch(setCredentials({token ,user : tokenData}));
    setAuthReady(true)
  }
}, [token, tokenData,dispatch]);

  return (
    <Router>
       <CssBaseline />
      {!token ? ( <WelcomePage
  onLogin={() => {
    logIn();
  }}
/>
        ):(
        <div>
           <Box component="section" sx={{mb:3 }}>
           

           <Routes>
            <Route path="/activities" element={<ActivitiesPage onLogout={logOut} />}/>
           <Route path="/activities/:id" element={<ActivitiesDetail/>}/>
           <Route path="/" element={token ? <Navigate to="/activities" replace /> :
                                             <div>Welecome! Please Login</div>} />
           </Routes>
           </Box>
        </div>
       
        

          )}
    
    </Router>
  )
}

export default App
