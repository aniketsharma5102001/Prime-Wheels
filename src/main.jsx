import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './home'
import Contact from './contact'

import {ClerkProvider  } from "@clerk/clerk-react";
import Profile from './profile'
import AddListing from './add-Listing';
import { Toaster } from './components/ui/sonner'
import SearchByCatgory from './search/[category]'
import SearchByOptions from './search'




const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/contact',
    element: <Contact />
  },
    {
      path: '/Profile',
    element: <Profile />
    },
    {
      path: '/AddListing',
    element: <AddListing />
    },
    {
      path:'/search',
      element:<SearchByOptions/>
    },
    {
      path:'/search/:category',
      element:<SearchByCatgory/>
    }
  
])
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
     
    <RouterProvider router={router} />
    <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
