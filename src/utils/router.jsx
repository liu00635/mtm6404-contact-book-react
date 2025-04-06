// src/router.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App.jsx';
import ContactDetail from '../components/ContactDetail.jsx';
import EditContact from '../components/EditContent.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/contacts/:id",
        element: <ContactDetail />,
    },
    {
        path: "/contacts/:id/edit",
        element: <EditContact />,
    }
]);

export default function Routes() {
    return <RouterProvider router={router} />;
}
