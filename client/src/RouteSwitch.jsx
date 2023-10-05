import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Home from './pages/Home'

const RouteSwitch = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    )
}

export default RouteSwitch
