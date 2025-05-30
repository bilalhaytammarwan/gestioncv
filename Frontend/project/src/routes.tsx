import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CompanyAccounts from './pages/CompanyAccounts';
import ClientAccounts from './pages/ClientAccounts';
import CompanyAnnouncements from './pages/CompanyAnnouncements';
import ClientAnnouncements from './pages/ClientAnnouncements';
import UserDetails from './pages/UserDetails';
import AdminProfile from './pages/AdminProfile';
import AnnouncementDetails from './pages/AnnouncementDetails';
import { elements } from 'chart.js';
import CreateSubAdmin from './pages/CreateSubAdmin';
import AdminAccounts from './pages/AdminAccounts';
import Admindetails from './pages/Admindetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'companies',
        element: <CompanyAccounts />,
      },
      {path:'company/:id',
        element:<AnnouncementDetails/>
      },
      {
        path: 'clients',
        element: <ClientAccounts />,
      },
      {
        path:"/clients/:id",
         element:<UserDetails/>,
      },
      {
        path:"/admins",
         element:<AdminAccounts/>,
      },
       {
        path:"/admin/:id",
         element:<Admindetails/>,
      }
      ,{
      path:"/profile/:id",
      element:<AdminProfile/>
    },
      {
        path: 'announcements/company',
        element: <CompanyAnnouncements />,
      },
      {
        path: 'announcements/client',
        element: <ClientAnnouncements />,
      },{
      path:'addsubadmin',
      element:<CreateSubAdmin/>},
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;