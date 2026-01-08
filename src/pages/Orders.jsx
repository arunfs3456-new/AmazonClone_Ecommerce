import React, { useEffect, useState } from "react";
// Import Feather Icons or use a simple Unicode arrow for the toggle icon
import { ChevronDown, ChevronUp } from 'lucide-react'; // Example using lucide-react (install: npm install lucide-react)

const Orders = () => {
  const [orderedProduct, SetorderedProduct] = useState([]);
  // State to track which order's details are visible. Using an array of Booleans.
  const [detailsVisible, setDetailsVisible] = useState([]);

  useEffect(() => {
    const order_product = JSON.parse(localStorage.getItem("orderedProducts")) || [];
    SetorderedProduct(order_product);
    // Initialize the visibility state: all details start hidden (false)
    setDetailsVisible(new Array(order_product.length).fill(false));
  }, []);

  // Function to toggle the visibility for a specific order by its index
  const toggleDetails = (index) => {
    setDetailsVisible(prev => {
      const newState = [...prev];
      newState[index] = !newState[index]; // Flip the boolean value
      return newState;
    });
  };

  function randomDateTime() {
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const dateStr = `${now.getDate().toString().padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const timeStr = `${displayHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    return `${dateStr} , ${timeStr}`;
  }

  let tax = 100.00;

  return (
    <div className="flex flex-wrap gap-8 pt-8">
      {orderedProduct.map((v, i) => {
        const totalBeforeTax = v.product.price;
        const finalTotal = totalBeforeTax + tax;
        const isVisible = detailsVisible[i]; // Get visibility status for this specific card

        return (
          <div key={i} className="mt-24 overflow-hidden border shadow-lg rounded-xl w-96">
            {/* Product Image and Name (Always visible) */}
            <div className="flex flex-col">
              <div className="p-4 bg-white rounded-t-xl">
                <img 
                  src={v.product.image} 
                  alt={v.product.name} 
                  className="object-contain w-full h-32 mx-auto" 
                />
              </div>

              <div className="p-5 bg-lime-500">
                <div className="text-center text-white">
                  <h3 className="text-xl font-semibold">{v.product.name}</h3>
                  <p className="text-sm">Size UK 10</p>
                </div>
              </div>
            </div>

            {/* TOGGLE HEADER */}
            {/* This replaces the original container2 header and makes it clickable */}
            <div 
              className="flex items-center justify-between p-4 text-white bg-gray-900 border-b-4 border-yellow-400 cursor-pointer"
              onClick={() => toggleDetails(i)}
            >
              <h1 className="text-xl font-bold">Payment Success</h1>
              
              {/* Down/Up Arrow Icon */}
              {isVisible ? (
                  <ChevronUp className="w-6 h-6 transition-transform duration-300" />
              ) : (
                  <ChevronDown className="w-6 h-6 transition-transform duration-300" />
              )}
            </div>

            <div 
              className={`bg-gray-900 text-white px-6 transition-all duration-500 ease-in-out ${
                isVisible ? 'max-h-screen py-4' : 'max-h-0 py-0'
              }`}
            >
              <div className="space-y-3">
                
                {/* Reference Number */}
                <div className="flex items-center justify-between py-2 border-t border-gray-700">
                  <p className="text-sm font-light">Reference Number</p>
                  <p className="text-sm font-medium">{Math.floor(1e12 + Math.random() * 9e12)}</p>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-between py-2 border-t border-gray-700">
                  <p className="text-sm font-light">Date & Time</p>
                  <p className="text-sm font-medium">{randomDateTime()}</p>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between py-2 border-t border-gray-700">
                  <p className="text-sm font-light">Payment Method</p>
                  <p className="text-sm font-medium">{v.paymentMethod}</p>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between py-2 border-t border-gray-700">
                  <p className="text-sm font-light">Subtotal</p>
                  <p className="text-sm font-medium">Rs: {v.product.price}</p>
                </div>

                {/* Tax */}
                <div className="flex items-center justify-between py-2">
                  <p className="text-sm font-light">Tax</p>
                  <p className="text-sm font-medium">Rs: {tax}</p>
                </div>
                
                {/* Divider Line */}
                <span className="block text-lg tracking-widest text-center text-gray-500">
                    - - - - - - - - - - - - - - - - - - - - - - - -
                </span>

                {/* Total */}
                <div className="flex items-center justify-between pt-3 pb-2 text-lg font-bold border-t border-gray-700">
                  <p>Total</p>
                  <p>Rs: {finalTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
          </div>
        );
      })}
    </div>
  );
};

export default Orders;