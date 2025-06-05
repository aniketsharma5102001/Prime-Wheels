import React from 'react';
import Header from './components/Header';

const App = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default App;
