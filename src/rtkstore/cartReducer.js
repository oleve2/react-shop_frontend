import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const initState = () => {
  let ls = localStorage.getItem('bn_cart');
  //console.log('ls=', ls);  
  if (ls !== undefined) {
    return JSON.parse(ls)
  } else {
    return {  
      items: [],
      totalSum: 0,
      totalCnt: 0,
      purchID: 1,
    }
  }
}

const initialState = initState(); 

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState: initialState,
  reducers: {
    upGetPurchID(state, action) {
      state.purchID = state.purchID +1;
    },

    addPurchase(state, action) {
      let newPurch = action.payload;
      console.log('newPurch=', newPurch);
      let flgFound = false;

      for(let i=0; i<state.items.length; i++) {
        let elem = state.items[i];
        if ((state.items[i].size === newPurch.size) && (elem.sku === newPurch.sku)) {
          console.log('found!', state.items[i].count, newPurch.count );
          flgFound= true;
          state.items[i].count += newPurch.count;
          toLS(state);
        }
      }

      if (!flgFound) {
        console.log('not found');
        state.items.push( {...action.payload, purchID: state.purchID} );
        toLS(state);
      }
    },

    removePurchase(state, action) {
      let removeId = action.payload; // purchID
      let itemsMod = state.items;
      itemsMod = itemsMod.filter((item) => {
        return item.purchID !== removeId;   // purchID
      })
      state.items = itemsMod;
      toLS(state);
    },

    calculateTotals(state, action) {
      let sum = 0;
      let count = 0;
      state.items.forEach( (elem) => {
        sum += Number(elem.count) * Number(elem.price);
        count += Number(elem.count);
      });
      state.totalSum = sum;
      state.totalCnt = count;
      toLS(state);
    },

    clearCart(state, action) {
      state.items = [];
      state.totalSum = 0;
      state.totalCnt = 0;
      state.purchID = 1;
      toLS(state);
    },

    setStateFromLS(state, action) {
      state = action.payload;
    }

  }
})

export const actions = cartReducer.actions;
export default cartReducer.reducer;


export const toLS = (obj) => {
  localStorage.setItem('bn_cart', JSON.stringify(obj));
}




export const loadStateFromLS = () => async (dispatch) => {
  let ls = localStorage.getItem('bn_cart');
  //console.log('ls=', ls);
  dispatch(actions.setStateFromLS(JSON.parse(ls)));
}

export const sendOrder = (orderObj) => async (dispatch) => {
  let resp = await fetch(BASE_URL + '/api/order', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify(orderObj)
  })
  if (!resp.ok) {
    throw new Error(resp.statusText);
  } else {
    console.log('order saved');
  }
}
