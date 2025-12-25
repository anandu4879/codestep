import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { PROBLEMS } from '../data/problems.js';
import { Link } from 'react-router';
import { ChevronRight, Code2Icon } from 'lucide-react';
import { getDifficultyBadgeClass } from '../lib/utils.js';
function ProblemsPage() {
  const problem=Object.values(PROBLEMS)
  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar/>
          <div className='max-w-6xl mx-auto px-4 py-12'>
            {/*HEADER */}
            <div className='mb-8'>
              <h1 className='text-4xl mb-2 font-bold'>Practice Problem</h1>
              <p className='text-base-content/70'>
                Sharpen your coding skills with these curated problems
              </p>
            </div>
            {/*Problem List* */}
            <div className='space-y-4'>
              {problem.map(problem =>(
                <Link key={problem.id}
                to={`/problem/${problem.id}`}
                className='card bg-base-100 hover:scale-[1.01] transition-transform'>

                  <div className='card-body'>
                    <div className='flex items-center justify-between gap-4'>
                      {/*Left Side */}
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <div className='size-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                          <Code2Icon className='size-6 text-primary'/>
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h2 className='text-xl font-bold'>{problem.title}</h2>
                              <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
                            </div>
                          <p className='text-sm text-base-content/60'>
                            {problem.category}
                          </p>
                          </div>
                        </div>
                        <p className='text-base-content/80 mb-3'>{problem.description.text}</p>
                      </div>
                      {/*Rigth Side */}
                      <div className='flex items-center gap-2 text-primary'>
                        <span className='font-medium'>Solve</span>
                        <ChevronRight className='size-5'/>
                      </div>
                    </div>
                  </div>

                
                </Link>
              ))}
            </div>
            {/*Stats */}
              <div className='mt-12 card bg-base-100 shadow-lg '>
                <div className='card-body'>
                  <div className='stats stats-vertical lg:stats-horizontal'>
                    <div className='stats'></div>
                    <div className='stat'>
                      <div className='stat-title'>Total Problem</div>
                      <div className='stat-value text-primary'>{problem.length}</div>
                    </div>
                    <div className='stats'>
                      <div className='stat'>
                      <div className='stat-title'>Easy</div>
                      <div className='stat-value text-success'>{problem.filter(problem => (problem.difficulty).toLowerCase() === "easy").length}</div>
                    </div>
                    </div>
                    <div className='stats'> <div className='stat'>
                      <div className='stat-title'>Medium</div>
                      <div className='stat-value text-warning'>{problem.filter(problem => (problem.difficulty).toLowerCase() === "medium").length}</div>
                    </div>
                     <div className='stat'>
                      <div className='stat-title'>Hard</div>
                      <div className='stat-value text-error'>{problem.filter(problem => (problem.difficulty).toLowerCase() === "hard").length}</div>
                    </div>
                    </div>

                  </div>
                </div>

              </div>
          </div>
    </div>
  )
}

export default ProblemsPage