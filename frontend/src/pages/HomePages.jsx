import { ArrowRightIcon, CheckIcon, SparkleIcon, VideoIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router";
import { SignInButton } from "@clerk/clerk-react";


function HomePage() {
  return (
    <div className="bg-gradient-to-br from-base-200 via-base-200 to-base-300">
        {/* Navbar */}
        <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary opacity-105 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* Logo or Brand Name */}
        <Link to={"/"} className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
        <div className=" size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
          <SparkleIcon className="size 6  text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
            CodeStep
          </span>
          <span className="text-xs text-base-content/60 font-medium mt-1">Coding Together</span>

        </div>
        </Link>
        {/*Auth btn*/}
        <SignInButton mode="modal">
          <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl  text-white font-semibold text-sm shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
            <span>Get Started</span>
          <ArrowRightIcon className="size-4 group-hover:translate-x-0.5  transition-transform duration-200" />
          </button>
        </SignInButton>

        </div>

        </nav>
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
      <div className="space-y-5">
          <div className="badge badge-primary badge-lg">
            <ZapIcon className="size-5 "/>
            Real-Time Collaboration
          </div>
        <h1 className="text-5xl lg:text-7xl font-black leading-tight">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Code Together,
          </span>
          <br />
          <span className="text-base-content">
            Learn Together.
          </span>
        </h1>
        <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
        <br />
          CodeStep is a coding platform that allows you to collaborate with other developers in real-time. 
          Connect face-to-face, code in real-time and learn together like never before.
        </p>

        {/* features */}
        <div className="flex flex-wrap gap-3">
          <div className="badge badge-lg badge-outline">
            <CheckIcon className="size-4 text-success"/>
            Live Video Chat
            </div>
            <div  className="badge badge-lg badge-outline">
            <CheckIcon className="size-4 text-success"/>
            Code Editor</div>
            <div  className="badge badge-lg badge-outline">
            <CheckIcon className="size-4 text-success"/>
            Multi-Language</div>
        </div>
        {/* Call to Action */}
        <div className="flex flex-wrap gap-4">
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-lg rounded-2xl mt-8 flex items-center hover:scale-105 transition-transform duration-200">
              Start Coding Now
              <ArrowRightIcon className="size-4 inline-block ml-2"/>
            </button>
          </SignInButton>
          <button className="btn btn-primary btn-lg btn-outline rounded-2xl mt-8 flex items-center hover:scale-105 transition-transform duration-200 hover:bg-transparent hover:text-primary hover:border-primary">
            <VideoIcon className="size-5 "/>
            Watch Demo
          </button>
        </div>
        {/* End of Main Content */}
        <div className="stats stats-vertical lg:stats-horizontal shadow mt-6 bg-base-100 sgadow-lg">
          <div className="stat ">
            <div className="stat-value text-primary">10K+</div>
            <div className="stat-title">Active Users</div>
          </div>
            <div className="stat ">
            <div className="stat-value text-secondary">50K+</div>
            <div className="stat-title">Session</div>
          </div>
            <div className="stat ">
            <div className="stat-value text-accent">99%</div>
            <div className="stat-title"> Uptime</div>
          </div>
        </div>
        </div>
        {/* Right Content */}
        <img src="/hero3.png" alt="CodeStep Platform" className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transistion-transform duration-500" />
      </div>
     </div>
    </div>
  )
}

export default HomePage