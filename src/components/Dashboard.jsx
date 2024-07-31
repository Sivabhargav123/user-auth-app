import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userImg from '../styles/login_imgg.png'
import lockBg from'../styles/lockk.jpeg'
import avatar from '../styles/avatar_dash.jpeg'
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login'); // Redirect to login if no user is found in local storage
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard_container'>
      <div className='dash_img_container'>
        <img className='img' src={avatar} alt=''/>
      </div>
      <h2 className='dash_h2'>Dashboard</h2>
      <p className='dash_p'>Welcome, {user.user_firstname} {user.user_lastname}!</p>
      <p className='dash_email'>Email: {user.user_email}</p>
      <p className='dash_p'>Phone: {user.user_phone}</p>
    </div>
  );
};

export default Dashboard;
