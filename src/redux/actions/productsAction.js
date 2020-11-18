import * as ActionType from '../constants/productsConstant';

export const actSetProductByCateogry = (category, value) => {
    return {
        type: ActionType.SET_PRODUCT_BY_CATEGORY,
        payload: {
            category_name: category,
            value: value,
        }
    }
}

export const actSetAvailabilityByManufacturer = (manufacturer, value) => {
    return {
        type: ActionType.SET_AVAILABILITY_BY_MANUFACTURER,
        payload: {
            manufacturer_name: manufacturer,
            value: value,
        }
    };
}