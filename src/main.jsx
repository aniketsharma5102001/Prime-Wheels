import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from './components/ui/sonner';

import Home from './home';
import Contact from './contact';
import Profile from './profile';
import AddListing from './add-Listing';
import SearchByCatgory from './search/[category]';
import SearchByOptions from './search';
import ListingDetail from './listing-details/[id]/index';
import ProtectedRoute from './components/ProtectedRoute';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) throw new Error("Missing Clerk Publishable Key");

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
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/AddListing',
    element: (
      <ProtectedRoute>
        <AddListing />
      </ProtectedRoute>
    )
  },
  {
    path: '/search',
    element: <SearchByOptions />
  },
  {
    path: '/search/:category',
    element: <SearchByCatgory />
  },
  {
    path: '/listing-details/:id',
    element: <ListingDetail />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
