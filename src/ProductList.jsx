import React, { useState } from 'react'; // Removed useEffect as it wasn't used
import { useDispatch } from 'react-redux'; // Added for Redux
import { addItem } from './CartSlice.jsx'; // Added for Redux - **Adjust path as per your project structure**
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(true); // Default to showing plants, can be controlled by handlePlantsClick
    const [addedToCart, setAddedToCart] = useState({}); // To track added items by plant name

    const dispatch = useDispatch();

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18"
                },
                {
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "$20"
                },
                {
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Easy to care for and effective at removing toxins.",
                    cost: "$17"
                },
                {
                    name: "Aloe Vera Air Purifying", // Differentiated name for key if Aloe Vera appears in multiple categories
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Purifies the air and has healing properties for skin.",
                    cost: "$14"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender Aromatic", // Differentiated name
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: "$18"
                }
                // ... other plants in this category
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                 {
                    name: "Aloe Vera Medicinal", // Differentiated name
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Soothing gel used for skin ailments.",
                    cost: "$14"
                },
                // ... other plants
            ]
        }
        // ... other categories
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Corrected typo: alignIems to alignItems
        fontSize: '20px',
    };
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px', // This might need adjustment for responsiveness
    };
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(false); // Assuming home click might show a different view
        if (onHomeClick) { // Call prop if it exists
             onHomeClick();
        }
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
        setShowPlants(false); // Hide plants when viewing cart
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false); // Hide the cart when navigating to Plants
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(true); // Show plants when continuing shopping
    };

    const handleAddToCart = (plant) => {
        // Convert cost from string (e.g., "$15") to a number
        const numericalCost = parseFloat(plant.cost.replace('$', ''));
        
        const itemToAdd = {
            ...plant,
            cost: numericalCost,
            // id: plant.name // Using name as an identifier as per previous logic for addedToCart state.
                           // Consider adding a unique ID to each plant object in plantsArray for more robust state management if names can duplicate.
        };
        dispatch(addItem(itemToAdd));
        setAddedToCart(prevState => ({
            ...prevState,
            [plant.name]: true // Use plant.name as key
        }));
    };

    // Consolidate all plants into a single list for easier rendering in one grid,
    // but preserve category information if needed for display.
    // Or, map through categories then plants directly in JSX.

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => handleHomeClick(e)} style={{textDecoration: 'none'}}> {/* Added style to remove underline for this <a> */}
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}><h1 className='cart'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68"><rect width="156" height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" id="mainIconPathAttribute"></path></svg></h1></a></div> {/* Corrected stroke-linecap & stroke-linejoin */}
                </div>
            </div>

            {!showCart && showPlants ? ( // Main condition to show plants
                <div className="product-grid-container"> {/* Added a container for potential overall styling/padding */}
                    {plantsArray.map((categoryObj) => (
                        <section key={categoryObj.category} className="category-section">
                            <h2 className="category-title">{categoryObj.category}</h2>
                            <div className="product-grid"> {/* This is where individual plant cards go */}
                                {categoryObj.plants.map((plant) => (
                                    <div key={plant.name} className="product-card"> {/* Using plant.name as key */}
                                        <img src={plant.image} alt={plant.name} className="product-image" />
                                        <div className="product-details">
                                            <h3 className="product-name">{plant.name}</h3>
                                            <p className="product-description">{plant.description}</p>
                                            <p className="product-cost">{plant.cost}</p>
                                            <button
                                                onClick={() => handleAddToCart(plant)}
                                                disabled={addedToCart[plant.name]}
                                                className={`add-to-cart-button ${addedToCart[plant.name] ? 'added' : ''}`}
                                            >
                                                {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            ) : showCart ? ( // Condition to show cart
                <CartItem onContinueShopping={handleContinueShopping} />
            ) : (
                // Fallback or Home Page Content if neither cart nor plants are shown
                // This part depends on what onHomeClick() does or if there's a separate home view
                <div className="home-view-placeholder">
                    {/* Content for when onHomeClick has been triggered and neither cart nor plants are explicitly shown */}
                    {/* Or perhaps onHomeClick navigates away from this component entirely */}
                </div>
            )}
        </div>
    );
}

export default ProductList;