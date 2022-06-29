
import banner from '../../assets/banner.jpg';
import logo from '../../assets/header-logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../rtkstore/cartReducer';
import { actionsShopReducer } from '../../rtkstore/shopReducer';
import { fetchByFiters } from '../../rtkstore/shopReducer';



export default function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCnt = useSelector((store) => store.cartReducer.totalCnt)
  
  const searchStore = useSelector( (store) => store.shopReducer.searchStore );
  const [searchStr, setSearchStr] = useState(searchStore);

  const [showSF, setShowSF] = useState(false);

  useEffect( () => {
    dispatch(actions.calculateTotals());
    setSearchStr(searchStore);
  }, [dispatch, searchStore])

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/catalog');
    dispatch(fetchByFiters(searchStr, {id:0, name:'Все'}, 0));
  }

  const handleSearchFormChange = (e) => {
    setSearchStr(e.target.value);
    dispatch(actionsShopReducer.setSearchStore(e.target.value));
  }

  return (
    <>
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Bosa Noga"/>
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Главная</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/catalog">Каталог</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">О магазине</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contacts">Контакты</Link>
                </li>
              </ul>

                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={() => { setShowSF(!showSF) }}></div>
                  <div className="header-controls-pic header-controls-cart" onClick={() => {navigate('/cart')}}>
                    {/*кол-во покупок в магазине */}
                    { (cartCnt > 0)
                      ? <><div className="header-controls-cart-full">{cartCnt}</div></> 
                      : <></> 
                    }
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" 
                  className={"header-controls-search-form form-inline " + ((showSF === false) ? 'invisible' : '')}
                  onChange={(e) => {handleSearchFormChange(e)}}
                  onSubmit={(e) => { handleSubmit(e) }}
                >
                  <input className="form-control" placeholder="Поиск"/>
                </form>
              
            </div>
          </nav>
        </div>
      </div>
      <div className="banner">
        <img src={banner} className="img-fluid" alt="К весне готовы!"/>
        <h2 className="banner-header">К весне готовы!</h2>
      </div>      
    </header>
  </>
  )
}