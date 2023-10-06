import './layout.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className='main-container'>
             
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout
