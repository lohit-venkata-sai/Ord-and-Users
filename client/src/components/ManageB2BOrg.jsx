import React, { useState } from 'react'
import OrganizationList from '../pages/OrganizationList.jsx';
import Org from '../pages/Org.jsx';
import {Routes,Route} from 'react-router-dom' 
const ManageB2BOrg = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OrganizationList />} />
        <Route path='/:orgSlug' element={<Org/>} />
      </Routes>
    </div>
    // <OrganizationList/>
  );
}

export default ManageB2BOrg
