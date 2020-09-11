import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import {ProductContext} from './contexts/ProductContext';
import {CartContext} from './contexts/CartContext';
import {NavigationContext} from './contexts/NavigationContext'

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);
	const {Provider} = ProductContext

	const addItem = item => {
		// add the given item to the cart
		setCart([...cart, {...item, id: new Date()}])
	};

	const removeItem = item => {
		const newCart = cart.filter(product => {
			return product.id !== item
		})
		setCart(newCart)
	}
	

	return (
		<div className="App">
			<NavigationContext.Provider value={{cart}}>
				<Navigation />
			</NavigationContext.Provider>

			{/* Routes */}
			<Provider value={{ products, addItem }}>
				<Route exact path="/">
					<Products />
				</Route>
			</Provider>
			<CartContext.Provider value={{ cart, removeItem }}>
			<Route path="/cart">
				<ShoppingCart />
			</Route>
			</CartContext.Provider>
		</div>
	);
}

export default App;
