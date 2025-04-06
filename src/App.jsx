import { useState, useEffect } from 'react'
import db from './utils/db';
import { Link } from 'react-router-dom'
import { collection, getDocs, addDoc } from 'firebase/firestore';
import './App.css'

const App = () => {
  // state variables
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // fetch contacts
  const fetchContacts = async () => {
    const docSnapshot = await getDocs(collection(db, "contacts"))
    const data = docSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setContacts(data);
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  // sort and filter contacts
  const filteredContacts = contacts
    .filter(c =>
      (`${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), formData);
      setFormData({ firstName: '', lastName: '', email: '' }); // reset form
      fetchContacts(); // refresh contact list
      setShowForm(false); // hide form after adding
    } catch (error) {
      console.error("Error adding contact: ", error);
    }
  };

  return (
    <>
      <h1>Contact Book</h1>

      <div className="contact-list-container">
        <input
          type="text"
          placeholder="Search contacts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Contact</button>
          </form>
        )}

        <ul>
          {filteredContacts.map(contact => (
            <li key={contact.id}>
              <Link to={`/contacts/${contact.id}`}>
                {`${contact.firstName} ${contact.lastName}`}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button className="floating-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? '×' : '+'}
      </button>

    </>
  );
}

export default App;
