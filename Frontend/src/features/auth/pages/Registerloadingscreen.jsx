import React from 'react'
import './register-loading.scss'

const RegisterLoadingScreen = () => {
    return (
        <main className='rg-loading'>

            <div className='rg-loading__avatar'>
                <svg className='rg-loading__orbit' viewBox="0 0 96 96" fill="none">
                    <circle cx="48" cy="48" r="44" strokeDasharray="4 6" />
                    <circle cx="48" cy="4" r="4" className='rg-loading__orbit-dot' />
                </svg>
                <div className='rg-loading__avatar-inner'>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
            </div>

            <p className='rg-loading__title'>Creating your account</p>
            <p className='rg-loading__sub'>Setting up your profile</p>

            <div className='rg-loading__fields'>
                <div className='rg-loading__field'>
                    <span className='rg-loading__field-label'>Username</span>
                    <div className='rg-loading__bar-track'>
                        <div className='rg-loading__bar-fill rg-loading__bar-fill--1' />
                    </div>
                </div>
                <div className='rg-loading__field'>
                    <span className='rg-loading__field-label'>Email</span>
                    <div className='rg-loading__bar-track'>
                        <div className='rg-loading__bar-fill rg-loading__bar-fill--2' />
                    </div>
                </div>
                <div className='rg-loading__field'>
                    <span className='rg-loading__field-label'>Password</span>
                    <div className='rg-loading__bar-track'>
                        <div className='rg-loading__bar-fill rg-loading__bar-fill--3' />
                    </div>
                </div>
            </div>

            <div className='rg-loading__check'>
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <circle className='rg-loading__check-circle' cx="12" cy="12" r="9" strokeWidth="1.5" />
                    <path className='rg-loading__check-tick' d="M8 12l3 3 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className='rg-loading__check-label'>Almost done...</span>
            </div>

        </main>
    )
}

export default RegisterLoadingScreen