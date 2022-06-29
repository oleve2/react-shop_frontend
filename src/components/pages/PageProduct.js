import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDispatch } from 'react-redux';
import { actions } from '../../rtkstore/cartReducer';

import Header from '../layout/LOHeader';
import Footer from '../layout/LOFooter';
import Preloader from '../layout/Preloader';
import Product from "../Product";

export default function PageProduct(props) {
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const {prodId} = useParams();

  const [prod, setProd] = useState({id:0, title: ''});
  const [loaded, setLoaded] = useState(false);

  const [purchaseCnt, setPurchaseCnt] = useState(1);
  const [purchaseSize, setPurchaseSize] = useState('');

  useEffect( () => {
    async function getData() {
      let data = await fetch(BASE_URL + `/api/items/${prodId}`);
      let dataJson = await data.json();
      setProd(dataJson);
      setLoaded(true);
    };
    getData();
  }, [prodId, BASE_URL])

  const handlePlus = () => {
    setPurchaseCnt(purchaseCnt+1);
  }

  const handleMinus = () => {
    if (purchaseCnt > 1) {
      setPurchaseCnt(purchaseCnt-1);
    }
  }
  
  const handlePickSize = (val) => {
    setPurchaseSize(val);
  }

  const handleAddToCart = () => {
    if (purchaseSize === '') {
      alert('Выберите нужный Вам размер!')
    } else {
      let newProd = {...prod, 
        count: purchaseCnt, 
        size: purchaseSize,
        prodLink: `/product/${prod.id}`
      }
      dispatch(actions.addPurchase(newProd));
      dispatch(actions.calculateTotals());
      dispatch(actions.upGetPurchID());      
    }
  }

  // 
  return (
    <div>
    <Header/>
    <hr/>
    
    { (loaded === true) 
    ? <Product prod={prod}
        purchaseCnt={purchaseCnt}
        purchaseSize={purchaseSize}
        handlePlus={handlePlus}
        handleMinus={handleMinus}
        handlePickSize={handlePickSize}
        handleAddToCart={handleAddToCart}
      />
    : <Preloader/>}

    <Footer/>
    </div>
  )
}


