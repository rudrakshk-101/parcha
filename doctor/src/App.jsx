import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './Home';
import FormsPage from "./FormsPage"
import MedicalHistoryPage from './MedicalHistoryPage';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import PrescriptionUpdate from "./PrescriptionUpdate";
import VideoCall from "./videoCall"
import './SignInButton.css';

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
        <Route path='/prescriptionupdate' element={<PrescriptionUpdate />} />
        <Route path='/videocall' element={<VideoCall />} />
      </Routes>
      </BrowserRouter>
    </>
 );
}

export default App;




