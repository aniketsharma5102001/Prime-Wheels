import Header from '@/components/Header'

import React from 'react'

import MyListing from './components/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



function Profile() {
  return (
    <div>
      <Header />
      <div className='px-10 md:px-20 my-10'>
        <Tabs defaultValue="my-listing" className="w-full">

          <TabsList className="w-full flex justify-start">
            <TabsTrigger value="my-listing">My Listing</TabsTrigger>
            {/* <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger> */}

          </TabsList>
          <TabsContent value="my-listing" >
            <MyListing />
          </TabsContent>
          {/* <TabsContent value="inbox"><Inbox/></TabsContent>
          <TabsContent value="profile">profile Tab</TabsContent> */}
        </Tabs>



      </div>

    </div>
  )
}

export default Profile