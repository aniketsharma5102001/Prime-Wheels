import React from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import App from '@/App';



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
           
            {isSignedIn  ? 
            
                <div className='flex items-center gap-5'>
                    <UserButton />
                    <Link to={'/Profile'}>
                        <Button> Submit Listing</Button>
                    </Link>
                </div>
                :
                <div>
                    
                    <UserButton />
                    <Button> Submit Listing</Button>
                    
                </div>
            }
        </div>

    )
}

export default Header