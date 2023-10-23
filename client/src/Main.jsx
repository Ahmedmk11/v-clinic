import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/index.css'
import { BrowserRouter, Route } from 'react-router-dom'
import RouteSwitch from './RouteSwitch'
import ErrorBoundary from './containers/general/ErrorBoundary/ErrorBoundary'
import { Provider } from './contexts/CurrUser'
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Provider>
                    <RouteSwitch />
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
)
