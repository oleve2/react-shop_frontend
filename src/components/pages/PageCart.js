
import Header from '../layout/LOHeader';
import Footer from '../layout/LOFooter';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { actions } from '../../rtkstore/cartReducer';
import { sendOrder } from '../../rtkstore/cartReducer';
import { useNavigate } from 'react-router-dom';


export default function PageCart(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector( (store) => store.cartReducer.items);
  const cartTotal = useSelector( (store) => store.cartReducer.totalSum);

  const [phone, setPhone] = useState('');
  const [addr, setAddr] = useState('');
  const [agreed, setAgreed] = useState(false);  

  useEffect( () => {
    dispatch(actions.calculateTotals());
  }, [dispatch, cartItems])

  useEffect( () => {
    setPhone(phone);
    setAddr(addr);  
    setAgreed(agreed);
  },[phone, addr, agreed]);


  const handleRemoveFromCart = (id) => {
    dispatch(actions.removePurchase(id));
    dispatch(actions.calculateTotals());
  }



  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (cartItems.length === 0) {
      alert('Вы не выбрали покупок :(');
      return;
    }

    if (phone === '') {
      alert('Заполните телефон!');
      return;
    }
    if (addr === '') {
      alert('Заполните адрес!');
      return;
    }
    if (agreed === false) {
      alert('Согласитесь с правилами доставки!');
      return;
    }

    //console.log('form submit');
    let order = {
      owner: {
        phone: phone,
        address: addr,
      },
      items: cartItems
    }
    //
    // send order to API
    dispatch(sendOrder(order));
    // clear form
    setPhone('');
    setAddr(''); 
    // notification     
    alert('Order saved!');
    // clear cart
    dispatch(actions.clearCart());
    //redirect to main
    navigate('/');
  }

  // -------------------------------------
  return (
    <>
    <Header/>
    <hr/>    

    <main className="container">
      <div className="row">
        <div className="col">
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                
                {/* purchases */}
                { cartItems.map( (item) => {
                  return <tr key={item.purchID}>
                    <td >{item.purchID} ({item.id})</td>
                    
                    <td><Link to={item.prodLink}>{item.title}</Link></td>
                    {/*<td>{item.title}</td>*/}

                    <td>{item.size}</td>
                    <td>{item.count}</td>
                    <td>{item.price}</td>
                    <td>{item.count * item.price}</td>
                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => { handleRemoveFromCart(item.purchID) }}>Удалить</button></td>
                  </tr>                  
                }) }

                {/* total */}
                <tr>
                  <td colSpan="5" className="text-right">Общая стоимость</td>
                  <td>{cartTotal}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>

            <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
              <form className="card-body" onSubmit={(e) => {handleSubmitForm(e)}}>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" 
                    id="phone" 
                    placeholder="Ваш телефон"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" 
                    id="address" 
                    placeholder="Адрес доставки"
                    value={addr}
                    onChange={(e) => { setAddr(e.target.value) }}                    
                  />
                </div>
                <div className="form-group form-check">
                  <input className="form-check-input" 
                    type="checkbox" 
                    id="agreement"
                    value={agreed}
                    onChange={() => { setAgreed(!agreed) }}
                  />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary" onClick={(e) => {handleSubmitForm(e)}}>Оформить</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>

    <Footer/>    
    </>
  )
}


