import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const AddHospital = () => {
    const [input, setInput] = useState({
        name: '',
        location: '',
        type: '',
        phone: '',
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setInput((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const sendData = async (data) => {
        try {
            await axios.post('http://localhost:4000/hospitals', data);
            navigate('/');
        } catch (err) {
            console.log('Unable to process new addition.');
        }
    };

    // Validation

    const onSubmit = (data) => {
        sendData(data);
    };

    const schema = yup.object().shape({
        name: yup
            .string()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Name can only contain Latin letters.'
            )
            .required('Please provide the name.'),
        location: yup
            .string()
            .matches(
                /^[a-zA-Z0-9]+(([',.\- ][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/,
                'Location contains invalid characters.'
            )
            .required(`Please provide the location.`),
        type: yup.string().required('Please specify the type.'),
        phone: yup
            .string()
            .min(7, 'Phone must be at least 7 characters')
            .max(15, 'Phone number must be at most 15 characters')
            .matches(/^[^.]*$/, {
                message: 'Phone number contains invalid characters.',
            })
            .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
                message: 'Phone number contains invalid characters.',
            })
            .matches(/^[\s\d)(-]+$/, {
                //original matcher
                message: 'Please provide phone number in a valid format.',
            }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <form className='form'>
            <h1>Add New Hospital</h1>
            <input
                type='text'
                placeholder='name'
                onChange={handleChange}
                name='name'
                {...register('name')}
            />
            {errors.name && <p>{errors.name.message}</p>}
            <input
                type='text'
                placeholder='location'
                onChange={handleChange}
                name='location'
                {...register('location')}
            />
            {errors.location && <p>{errors.location.message}</p>}
            <select
                onChange={handleChange}
                className='hospital-add-dropdown'
                name='type'
                {...register('type')}
            >
                <option value='General'>General</option>
                <option value='Pediatric'>Pediatric</option>
                <option value='Cardiology'>Cardiology</option>
                <option value='Neurology'>Neurology</option>
                <option value='Orthopedic'>Orthopedic</option>
            </select>
            {errors.type && <p>{errors.type.message}</p>}
            <input
                type='text'
                placeholder='phone'
                onChange={handleChange}
                name='phone'
                {...register('phone')}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            <button
                type='submit'
                className='form-button'
                onClick={handleSubmit(onSubmit)}
            >
                Save
            </button>
        </form>
    );
};

export default AddHospital;
