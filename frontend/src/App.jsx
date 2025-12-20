import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router';

import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePages';//name mismatch fixed still dont get what caused it
import ProblemsPage from './pages/ProblemsPage';



function App() {
const {isSignedIn} = useUser();

  return (

    <>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/problems" element={isSignedIn?<ProblemsPage/>: <Navigate to={"/"} />} />
    
    
  </Routes>

  <Toaster toastOptions={{duration:2000}}/>
  </>
  );
}

export default App
