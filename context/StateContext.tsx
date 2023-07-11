import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { IProduct } from "../types/product";

interface IContext {
    showCart: boolean;
    cartItems: any;
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    incQty: () => void;
    decQty: () => void;
    onAdd: (product: IProduct, quantity: number) => void;
    toggleCartItemQuantity: (id: string, value: string) => void;
    onRemove: (product: IProduct) => void;
    setCartItems: (products: IProduct[]) => void;
    setTotalPrice: () => void;
    setTotalQuantities: () => void;
}

interface IFoundProduct {
    price: number;
    quantity: number;
}
interface IProps {
    children: JSX.Element;
}

const Context = createContext<any>(null);

export const StateContext = ({ children }: IProps) => {
    const [showCart, setShowCart] = useState<any>(false);
    const [cartItems, setCartItems] = useState<any>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct: IFoundProduct;
    let index;

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };

    const onAdd = (product: IProduct, quantity: number) => {
        const checkProductInCart = cartItems.find((item: IProduct) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            const updatedCartItems: IProduct[] = cartItems.map((cartProduct: IProduct) => {
                if (cartProduct._id === product._id)
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    };
            });

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    };

    const onRemove = (product: IProduct) => {
        foundProduct = cartItems.find((item: IProduct) => item._id === product._id);
        const newCartItems = cartItems.filter((item: IProduct) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    };

    const toggleCartItemQuantity = (id: string, value: string) => {
        foundProduct = cartItems.find((item: IProduct) => item._id === id);
        index = cartItems.findIndex((product: IProduct) => product._id === id);
        const newCartItems = cartItems.filter((item: IProduct) => item._id !== id);

        if (value === "inc") {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === "dec") {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    };

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                onRemove,
                toggleCartItemQuantity,
                setShowCart,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);
