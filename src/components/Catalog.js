import { useSelector, useDispatch } from 'react-redux';
import { fetchByFiters } from '../rtkstore/shopReducer';
import { useState, useEffect } from 'react';

import CatalogItem from './CatalogItem';
import Preloader from './layout/Preloader';
import { actionsShopReducer } from '../rtkstore/shopReducer';


export default function Catalog(props) {
  const dispatch = useDispatch();

  const itemsLoading = useSelector( (store) => store.shopReducer.itemsLoading );
  const itemsError = useSelector( (store) => store.shopReducer.itemsError );

  const categoriesLoading = useSelector( (store) => store.shopReducer.categoriesLoading ); 
  const categoriesError = useSelector( (store) => store.shopReducer.categoriesError );  
  const categories = useSelector( (store) => store.shopReducer.categories );
  
  const itemsFilt2 = useSelector( (store) => store.shopReducer.itemsFilt2 ); // filtered
  const filt2Offset = useSelector( (store) => store.shopReducer.filt2Offset );
  const searchStore = useSelector( (store) => store.shopReducer.searchStore );

  //
  const [searchStr, setSearchStr] = useState('');
  const [setectedCat, setSelectedCat] = useState({id: 0, title: 'Все'});
  const [searchChanged, setSearchChanged] = useState(false);


  //
  const handleSelectCat = (val) => {
    setSelectedCat(val);
    dispatch(fetchByFiters(searchStr, val, 0));
  }

  const handleSearchFormChange = (e) => {
    setSearchChanged(true);
    setSearchStr(e.target.value);
    dispatch(actionsShopReducer.setSearchStore(e.target.value));
  }

  const formSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchByFiters(searchStr, setectedCat, 0));
    setSearchChanged(false);
  }

  const handleLoadMore = () => {
    if (searchChanged) {
      dispatch(fetchByFiters(searchStr, setectedCat, 0));
      setSearchChanged(false);
    } else {
      dispatch(fetchByFiters(searchStr, setectedCat, filt2Offset));
    };
  }

  useEffect( () => {
    setSearchStr(searchStore);
  },[searchStore])

  // -----------------------------
  return (
    <div>
      <h2>Каталог</h2>

      { props.needShow && <>
          <form className="catalog-search-form form-inline" onSubmit={(e) => {formSubmit(e) }}>
            <input 
              className="form-control" 
              placeholder="Поиск" 
              value={searchStr} 
              onChange={(e) => {handleSearchFormChange(e)}}
            />
          </form> </> 
      }

      <ul className="catalog-categories nav justify-content-center">
        { (categoriesLoading === true) ? <Preloader/> : <></> }

        { (categoriesError == null) ? <></> : <>Error: {categoriesError}</> }
        
        { 
        ((categoriesLoading === false) && (categoriesError === null))
        ? <>
          <li className="nav-item"> 
            <div 
              className={"nav-link " + ((setectedCat.title == 'Все') ? "active" : "")} 
              onClick={() => {handleSelectCat({id: 0, title: 'Все'})}}
            >Все
            </div> 
          </li>
          { categories.map( (item) => {
            return <li key={item.id} className="nav-item">
              <div 
                className={"nav-link " + ((setectedCat.title === item.title) ? "active" : "")}
                onClick={() => {handleSelectCat({id: item.id, title: item.title})}}
              >{item.title}
              </div>
            </li>
          }) } 
        </> 
        : <></> 
        }
      </ul>
         
      <div className="row">
        { (itemsLoading === true) ? <Preloader/> : <></> }

        { (itemsError == null) ? <></> : <>Error: {itemsError}</> }
        
        {
        ((itemsLoading === false) && (itemsError === null))
        ? <>
        { itemsFilt2.map((elem) => {
          return <CatalogItem key={elem.id}
            id={elem.id}
            category={elem.category}
            image={elem.images[0]} 
            title={elem.title}
            price={elem.price}
            prodLink={elem.prodLink}
          />
        }) }
        </>
        : <></>
        }

        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={handleLoadMore}>Загрузить ещё</button>
        </div>        

      </div>
    </div>
  )
}

