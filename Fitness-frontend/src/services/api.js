import axios from "axios"

const API_URL = 'https://gateway-service-qnca.onrender.com/api/'

const api=axios.create({
    baseURL:API_URL
});
 

api.interceptors.request.use((config)=>{
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization']=`Bearer ${token}`;
    }
    if(userId){
        config.headers['X-User-ID']=userId;
    }
    return config;
})

export const getActivities =()=>api.get('/activities');

export const addActivity =(activity)=>api.post('/activities' , activity);


export const getActivityDetail =(id)=>api.get(`/recommendations/activity/${id}`);


export const getUserProfile = (userId) => {
  return api.get(`/users/${userId}`);
};


export const updateDailyGoal = (userId, dailyGoal) => {
  return api.put(
    `/users/${userId}/daily-goal`,
    {
      dailyGoal: Number(dailyGoal),
    }
  );

  
};

export const deleteActivity = (id) => {
  return api.delete(`/activities/${id}`);
};
