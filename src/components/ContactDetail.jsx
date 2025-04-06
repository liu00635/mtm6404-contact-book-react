// src/components/ContactDetail.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import db from '../utils/db';
import { useEffect, useState } from 'react';

const ContactDetail = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            const docRef = doc(db, "contacts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setContact({ id: docSnap.id, ...docSnap.data() });
            }
        };
        fetchContact();
    }, [id]);

    const handleDelete = async () => {
        await deleteDoc(doc(db, "contacts", id));
        navigate('/');
    };

    if (!contact) return <p>Loading...</p>;

    return (
        <>
            <h2>{contact.firstName} {contact.lastName}</h2>
            <p>Email: {contact.email}</p>
            <Link to={`/contacts/${id}/edit`} style={{ marginRight: '10px' }}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
        </>
    );
};

export default ContactDetail;
