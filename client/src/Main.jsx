import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import RouteSwitch from './RouteSwitch'
import ErrorBoundary from './pages/general/ErrorBoundary/ErrorBoundary'
import { Provider } from './contexts/CurrUser'
import { ThemeProvider } from './contexts/CurrTheme'
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Provider>
                    <ThemeProvider>
                        <RouteSwitch />
                    </ThemeProvider>
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
)
