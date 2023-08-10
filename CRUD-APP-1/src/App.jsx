import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import axios from 'axios';
// import './App.css'
import {
  LoginPage,
  RegisterPage,
  ChangePasswordPage,
  AddNewStudent,
  StudentsPage,
  Settings,
  DashboardPage,
  UpdateStudent,
} from './pages';
import {Auth} from './compnenets'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>,
  },
  {
    path: '/DashboardPage',
    element: <DashboardPage/>,
  },
  {
    path: '/RegisterPage',
    element: <RegisterPage/>
  },
  {
    path: '/ChangePasswordPage',
    element: <ChangePasswordPage/>
  },
  {
    path: '/AddNewStudent',
    element: <AddNewStudent/>
  },
  {
    path: '/StudentsPage',
    element: <StudentsPage/>
  },
  {
    path: '/SettingsPage',
    element: <Settings/>
  },
  {
    path: '/updateStudent/:id',
    element: <UpdateStudent/>
  },
  {
    path: '/authorizationFailed',
    element: <Auth/>
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;


