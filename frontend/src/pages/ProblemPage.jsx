import { useParams, useNavigate } from 'react-router';

import React, { useEffect } from 'react'
import{useState} from 'react'
import { PROBLEMS } from '../data/problems';
import Navbar from '../components/Navbar';
import{Panel, PanelGroup, PanelResizeHandle}from 'react-resizable-panels';
import { Code } from 'lucide-react';
import  OutputPanel from '../components/OutputPanel';
import  CodeEditor  from '../components/CodeEditor';
import  ProblemDiscription  from '../components/ProblemDescription';


function ProblemPage() {
    /**
     * The ID of the current problem.
     * @type {string}
     * @default "two-sum"
     */
    const {id} =useParams();
    const navigate=useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const currentProblem=PROBLEMS[currentProblemId];
// update problem when URL param change
    useEffect(()=>{
        if(id &&PROBLEMS[id]){
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage]);
            setOutput(null);
        }
    },[id,selectedLanguage])

    const handleLanguageChange =(e)=>{}

    const handleProblemChange=()=>{}

    const triggerConfetti=()=>{}

    const checkIfTestPassed=()=>{}

    const handleRunCode=()=>{}

  return (
    <div className='h-screen w-screen bg-base-100 flex flex-col'>
        <Navbar/>

        <div className='flex-1'>
            <PanelGroup direction="horizontal">
            {/*Left Panel */}
            <Panel defaultSize={40} minSize={30}>
                <ProblemDiscription/>
            </Panel>
    
                <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
            {/*right Panel */}
            <Panel defaultSize={60} minSize={30}>
                <PanelGroup direction="vertical">
                    <Panel defaultSize={70} minSize={30}>
                        <CodeEditor/>
                    </Panel>
                    <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
                     <Panel defaultSize={30} minSize={30}>
                        <OutputPanel/>
                    </Panel>

                </PanelGroup>
            </Panel>
            </PanelGroup>
        </div>

    </div>
  )
}

export default ProblemPage;
