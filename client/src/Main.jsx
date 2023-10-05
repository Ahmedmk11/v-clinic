import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route } from 'react-router-dom'
import RouteSwitch from './RouteSwitch'
import Layout from './pages/Layout/Layout'
import ErrorBoundary from './pages/ErrorBoundary/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
        <BrowserRouter>
            <Layout>
                <RouteSwitch />
            </Layout>
        </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
)
