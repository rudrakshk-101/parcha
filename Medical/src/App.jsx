import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './Home';
import FormsPage from "./FormsPage"
import MedicalHistoryPage from './MedicalHistoryPage';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import PrescriptionCard from './PrescriptionCard';
import PharmacistForm from "./PharmacistForm";
import PrescriptionPage from "./OrderPage"

function App() {
 const [count, setCount] = useState(0);

 return (
    <>
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/prescribing' element={<FormsPage />} />
        <Route path='/medicalhistory' element={<MedicalHistoryPage />} />
        <Route path='/prescriptioncard' element={<PrescriptionCard />} />
        <Route path='/pharmacistform' element={<PharmacistForm />} />
        <Route path='/orderRequests' element={<PrescriptionPage />} />
      </Routes>
      </BrowserRouter>
    </>
 );
}

export default App;



