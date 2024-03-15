import React from 'react'
import Company from '../admin/company/Company.tsx'
import Register from '../admin/auth/register.tsx'
import User from '../admin/users/User.tsx'
import Customer from '../admin/customers/Customer.tsx'
import Employies from '../admin/employies/Employies.tsx'
import Requests from '../admin/request/request.tsx'
import { Route, Routes } from 'react-router-dom'


function Home() {
  return (
    <div>
<div className="content-wrapper">
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Dashboard</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item">
              </li>
            <li className="breadcrumb-item active">Dashboard v1</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>150</h3>
              <p>New Orders</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-success">
            <div className="inner">
              <h3>53<sup style={{fontSize: 20}}>%</sup></h3>
              <p>Bounce Rate</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>44</h3>
              <p>User Registrations</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>65</h3>
              <p>Unique Visitors</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
          </div>
        </div>
      </div>
      
<Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/company" element={<Company />} />
        <Route path="/users" element={<User />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/employies" element={<Employies />} />
        <Route path="/requests" element={<Requests />} />
        
      </Routes>


    </div>
  </section>
</div>
    </div>
  )
}

export default Home
