import { useState } from 'react'
import RegisterForm, { RegisterFormData } from "./components/RegisterForm";



function App() {
const handleRegister = (data: RegisterFormData) => {
    console.log("Form submitted:", data);
    // later -> call backend API with fetch/axios here
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm onSubmit={handleRegister} />
    </div>
   

 
  )
}

export default App
