import React from 'react'
import '../style/loading.scss'

const LoadingScreen = () => {
    return (
        <main className='loading-screen'>
            <div className='loading-ring'>
                <div className='ring-outer' />
                <div className='ring-inner' />
                <span className='ring-icon'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                </span>
            </div>

            <div className='loading-text'>
                <h2>Building your interview strategy</h2>
                <p>Analyzing your profile against the job requirements</p>
            </div>

            <ul className='loading-steps'>
                <li className='step step--done'>Resume parsed</li>
                <li className='step step--active'>Matching skills to role</li>
                <li className='step step--pending'>Generating interview plan</li>
            </ul>

            <div className='loading-bar'>
                <div className='loading-bar__fill' />
            </div>
        </main>
    )
}

export default LoadingScreen