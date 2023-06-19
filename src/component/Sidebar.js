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
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span></Link>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Interface
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/gpon">
                    <i className="fas fa-fw fa-table" />
                    <span>Gpon</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/ont">
                    <i className="fas fa-fw fa-table" />
                    <span>Ont</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/olt">
                    <i className="fas fa-fw fa-table" />
                    <span>Olt</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/pon">
                    <i className="fas fa-fw fa-table" />
                    <span>Pon</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/odp">
                    <i className="fas fa-fw fa-table" />
                    <span>Odp</span></Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/costumer'>
                    <i className='fas fa-fw fa-users' />
                    <span>Costumer</span>
                </Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/dismantle'>
                    <i className='fas fa-fw fa-users' />
                    <span>Dismantle</span>
                </Link>
            </li>
            <li className='nav-item'>
                <Link className="nav-link" to="/log">
                    <i className="fas fa-list fa-fw" />
                    <span>Activity Log</span>
                </Link>
            </li>
        </ul>
    );
}

export default Sidebar