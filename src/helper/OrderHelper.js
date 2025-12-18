export const addToCart = (itemId, type, offerPrice) => {
    const myOrder = localStorage.getItem('myOrder');
    if (myOrder) {
        const myOrderObject = JSON.parse(myOrder);
        const items = myOrderObject.items.filter((item) => item.id === itemId);
        if (items?.length === 1) {
            localStorage.setItem('myOrder', JSON.stringify({
                items: [...myOrderObject.items.filter((item) => item.id !== itemId), {
                    id: itemId,
                    type,
                    offerPrice: items[0].offerPrice,
                    count: items[0].count + 1,
                    order: items[0].order
                }]
            }));

        }
        else {
            const maxOrder = Math.max(...myOrderObject?.items?.map(item => item?.order));

            localStorage.setItem('myOrder', JSON.stringify({
                items: [...myOrderObject.items, {
                    id: itemId,
                    type,
                    offerPrice,
                    count: 1,
                    order: (maxOrder ?? 0) + 1
                }]
            }));
        }

    }
    else {
        localStorage.setItem('myOrder', JSON.stringify({
            items: [{
                id: itemId,
                type,
                offerPrice,
                count: 1,
                order: 1
            }]
        }));
    }
}

export const removeFromCart = (itemId, type) => {
    const myOrder = localStorage.getItem('myOrder');
    if (myOrder) {
        const myOrderObject = JSON.parse(myOrder);
        const items = myOrderObject.items.filter((item) => item.id === itemId);
        if (items?.length === 1) {
            if (items[0].count > 1) {
                localStorage.setItem('myOrder', JSON.stringify({
                    items: [...myOrderObject.items.filter((item) => item.id !== itemId), {
                        id: itemId,
                        type,
                        offerPrice: items[0].offerPrice,
                        count: items[0].count - 1,
                        order: items[0].order
                    }]
                }));
            }
            else {
                if (myOrderObject.items.filter((item) => item.id !== itemId)?.length > 0) {
                    localStorage.setItem('myOrder', JSON.stringify({
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