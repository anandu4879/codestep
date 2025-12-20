import React from 'react'
import { SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

function HomePage() {
  return (
    <><div>HomePage</div>
    <button className='btn btn-secondary' onClick={()=> toast.success("This is success")}>click me </button>
    <SignedOut>
          <SignInButton mode='modal'>
              <button className='btn btn-primary' >
                  Sign up
              </button>
          </SignInButton>
    </SignedOut>
    <UserButton /></>
    
  )
}

export default HomePage