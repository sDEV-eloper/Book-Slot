import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

const SignUp = () => {
const [username, setUsername]=useState()
const [role, setRole]=useState()
const [password, setPassword]=useState()

const navigate=useNavigate()
const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          role,
          password,
        }),
      });
    console.log("response", response);
    if (response.ok) {
      const responseData = await response.json();
     toast.success(responseData); 
     navigate('/sign-in')
    } else {
      const errorData = await response.json();
      toast.error(errorData); 
    }

    
  } catch (error) {
    toast.error(error)
  }
}

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          SIGN UP
        </h1>
        <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit}>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" name="username" id="username" value={username}  onChange={(e)=>setUsername(e.target.value)}   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
          </div>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" value={password}  onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select Role
      </label>
      <select
        name="role"
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        placeholder='Select your role'
      >
        <option value="">Select your role</option>
        <option value="admin">Admin</option>
        <option value="student">Student</option>
      </select>
    </div>
         
   
<button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
        
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <Link to="/sign-in" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign In here</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default SignUp