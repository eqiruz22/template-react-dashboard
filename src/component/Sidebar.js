import React from 'react'
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="#">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="#">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span></Link>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Interface
            </div>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog" />
                    <span>Components</span>
                </Link>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <Link className="collapse-item" to="#">Buttons</Link>
                        <Link className="collapse-item" to="#">Cards</Link>
                    </div>
                </div>
            </li>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench" />
                    <span>Utilities</span>
                </Link>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <Link className="collapse-item" to="utilities-color.html">Colors</Link>
                        <Link className="collapse-item" to="utilities-border.html">Borders</Link>
                        <Link className="collapse-item" to="utilities-animation.html">Animations</Link>
                        <Link className="collapse-item" to="utilities-other.html">Other</Link>
                    </div>
                </div>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Addons
            </div>
            <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder" />
                    <span>Pages</span>
                </Link>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <Link className="collapse-item" to="#">Login</Link>
                        <Link className="collapse-item" to="#">Register</Link>
                        <Link className="collapse-item" to="#">Forgot Password</Link>
                        <div className="collapse-divider" />
                        <h6 className="collapse-header">Other Pages:</h6>
                        <Link className="collapse-item" to="#">404 Page</Link>
                        <Link className="collapse-item" to="#">Blank Page</Link>
                    </div>
                </div>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Charts</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">
                    <i className="fas fa-fw fa-table" />
                    <span>Tables</span></Link>
            </li>
        </ul>
    );
}

export default Sidebar