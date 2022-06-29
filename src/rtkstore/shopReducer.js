import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  itemsLoading: false,
  itemsError: null,
  items: [],
  itemsCnt: 0,

  topSalesLoading: false,
  topSalesError: null,
  topSales: [],
  
  categoriesLoading: false,
  categoriesError: null,
  categories: [],
  categorySelected: 0,

  // search + categories
  itemsFilt2: [],
  filt2Offset: 0,
  searchStore: '',
}


const shopReducer = createSlice({
  name: 'shopReducer',
  initialState: initialState,
  reducers: {
    // categries ----------------------------
    setCategories(state, action) { 
      state.categories = action.payload;
    },
    categoriesLoading(state, action) {
      state.categoriesLoading = action.payload;
    },
    categogiesError(state, action) { //1
      state.categoriesError = action.payload;
    },
    // items ----------------------------
    setItems(state, action) {
      state.items = action.payload;
    },
    itemsLoading(state, action) {
      state.itemsLoading = action.payload;
    },
    setItemsCnt(state, action) {
      state.itemsCnt = state.items.length;
    },
    itemsError(state, action) { //1
      state.itemsError = action.payload;
    },    
    // items search + offset ----------------------------
    appendOffsetItems(state, action) {
      let newPortion = action.payload;
      state.items = [...state.items, ...newPortion];
    },
    setItemsFilt2(state, action) {
      state.itemsFilt2 = action.payload;
    },
    addItemsFilt2(state, action) {
      let newPortion = action.payload;
      state.itemsFilt2 = [...state.itemsFilt2, ...newPortion];
    },
    updateFil2t2Offset(state, action) {
      state.filt2Offset = state.itemsFilt2.length;
    },
    setSearchStore(state, action) {
      state.searchStore = action.payload;
    },
    // top-sales ----------------------------
    setTopSales(state, action) {
      state.topSales = action.payload;
    },
    topSalesLoading(state, action) {
      state.topSalesLoading = action.payload;
    },
    topSalesError(state, action) { //1
      state.itemsError = action.payload;
    }
    // ----------------------------
  }
})

export const actionsShopReducer = shopReducer.actions;
export default shopReducer.reducer;

// ссылка для перехода на страницу товара
function AddLink(data) {
  let data2 = data.map( (item) => {
    return {...item, prodLink: `/product/${item.id}`}
  });
  return data2;
}

// categories
export const fetchCategories = () => async (dispatch) => {
  dispatch(actionsShopReducer.categoriesLoading(true));
  try {
    let resp = await fetch(BASE_URL + '/api/categories');
    let data = await resp.json();
    dispatch(actionsShopReducer.setCategories(data));
    dispatch(actionsShopReducer.categoriesLoading(false));
  } catch(e) {
    dispatch(actionsShopReducer.categoriesLoading(false));
    dispatch(actionsShopReducer.categogiesError(e.message));
  }
}

// top sales
export const fetchTopSales = () => async (dispatch) => {
  dispatch(actionsShopReducer.topSalesLoading(true));
  try {
    let resp = await fetch(BASE_URL + '/api/top-sales');
    let data = await resp.json();
  
    let dataWithlink = AddLink(data);  
    dispatch(actionsShopReducer.setTopSales(dataWithlink));
    dispatch(actionsShopReducer.topSalesLoading(false));
  } catch (e) {
    dispatch(actionsShopReducer.topSalesLoading(false));
    dispatch(actionsShopReducer.topSalesError(e.message));
  }

}

// items (common)
export const fetchItems = () => async (dispatch) => {
  dispatch(actionsShopReducer.itemsLoading(true));
  try {
    let resp = await fetch(BASE_URL + '/api/items');
    let data = await resp.json();
    
    let dataWithlink = AddLink(data);  
    dispatch(actionsShopReducer.setItems(dataWithlink));         // original
    dispatch(actionsShopReducer.setItemsFilt2(dataWithlink));    // filtered
    dispatch(actionsShopReducer.updateFil2t2Offset())
    
    dispatch(actionsShopReducer.setItemsCnt());
    dispatch(actionsShopReducer.itemsLoading(false));
  } catch (e) {
    dispatch(actionsShopReducer.itemsLoading(false));
    dispatch(actionsShopReducer.itemsError(e.message));
  }

}

// items (load more)
export const fetchItemsOffset = (offset) => async (dispatch) => {
  dispatch(actionsShopReducer.itemsLoading(true));
  try {
    let resp = await fetch(BASE_URL + `/api/items?offset=${offset}`);
    let data = await resp.json();
  
    let dataWithlink = AddLink(data);  
    dispatch(actionsShopReducer.appendOffsetItems(dataWithlink))
    dispatch(actionsShopReducer.setItemsCnt());
    dispatch(actionsShopReducer.itemsLoading(false));
  } catch (e) {
    dispatch(actionsShopReducer.itemsLoading(false));
    dispatch(actionsShopReducer.itemsError(e.message));
  }

}

export const fetchByFiters = (q, categObj, offset) => async (dispatch) => {
  dispatch(actionsShopReducer.itemsLoading(true));
  let resp = await fetch(BASE_URL + `/api/items?q=${q}&categoryId=${categObj.id}&offset=${offset}`);
  let data = await resp.json();  
  
  let dataWithlink = AddLink(data);  
  // repalce or add - by offset (=0 or !=0)
  if (offset === 0) {
    dispatch(actionsShopReducer.setItemsFilt2(dataWithlink))
  } else {
    dispatch(actionsShopReducer.addItemsFilt2(dataWithlink))
  }
  dispatch(actionsShopReducer.updateFil2t2Offset());
  dispatch(actionsShopReducer.itemsLoading(false));
}


export const initFetch = () => async (dispatch) => {
  dispatch(fetchCategories());
  dispatch(fetchTopSales());  
  dispatch(fetchItems());
}
