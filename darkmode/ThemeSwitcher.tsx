"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Sun from './sun'
import Moon from './moon'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleClicked = () => {
        const toggle = document.getElementById('darkmode-toggle') as HTMLInputElement;
        setTheme(toggle?.checked ? 'dark' : 'light');
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleClicked}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    )
}

export default ThemeSwitcher