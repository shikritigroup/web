export const addToCart = (itemId, type) => {
    const myOrder = localStorage.getItem('myOrder');
    if (myOrder) {
        const myOrderObject = JSON.parse(myOrder);
        const item = myOrderObject.items.filter((item) => item.id === itemId);
        if (item?.length === 1) {
            localStorage.setItem('myOrder', JSON.stringify({
                orderNumber: myOrderObject.orderNumber,
                items: [...myOrderObject.items.filter((item) => item.id !== itemId), {
                    id: itemId,
                    type,
                    count: item[0].count + 1
                }]
            }));

        }
        else {
            localStorage.setItem('myOrder', JSON.stringify({
                orderNumber: myOrderObject.orderNumber,
                items: [...myOrderObject.items, {
                    id: itemId,
                    type,
                    count: 1
                }]
            }));
        }

    }
    else {
        localStorage.setItem('myOrder', JSON.stringify({
            orderNumber: Date.now(),
            items: [{
                id: itemId,
                type,
                count: 1
            }]
        }));
    }
}

export const removeFromCart = (itemId) => {
    const myOrder = localStorage.getItem('myOrder');
    if (myOrder) {
        const myOrderObject = JSON.parse(myOrder);
        const item = myOrderObject.items.filter((item) => item.id === itemId);
        if (item?.length === 1) {
            if (item[0].count > 1) {
                localStorage.setItem('myOrder', JSON.stringify({
                    orderNumber: myOrderObject.orderNumber,
                    items: [...myOrderObject.items.filter((item) => item.id !== itemId), {
                        id: itemId,
                        type: item[0].type,
                        count: item[0].count - 1
                    }]
                }));
            }
            else {
                if (myOrderObject.items.filter((item) => item.id !== itemId)) {
                    localStorage.setItem('myOrder', JSON.stringify({
                        orderNumber: myOrderObject.orderNumber,
                        items: [...myOrderObject.items.filter((item) => item.id !== itemId)]
                    }));
                }
                else {
                    localStorage.removeItem('myOrder');
                }
            }
        }
    }
}

export const getCart = () => {
    const myOrder = localStorage.getItem('myOrder');
    return myOrder ? JSON.parse(myOrder) : {};
}

export const addAddress = ({ name, phone, addressLine1, addressLine2, district, state, pin }) => {
    localStorage.setItem('myAddress', JSON.stringify({ name, phone, addressLine1, addressLine2, district, state, pin }));
}

export const getAddress = () => {
    return localStorage.getItem('myAddress') ? JSON.parse(localStorage.getItem('myAddress')) : {};
}