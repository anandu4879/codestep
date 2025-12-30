import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import{useActiveSession, useCreateSession, useMyRecentSessions} from '../hooks/useSession.js'

function DashboardPage() {
  const navigate=useNavigate()
  const {user}= useUser()
  const [showCreatedModel, setShowCreatedModel] = useState(false);
  const [roomConfid, setRoomConfid] = useState({problem:"",difficulty:""});

  const createSessionMutation=useCreateSession()
  const {data:activeSessionData,isLoading:activeSessionLoading}=useActiveSession()
  const {data:recentSessionData,isLoading:recentSessionLoading}=useMyRecentSessions()

  console.log(activeSessionData)
  console.log(recentSessionData)
  return <div>DashboardPage</div>
}

export default DashboardPage