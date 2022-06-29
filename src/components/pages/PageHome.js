import TopSales from '../TopSales';
import Catalog from '../Catalog';
import Header from '../layout/LOHeader';
import Footer from '../layout/LOFooter';

import { useEffect } from 'react';

export default function PageHome(props) {

  useEffect( () => {
    document.title = 'Магазин "Bosa Noga"';
  }, [])

  return (
    <>
    <Header/>
    <hr/>

    <TopSales/>
    <br/><br/>

    <Catalog needShow={false}/>
    <Footer/>
    </>
  )
}
