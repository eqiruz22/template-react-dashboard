import React from 'react'
import Sidebar from '../Sidebar'
import NavbarComponent from '../Navbar'
import Footer from '../Footer'


const Dashboard = () => {
    return (
        <div id='wrapper'>
            <Sidebar />
            <div id='content-wrapper' className='d-flex flex-column'>
                <div id='content'>
                    <NavbarComponent />
                    <div className='container-fluid'>
                        hello
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Dashboard