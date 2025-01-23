'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React from 'react';

const Providers = ({ children }:{
    children:React.ReactNode
}) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#1D9BF0"
        options={{ showSpinner: false }}
        shallowRouting
        

      />
    </>
  );
};

export default Providers;