import React from 'react'
import { Link } from 'react-router-dom';

function SideNav() {
  return (
    <div>
    
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  {/* <a href="index3.html" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Srm Client</span>
  </a> */}
  {/* Sidebar */}
  <div className="sidebar">
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="/home" className="d-block">Ibrahim Altsoy</a>
      </div>
    </div>
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item menu-open">
          <a href="#" className="nav-link active">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Dashboard
              <i className="right fas fa-angle-left" />
            </p>
          </a>
        </li>
        <li className="nav-item">
       
        <Link to="/company" className="nav-link">
          <i className="nav-icon fas fa-th" />
          <p>
            Companys
          </p>
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/users" className="nav-link">
        <i className="fa fa-users" style={{ marginRight: '5px' }}></i>
            <p>
                Users              
            </p>
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/customers" className="nav-link">
        <i className="fa fa-users" style={{ marginRight: '5px' }}></i>
            <p>
                Customers            
            </p>
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/employies" className="nav-link">
        <i className="fa fa-users" style={{ marginRight: '5px' }}></i>
            <p>
            Employies            
            </p>
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/requests" className="nav-link">
        <i className="fa fa-users" style={{ marginRight: '5px' }}></i>
            <p>
                Requests            
            </p>
        </Link>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link"> 
         
          <i className="fa fa-wrench" style={{ marginRight: '5px' }}></i>
            <p>
                Settings              
            </p>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</aside>

    </div>
  )
}

export default SideNav
