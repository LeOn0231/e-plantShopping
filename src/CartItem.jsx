import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css'; // Assuming you have this CSS file

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper function to parse cost, handling string ($XX.YY), number, null, and undefined formats
  const parseCost = (cost) => {
    // Explicitly check for null or undefined first
    if (cost === null || cost === undefined) {
        return 0;
    }

    if (typeof cost === 'string') {
      // If it's a string, attempt to remove '$' and parse as float
      // Added a check if the string actually contains '$'
      const numericCost = parseFloat(cost.startsWith('$') ? cost.substring(1) : cost);
      // Check if the result of parseFloat is a valid number
      return isNaN(numericCost) ? 0 : numericCost;
    } else if (typeof cost === 'number') {
      // If it's already a number, just return it
      return cost;
    } else {
      // Handle any other unexpected types gracefully - removed console.warn
      return 0; // Default to 0 for invalid formats
    }
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = parseCost(item.cost);
      // Ensure itemCost is a valid number before multiplication
      if (typeof itemCost === 'number' && !isNaN(itemCost)) {
         return total + itemCost * item.quantity;
      }
      return total; // Add 0 if itemCost is invalid
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    // Prevent default form submission if called from a form
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    // Call the prop function passed from the parent component
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  // Handle checkout - currently just shows an alert
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };


  const handleIncrement = (item) => {
    // Dispatch action to update quantity, increasing by 1
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Dispatch action to update quantity, decreasing by 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1, decrementing means removing the item
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    // Dispatch action to remove the item completely
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
     const itemCost = parseCost(item.cost);
     // Ensure itemCost is a valid number before multiplication
     if (typeof itemCost === 'number' && !isNaN(itemCost)) {
        return (itemCost * item.quantity).toFixed(2);
     }
     return (0).toFixed(2); // Return 0 if itemCost is invalid
  };

  // Render the cart items or a message if the cart is empty
  return (
    <div className="cart-container">
      {/* Display the total amount */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      <div>
        {/* Check if cart is empty and display a message */}
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          // Map over cart items and display each one
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              {/* Use optional chaining ?. to prevent errors if image is null/undefined */}
              {/* Assuming item.image might be an object with a 'url' property or just a string URL */}
              <img className="cart-item-image" src={item.image?.url || item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                {/* Display the original cost, formatting if it's a number */}
                <div className="cart-item-cost">
                    {typeof item.cost === 'number' ? `$${item.cost.toFixed(2)}` : item.cost} each
                </div>

                {/* Quantity controls */}
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    disabled={item.quantity <= 0} // Disable if quantity is 0 or less
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                {/* Display the total cost for this item */}
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>

                {/* Remove item button */}
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                  aria-label={`Remove ${item.name}`} // Accessibility improvement
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Redundant div commented out as total is shown above */}
      {/* <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div> */}

      {/* Action buttons */}
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        {/* Checkout button - calls the handleCheckoutShopping function */}
        <button
            className="get-started-button1"
            onClick={handleCheckoutShopping}
            disabled={cart.length === 0} // Disable checkout if cart is empty
        >
            Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
