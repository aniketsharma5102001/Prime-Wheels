import React from 'react'
import { UserButton, useUser ,SignInButton} from '@clerk/clerk-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'




function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='flex justify-between items-center shadow-sm p-5'>
            <img src='/Logo1.png' width={120} height={50} />
            <ul className='hidden md:flex gap-16'>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Home</li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Search</li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">New</li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Pre Owned</li>

            
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
                    <SignInButton>
                        <Button variant="outline">Sign In</Button>
                    </SignInButton>
                </div>
            )}

        </div>

    )
}

export default Header