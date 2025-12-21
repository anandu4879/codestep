import React from 'react'
import { Link, useLocation } from 'react-router'
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from 'lucide-react'
import {UserButton} from '@clerk/clerk-react'
function Navbar() {
    const location= useLocation();
    const isActive =(path)=> location.pathname===path;
  return (
    <nav className='bg-base-100/80 backdrop-blur-md border-primary/20 sticky top-0 z-50 shadow-lg'>
        <div className='max-w-7xl mx-auto p-4 flex items-center justify-between'>
            {/* Logo or Brand Name */}
            <Link to='/' className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200" >
                <div className='size-10 rounded-xl bg-gradient-to-b from-primary via-secondary to-accent flex items-center justify-center shadow-lg'>
                    <SparklesIcon className='size-6 text-white'/>
                </div>
                <div className='flex flex-col'>
                    <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
            CodeStep
          </span>
          <span className="text-xs text-base-content/60 font-medium mt-1">Coding Together</span>

                </div>
            </Link>

            <div className='flex items-center gap-1'>
                <Link to="/problems" className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive("/problems")?"bg-primary text-primary-content":"hover:bg-base-200  tect-base-content/70 hover:text-base-content"} }`}>

                <div className='flex items-center gap-2.5'>
                    <BookOpenIcon className="size-4"/>
                    <span className=' font-medium hidden sm:inline'>
                        Problem
                    </span>

                </div>
                </Link>
                {/**Dashboard */}
             <div className='flex items-center gap-1'>
                <Link to="/dashboard" className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive("/dasboard")?"bg-primary text-primary-content":"hover:bg-base-200  tect-base-content/70 hover:text-base-content"} }`}>

                <div className='flex items-center gap-2.5'>
                    <LayoutDashboardIcon className="size-4"/>
                    <span className=' font-medium hidden sm:inline'>
                        Dasboard
                    </span>

                </div>
                </Link>
                <div className='ml-4 mt-2 '>
                     <UserButton/>
                </div>
               

            </div>
        </div>
</div>
    </nav>
  )
}

export default Navbar