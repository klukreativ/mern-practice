import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavbarComponent from './components/navbarComponent';
import RecordList from './components/recordList';
import Edit from './components/edit';
import Create from './components/create';

const App = () => {
    return (
        <div>
            <NavbarComponent />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    )
}

export default App;