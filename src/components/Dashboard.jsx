// import React from 'react';

// const Dashboard = () => {
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (!user) {
//     return <div>No user data available</div>;
//   }

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>First Name: {user.user_firstname}</p>
//       <p>Email: {user.user_email}</p>
//       <p>Phone: {user.user_phone}</p>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.user_firstname} {user.user_lastname}!</p>
      <p>Email: {user.user_email}</p>
      <p>Phone: {user.user_phone}</p>
      {/* Display other user details as needed */}
    </div>
  );
};

export default Dashboard;
