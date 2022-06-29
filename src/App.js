import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageHome from './components/pages/PageHome';
import PageCatalog from './components/pages/PageCatalog';
import PageAbout from './components/pages/PageAbout';
import PageContacts from './components/pages/PageContacts';
import PageProduct from './components/pages/PageProduct';
import PageCart from './components/pages/PageCart';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { initFetch } from './rtkstore/shopReducer';
import { loadStateFromLS } from './rtkstore/cartReducer';

function App() {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(initFetch());
    dispatch(loadStateFromLS());
  }, [dispatch])

  return (
    <div className="container">
      <BrowserRouter>
        <Routes> 
          <Route path='/' element={<PageHome/>}></Route>
          <Route path='/catalog' element={<PageCatalog/>}></Route>
          <Route path='/about' element={<PageAbout/>}></Route>
          <Route path='/contacts' element={<PageContacts/>}></Route>
          <Route path='/product/:prodId' element={<PageProduct/>}></Route>
          <Route path='/cart' element={<PageCart/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
