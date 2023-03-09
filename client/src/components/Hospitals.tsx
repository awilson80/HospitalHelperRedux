import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Hospitals = () => {
    const [hospitals, setHospitals] = useState<any[]>([]);

    useEffect(() => {
        const getHospitals = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5118/api/Hospital'
                );
                setHospitals(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        getHospitals();
    }, []);

    const handleDelete = async (id: Number) => {
        try {
            await axios.delete('http://localhost:5118/api/Hospital/' + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='hospitals-content'>
            <h1>Hospitals</h1>
            <div className='hospitals-list'>
                {hospitals.map((hospital) => (
                    <div className='hospitals-item' key={hospital.id}>
                        <div className='hospitals-details'>
                            <h1>{hospital.name}</h1>
                            <h2>{hospital.location}</h2>
                            <h2>{hospital.type}</h2>
                            <h2>{hospital.phone}</h2>

                            <button
                                className='delete-button'
                                onClick={() => {
                                    handleDelete(hospital.id);
                                }}
                            >
                                Delete
                            </button>
                            <button className='edit-button'>
                                <Link to={`/edit/${hospital.id}`} className='edit-link'>Edit</Link>
                            </button>
                            <br />
                            <br />
                        </div>
                    </div>
                ))}
            </div>
            <br />
            <button className='add-button'>
                <Link to={'/add'} className='edit-link'>Add New Hospital</Link>
            </button>
        </div>
    );
};
