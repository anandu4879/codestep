import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePages';//name mismatch fixed still dont get what caused it
import ProblemsPage from './pages/ProblemsPage';
import ProblemPage from './pages/ProblemPage';
import DashboardPage from './pages/DashboardPage';



function App() {
const {isSignedIn,isLoaded} = useUser();

//get rid of flickering effect
if(!isLoaded) return null;

  return (

    <>
    <Routes>
    <Route path="/" element={!isSignedIn?<HomePage />: <Navigate to={"/dashboard"} />} />
    <Route path="/dashboard" element={isSignedIn?<DashboardPage />: <Navigate to={"/"} />} />
    <Route path="/problems" element={isSignedIn?<ProblemsPage/>: <Navigate to={"/"} />} />
    <Route path="/problem/:id" element={isSignedIn?<ProblemPage/>: <Navigate to={"/"} />} />
    
    
  </Routes>

  <Toaster toastOptions={{duration:2000}}/>
  </>
  );
}

export default App
