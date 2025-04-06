// src/components/EditContact.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '../utils/db';

const EditContact = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const loadContact = async () => {
            const docSnap = await getDoc(doc(db, 'contacts', id));
            if (docSnap.exists()) {
                setFormData(docSnap.data());
            }
        };
        loadContact();
    }, [id]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, 'contacts', id), formData);
        navigate('/');

    };

    return (
        <>
            <h2>Edit Contact</h2>
            <form onSubmit={handleSubmit}>
                <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                <input name="email" value={formData.email} onChange={handleChange} required />
                <button type="submit">Update</button>
            </form>
        </>
    );
};

export default EditContact;
