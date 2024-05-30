import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface CartItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

interface CartProps {
  cartItems: CartItem[];
  onClose: () => void;
  onRemove: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onClose, onRemove }) => {
  return (
    <div className="fixed top-0 right-0 bg-white shadow-lg w-80 h-full p-4 z-50">
      <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-4">
              <div>
                <p>{item.name}</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
              <button onClick={() => onRemove(index)} className="text-red-600">&times;</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
