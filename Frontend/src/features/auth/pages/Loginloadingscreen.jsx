import React from 'react'
import './login-loading.scss'

const LoginLoadingScreen = () => {
    return (
        <main className='login-loading'>
            <div className='login-loading__particles' id='particles' />

            <div className='login-loading__lock'>
                <div className='lock-shackle' />
                <div className='lock-body'>
                    <div className='lock-dot' />
                </div>
            </div>

            <p className='login-loading__title'>Signing you in</p>
            <p className='login-loading__sub'>Verifying your credentials</p>

            <div className='login-loading__bar-track'>
                <div className='login-loading__bar-fill' />
            </div>

            <div className='login-loading__chars'>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className='char-box' />
                ))}
            </div>
        </main>
    )
}

export default LoginLoadingScreen