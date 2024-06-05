import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Cadastrar from './Components/Cadastrar/index.jsx';
import Exibir from './Components/Exibir/index.jsx';

const router = createBrowserRouter([
   {
      element: <App />,
      children: [
         {
            path: '/',
            element: <Exibir />,
         },
         {
            path: 'cadastrar',
            element: <Cadastrar />,
         },
      ],
   },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
