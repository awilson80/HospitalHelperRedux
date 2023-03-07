import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Hospitals from './components/Hospitals.jsx';
import AddHospital from './components/AddHospital.jsx';
import EditHospital from './components/EditHospital.jsx';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Hospitals />} />
                    <Route path='/add' element={<AddHospital />} />
                    <Route path='/edit/:id' element={<EditHospital />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
