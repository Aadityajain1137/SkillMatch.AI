import React, { useEffect, useRef } from 'react'
import './normal-loading.scss'

const MESSAGES = [
    "Initializing modules...",
    "Fetching your data...",
    "Almost ready...",
    "Welcome back!"
]

const LoadingScreen = () => {
    const msgRef = useRef(null)
    const dotsRef = useRef([])

    useEffect(() => {
        let msgIdx = 0
        let charIdx = 0
        let typing = true
        let timer

        const updateDots = (active) => {
            dotsRef.current.forEach((d, i) => {
                if (!d) return
                d.className = 'ex-step-dot' + (i < active ? ' done' : i === active ? ' active' : '')
            })
        }

        const tick = () => {
            const msg = MESSAGES[msgIdx]
            if (typing) {
                if (charIdx <= msg.length) {
                    if (msgRef.current) msgRef.current.textContent = msg.slice(0, charIdx)
                    charIdx++
                    timer = setTimeout(tick, 45)
                } else {
                    typing = false
                    timer = setTimeout(tick, 1200)
                }
            } else {
                if (charIdx > 0) {
                    if (msgRef.current) msgRef.current.textContent = msg.slice(0, charIdx - 1)
                    charIdx--
                    timer = setTimeout(tick, 25)
                } else {
                    msgIdx = (msgIdx + 1) % MESSAGES.length
                    typing = true
                    updateDots(msgIdx)
                    timer = setTimeout(tick, 200)
                }
            }
        }

        tick()
        return () => clearTimeout(timer)
    }, [])

    return (
        <main className='ex-loading'>

            <div className='ex-loading__canvas'>
                <div className='ex-ring ex-ring--1' />
                <div className='ex-ring ex-ring--2' />
                <div className='ex-ring ex-ring--3' />

                <div className='ex-orbit ex-orbit--1'>
                    <div className='ex-orbit-dot ex-orbit-dot--1' />
                </div>
                <div className='ex-orbit ex-orbit--2'>
                    <div className='ex-orbit-dot ex-orbit-dot--2' />
                </div>

                <svg className='ex-ticks' viewBox="0 0 160 160" fill="none">
                    <g transform="translate(80,80)">
                        <line x1="0" y1="-76" x2="0" y2="-70" strokeWidth="1" strokeLinecap="round" />
                        <line x1="76" y1="0" x2="70" y2="0" strokeWidth="1" strokeLinecap="round" />
                        <line x1="0" y1="76" x2="0" y2="70" strokeWidth="1" strokeLinecap="round" />
                        <line x1="-76" y1="0" x2="-70" y2="0" strokeWidth="1" strokeLinecap="round" />
                        <line x1="53" y1="-53" x2="49" y2="-49" strokeWidth="0.75" strokeLinecap="round" className='ex-tick-minor' />
                        <line x1="53" y1="53" x2="49" y2="49" strokeWidth="0.75" strokeLinecap="round" className='ex-tick-minor' />
                        <line x1="-53" y1="53" x2="-49" y2="49" strokeWidth="0.75" strokeLinecap="round" className='ex-tick-minor' />
                        <line x1="-53" y1="-53" x2="-49" y2="-49" strokeWidth="0.75" strokeLinecap="round" className='ex-tick-minor' />
                    </g>
                </svg>

                <div className='ex-core'>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                </div>
            </div>

            <p className='ex-loading__title'>Preparing your experience</p>

            <div className='ex-loading__typewriter'>
                <span ref={msgRef} className='ex-loading__msg' />
                <span className='ex-loading__cursor' />
            </div>

            <div className='ex-loading__steps'>
                {MESSAGES.map((_, i) => (
                    <div
                        key={i}
                        ref={el => dotsRef.current[i] = el}
                        className={`ex-step-dot${i === 0 ? ' done' : i === 1 ? ' active' : ''}`}
                    />
                ))}
            </div>

        </main>
    )
}

export default LoadingScreen