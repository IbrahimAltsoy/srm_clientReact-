import React from 'react'
import Home from './components/layout/Home'
import SideNav from './components/layout/SideNav'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'





function App() {
  return (
    <div className='wrapper'>   
                   
      <Header />
      <SideNav />
      <Home/>
      <Footer />
      
    </div>
  )
}

export default App
