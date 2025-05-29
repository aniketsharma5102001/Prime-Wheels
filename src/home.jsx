import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchcar from './components/MostSearchcar'
import InfoSection from './components/InfoSection';
import   Footer from './components/Footer'

function Home() {
  return (
    <div>
        {/*Header*/}
        <Header/>

        {/*Hero*/}
        <Hero/>

        {/*Category*/}
        <Category/>

        {/*MostSearchCar*/}
        <MostSearchcar/>

        {/*InfoSection*/}
      <InfoSection/>

      {/*Footer*/}
      <Footer/>

    </div>
  )
}

export default Home;