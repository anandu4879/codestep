import { useParams, useNavigate } from 'react-router';
import React, { useEffect } from 'react'
import{useState} from 'react'
import { PROBLEMS } from '../data/problems';
import Navbar from '../components/Navbar';
import{Panel, PanelGroup, PanelResizeHandle}from 'react-resizable-panels';
import { Code } from 'lucide-react';
import  OutputPanel from '../components/OutputPanel';
import  CodeEditorPanel  from '../components/CodeEditorPanel';
import  ProblemDiscription  from '../components/ProblemDescription';
import toast from 'react-hot-toast'; 
import { executeCode } from "../lib/piston";
import confetti from "canvas-confetti";
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

    const handleLanguageChange =(e)=>{
        const newLang=e.target.value
        setSelectedLanguage(newLang)
        setCode(currentProblem.starterCode[newLang])
        setOutput(null);
    };

    const handleProblemChange=(newProblemId)=>navigate(`/problem/${newProblemId}`); 

    const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };
      const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };
    const checkIfTestPassed=(actualOutput,expectedOutput)=>{
        const normalizedActualOutput = normalizeOutput(actualOutput);
        const normalizedExpectedOutput = normalizeOutput(expectedOutput);
        return normalizedActualOutput === normalizedExpectedOutput;
    }

    const handleRunCode= async ()=>{
        setIsRunning(true);
        setOutput(null);

        const result=await executeCode(selectedLanguage,code);
        setOutput(result);
        setIsRunning(false); 

        //check code executed and match output.

        if(result.success){
            const expectedOutput=currentProblem.expectedOutput[selectedLanguage]
            const testPassed= checkIfTestPassed(result.output,expectedOutput)

            if(testPassed){
               triggerConfetti();
                toast.success("All test case passed!")
            }else{
                toast.error("Test case failed!")
            }
        }else{
            toast.error("Code execution failed!")
        }
    }

  return (
    <div className='h-screen  bg-base-100 flex flex-col'>
        <Navbar/>

        <div className='flex-1'>
            <PanelGroup direction="horizontal">
            {/*Left Panel */}
            <Panel defaultSize={40} minSize={30}>
                <ProblemDiscription
                problem={currentProblem}
                currentProblemId={currentProblemId}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
/>
            </Panel>
    
                <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
            {/*right Panel */}
            <Panel defaultSize={60} minSize={30}>
                <PanelGroup direction="vertical">
                    <Panel defaultSize={70} minSize={30}>
                        <CodeEditorPanel
                        selectedLanguage={selectedLanguage}
                        code={code}
                        isRunning={isRunning}
                        onLanguageChange={handleLanguageChange}
                        onCodeChange={setCode}
                        onRunCode={handleRunCode}
                        />
                    </Panel>
                    <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
                     <Panel defaultSize={30} minSize={30}>
                        <OutputPanel output={output}/>
                    </Panel>

                </PanelGroup>
            </Panel>
            </PanelGroup>
        </div>

    </div>
  )
}

export default ProblemPage;
