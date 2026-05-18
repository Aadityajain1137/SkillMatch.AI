import React from 'react'
import './normal-loading.scss'

const LoadingScreen = () => {
    return (
        <main className='ex-loading' role='status' aria-label='Loading'>
            <div className='ex-loading__ring'>
                <div className='ex-loading__track' />
                <div className='ex-loading__fill' />
            </div>
            <div className='ex-loading__dots' aria-hidden='true'>
                <div className='ex-loading__dot' />
                <div className='ex-loading__dot' />
                <div className='ex-loading__dot' />
            </div>
        </main>
    )
}

export default LoadingScreen