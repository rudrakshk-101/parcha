import { useState } from 'react';
import './App.css'; // Ensure this import is at the top of your file
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import FormsPage from "./FormsPage";
import MedicalHistoryPage from './MedicalHistoryPage';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import PrescriptionCard from './PrescriptionCard';
import './SignInButton.css';
import Logo from "../public/logo2.png"

function App() {
 const [count, setCount] = useState(0);

 return (
    <>
      <header>
    <div className="sign-in-section">
        <SignedOut>
          <SignInButton className="sign-in-button" />
        </SignedOut>
        <SignedIn>
          <UserButton className="user-button" />
        </SignedIn>
      </div>
    </header>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/prescribing' element={<FormsPage />} />
          <Route path='/medicalhistory' element={<MedicalHistoryPage />} />
          <Route path='/prescriptioncard' element={<PrescriptionCard />} />
        </Routes>
      </BrowserRouter>
      <img src={Logo} alt="" className="logoImg" />
    </>
 );
}

export default App;
