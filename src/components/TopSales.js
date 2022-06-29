import { useSelector } from 'react-redux';

import CatalogItem from './CatalogItem';
import Preloader from './layout/Preloader';

export default function TopSales(props) {
  const topSalesLoading = useSelector( (store) => store.shopReducer.topSalesLoading );
  const topSales = useSelector( (store) => store.shopReducer.topSales );
  const topSalesError = useSelector( (store) => store.shopReducer.topSalesError );
  
  return (
    <div>
      <h2>Хиты продаж</h2>
      <div className="row">
        { (topSalesLoading === true) ? <Preloader/> : <></> }

        { (topSalesError == null) ? <></> : <>Error: {topSalesError}</> }

        {
        ((topSalesLoading === false) && (topSalesError === null))
        ? <>
        { topSales.map((elem) => {
          return <CatalogItem key={elem.id}
            id={elem.id}
            image={elem.images[0]} 
            title={elem.title}
            price={elem.price}
            prodLink={elem.prodLink}
          /> 
        }) }        
        </>
        : <></>
        }
      </div>
    </div>
  )
}
