import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Dashboard from '../user/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Profil from '../user/account/profil';
import EmailVertif from '../auth/EmailVertif';
import Saldo from '../user/saldo/Saldo';
import Transaksi from '../user/transaksi/Transaksi';
import Promo from '../user/promo/Promo';
import Pengguna from '../user/pengguna/Pengguna';
import RatingTestimoni from '../user/rating/RatingTesimoni';



const Routeer = () => {
 
    

    return(

<Routes>
 
  {/* Hanya untuk user belum login */}
  <Route path="/" element={<PublicRoute><Login /></PublicRoute>}/>
  <Route path="/lupapassword" element={<PublicRoute><EmailVertif /></PublicRoute>}/>
  
  {/* Hanya untuk user yang sudah login */}
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
  <Route path="/saldo" element={<ProtectedRoute><Saldo /></ProtectedRoute>}/>
  <Route path="/kelolatransaksi" element={<ProtectedRoute><Transaksi /></ProtectedRoute>}/>
  <Route path='/promo' element={<ProtectedRoute><Promo /></ProtectedRoute>} />
  <Route path='/pengguna' element={<ProtectedRoute><Pengguna /></ProtectedRoute>} />
  <Route path='/rating' element={<ProtectedRoute><RatingTestimoni /></ProtectedRoute>} />

  <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>}/>

</Routes>
        
    );


}

export default Routeer;