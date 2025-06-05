import React from 'react';
import { UserButton, useUser, SignInButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <Link to="/">
        <img src="/Logo1.png" width={120} height={50} alt="Logo" />
      </Link>

      <ul className="hidden md:flex gap-16">
        <li className="font-medium hover:text-primary transition-all">
          <Link to="/">Home</Link>
        </li>
        <li className="font-medium hover:text-primary transition-all">
          <Link to="/search">Search</Link>
        </li>
        <li className="font-medium hover:text-primary transition-all">
          <Link to="/search/new">New</Link>
        </li>
        <li className="font-medium hover:text-primary transition-all">
          <Link to="/search/pre-owned">Pre-Owned</Link>
        </li>
      </ul>

      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton />
          <Link to="/profile">
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <SignInButton mode="modal">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
        </div>
      )}
    </div>
  );
}

export default Header;
