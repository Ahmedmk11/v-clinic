import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import RouteSwitch from './RouteSwitch'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <RouteSwitch />
    </BrowserRouter>
)
