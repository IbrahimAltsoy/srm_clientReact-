import React from 'react';
import Home from './components/layout/Home';
import SideNav from './components/layout/SideNav';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/admin/auth/login.tsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <div className='wrapper'>     
      {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && (
        <>
          <Header />
          <SideNav />
          <Home />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
