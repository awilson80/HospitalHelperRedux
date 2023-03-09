import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Hospitals } from './components/Hospitals';
import { AddHospital } from './components/AddHospital';
import { EditHospital } from './components/EditHospital';

export function App() {
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
