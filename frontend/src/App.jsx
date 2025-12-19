import './App.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {


  return (
    <>
    <h1>Hi thakkudu unni vave 😘</h1>/h1>
    <SignedOut>
      <SignInButton mode='modal'>
        <button>
          Sign up
        </button>
      </SignInButton>
    </SignedOut>
 
    <UserButton/>
  </>
  );
}

export default App
