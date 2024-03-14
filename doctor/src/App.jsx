import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './Home';
import FormsPage from "./FormsPage"

function App() {
 const [count, setCount] = useState(0);

 return (
    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/prescribing' element={<FormsPage />} />
      </Routes>
      </BrowserRouter>
    </>
 );
}

export default App;
