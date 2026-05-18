import React from 'react'
import '../style/loading.scss'

const LoadingScreen = () => {
    return (
        <main className='loading-screen'>

            <div className='loading-ring'>
                <div className='ring-pulse' />
                <div className='ring-pulse ring-pulse--2' />
                <div className='ring-outer' />
                <div className='ring-inner' />
                <span className='ring-icon' aria-hidden='true'>
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
                        <path d='M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z' />
                    </svg>
                </span>
            </div>

            <div className='loading-text'>
                <h2>Building your interview strategy</h2>
                <p>Analyzing your profile against the job requirements</p>
            </div>

            <ul className='loading-steps' role='list'>
                <li className='step step--done'>
                    <span className='step__icon'>
                        <svg width='13' height='13' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
                            <path className='step__tick' d='M3 8.5l3.5 3.5 6.5-7'
                                stroke='currentColor' strokeWidth='2.2'
                                strokeLinecap='round' strokeLinejoin='round'
                                strokeDasharray='16' strokeDashoffset='16' />
                        </svg>
                    </span>
                    <span className='step__label'>Resume parsed</span>
                    <span className='step__badge step__badge--done'>Done</span>
                </li>
                <li className='step step--active'>
                    <span className='step__icon'>
                        <svg width='13' height='13' viewBox='0 0 24 24' fill='none'
                            stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                            <path d='M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4' />
                        </svg>
                    </span>
                    <span className='step__label'>Matching skills to role</span>
                    <span className='step__badge step__badge--active'>In progress</span>
                </li>
                <li className='step step--pending'>
                    <span className='step__icon'>
                        <svg width='13' height='13' viewBox='0 0 24 24' fill='none'
                            stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                            <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                            <polyline points='14 2 14 8 20 8' />
                            <line x1='16' y1='13' x2='8' y2='13' />
                            <line x1='16' y1='17' x2='8' y2='17' />
                        </svg>
                    </span>
                    <span className='step__label'>Generating Resume</span>
                </li>
            </ul>

            <div className='loading-bar'>
                <div className='loading-bar__meta'>
                    <span>Progress</span>
                    <span>60%</span>
                </div>
                <div className='loading-bar__track'>
                    <div className='loading-bar__fill' />
                </div>
            </div>

            <div className='loading-dots' aria-hidden='true'>
                <span className='loading-dots__dot' />
                <span className='loading-dots__dot' />
                <span className='loading-dots__dot' />
            </div>

        </main>
    )
}

export default LoadingScreen