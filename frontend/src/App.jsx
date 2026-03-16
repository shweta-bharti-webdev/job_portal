import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";
import AdminRegister from "./components/AdminRegister";
import RecruiterProfile from "./components/RecruiterProfile";
import ProfileView from "./components/ProfileView";
import PostCompany from "./components/PostCompany";
import UpdateCompany from "./components/UpdateCompany";
import PostJob from "./components/PostJob";
import PostedJobs from "./components/PostedJobs";
import Jobs from "./components/Jobs";
import Applicants from "./components/Applicants";
import MyApplications from "./components/MyApplications";
import UpdateApplicationStatus from "./components/UpdateApplicationStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/*USER ROUTES */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/view" element={<ProfileView />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applications" element={<MyApplications />} />

        {/*ADMIN ROUTES */}
        <Route path="/admin" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/*RECRUITER ROUTES */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />
        <Route path="/recruiter/post-company" element={<PostCompany />} />
        <Route path="/recruiter/update-company" element={<UpdateCompany />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
        <Route path="/recruiter/my_jobs" element={<PostedJobs />} />
        <Route path="/recruiter/applicants/:jobId" element={<Applicants />} />
        <Route path="/application/update" element={<UpdateApplicationStatus />} />
        
      </Routes>
    </BrowserRouter>
  );
}


export default App;

