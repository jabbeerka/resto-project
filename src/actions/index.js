export const menuLoaded = (newMenu) => {
    return {
        type: "MENU-LOADED",
        payload: newMenu
    }
}
export const onLoading = () => {
    return {
        type: "MENU-LOADING"
    }
}
export const onError = () => {
    return {
        type: "MENU-ERROR"
    }
}

export const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED',
    }
}
export const addToCard = (id) => {
    return {
        type: 'ADD_TO_CARD',
        payload: id
    }
}
export const deleteFromCard = (id, event = "") => {
    return {
        type: "ITEM-REMOVE-FROM-CARD",
        payload: id,
        event: event
    }
}
export const sendOrder = (id) => {
    return {
        type: "SEND-ORDER-TO-SERVER",
        payload: id
    }
}