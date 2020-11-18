import * as ActionType from '../constants/productsConstant';


// productTypes = ["jackets", "shirts", "accessories"]

const initialState = {
    products_list : {
        
    },
    availability_list: {
       
    },
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionType.SET_PRODUCT_BY_CATEGORY:
            let category = action.payload.category_name;
            let products_value = action.payload.value;
            let products = state.products_list;
            products[category] = products_value;

            return {...state, 
                    products_list: products
            }
        default:
            return {...state}
    }
    return {...state}
}