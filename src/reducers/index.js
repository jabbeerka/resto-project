
const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [], 
    totalPrice: 0,
    orderIsSended: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "MENU-LOADED" :
            return {
                ...state,
                menu: action.payload,
                loading: false
            }
        case "MENU-LOADING" :
            return {
                ...state,
                loading: true
            }
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            }
        case "MENU-ERROR" :
            return {
                ...state,
                error: true,
                loading:false
            }
        case "ADD_TO_CARD" :
            const id = action.payload
            const itemInd = state.items.findIndex(item => item.id === id);      //Проверяем , если уже в нашем state есть такой индекс
            if (itemInd >= 0) {
                const itemInState = state.items.find(el => el.id === id);       // Ищем внутри массива товар с данным ID
                const newItem = {                                               //создаем новый товар и плюсуем количество
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }
                return {
                    ...state,
                    items: [                                   // 1 создаем копию массива не включая данный индекс товара
                        ...state.items.slice(0, itemInd),    // 2 добавляем новый товар 
                        newItem,                            // создаем 2 часть копию массива без индекса
                        
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }
            }
            const item = state.menu.find(el => el.id === id);       // ищем совпадение по ID
            const newItem = {                                       //создаем новый экземпляр с найденным товаром
                title: item.title,
                url: item.url,
                category: item.category,
                price: item.price,
                id: item.id,
                qtty: 1
            }
            return {
                ...state,
                items: [...state.items, newItem],
                totalPrice: state.totalPrice + newItem.price,
                orderIsSended: false
            }
        case "ITEM-REMOVE-FROM-CARD" :                      //ID которого нужно удалить
            const idx = action.payload                      // проверка если action.event указан "one" находим этот элемент с ID
            if (action.event === "one") {
                const itemInState = state.items.find(el => el.id === idx);          // если количество этого элемента всего 1
                    if (itemInState.qtty === 1) {
                        return {
                            ...state,
                        items: [                                        // создаем копию массива без idx
                            ...state.items.filter(item => item.id !== idx)
                        ],
                        totalPrice: state.totalPrice - itemInState.price
                        }
                    }
                    const newItem = {                      // если элементов больше 1 го создаем объект с правильным количеством
                        ...itemInState,
                        qtty: --itemInState.qtty
                    }
                    return {
                        ...state,
                        items: [
                            ...state.items.filter(item => item.id !== idx),
                            newItem
                        ],
                        totalPrice: state.totalPrice - itemInState.price
                    }
            }
            const idr = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idr)
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];
            return {
                ...state, 
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ], 
                totalPrice: state.totalPrice - price
            }
        case "SEND-ORDER-TO-SERVER":                    // после отправки заказа на сервер, обнуляем items и totalPrice
            return {
                ...state,
                items: [],
                orderIsSended: true,
                totalPrice: 0
            }
        default:
            return state;
    }
}

export default reducer;