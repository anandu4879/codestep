import {useMutation,useQuery} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { sessionApi } from '../api/session';

export const useCreateSession=()=>{
    const result=useMutation({
        mutationKey:["createSession"],
        mutationFn:sessionApi.createSession,
        onSuccess:()=>toast.success("Session created successfully"),
        onError:()=>{toast.error(error.response?.data?.message||"Something went wrong")}
    })
    return result;
}

export const useActiveSession=()=>{
    const result=useQuery({
        queryKey:["activeSession"],
        queryFn:sessionApi.getActiveSessions
    })

    return result;
}

export const useMyRecentSessions=()=>{
    const result=useQuery({
        queryKey:["myRecentSession"],
        queryFn:sessionApi.getMyRecentSessions
    })

    return result;
}

export const useSessionsById=(id)=>{
    const result=useQuery({
        queryKey:["session",id],
        queryFn:()=>sessionApi.getSessionsById(id),
        enabled:!!id,
        refetchInterval:5000
    })

    return result;
}

export const useJoinSession=(id)=>{
    const result= useMutation({
        mutationKey:["joinSession"],
        mutationFn:()=>sessionApi.joinSession(id),
        onSuccess:()=>toast.success("Joined session successfully"),
        onError:()=>{toast.error(error.response?.data?.message||"Something went wrong")}
    }) 
    return result;
}


export const useEndSession=(id)=>{
    const result= useMutation({
        mutationKey:["endSession"],
        mutationFn:()=>sessionApi.endSession(id),
        onSuccess:()=>toast.success(" ession successfully"),
        onError:()=>{toast.error(error.response?.data?.message||"Something went wrong")}
    }) 
    return result;
}