import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Dashboard from '../user/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Profil from '../user/account/profil';
import EmailVertif from '../auth/EmailVertif';
import Saldo from '../user/saldo/Saldo';



const Routeer = () => {
 
    

    return(

<Routes>
 
  {/* Hanya untuk user belum login */}
  <Route path="/" element={<PublicRoute><Login /></PublicRoute>}/>
  <Route path="/lupapassword" element={<PublicRoute><EmailVertif /></PublicRoute>}/>
  
  {/* Hanya untuk user yang sudah login */}
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
  <Route path="/saldo" element={<ProtectedRoute><Saldo /></ProtectedRoute>}/>
  <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>}/>

</Routes>
        
    );


}

export default Routeer;