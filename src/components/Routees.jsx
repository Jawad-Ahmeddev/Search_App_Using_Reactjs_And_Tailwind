import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Results } from './Results';

export const Routees = () => (
  <div className="p-4">
    <Routes>
    <Route path="/" element={<Results />} />

      <Route exact path="/search" element ={<Results/>} >
      </Route>
      <Route path="/images"  element ={<Results/>}>
      </Route>
      <Route path="/news"  element ={<Results/>}>
      </Route>
      

    </Routes>
  </div>

);