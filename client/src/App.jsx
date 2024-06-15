// src/App.js
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AdminCalendar from './components/AdminCalender';
import StudentCalendar from './components/StudentCalender';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signIn } from './redux/authSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(signIn(user));
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="bg-gray-200 min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-8">Calendar Booking App</h1>
          <Routes>
            <Route path="/admin" element={<AdminCalendar/>}/>
            <Route path="/student" element={<StudentCalendar/>} />
            <Route path="/sign-in" element={<SignIn/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
