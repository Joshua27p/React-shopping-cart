// feature 1
import React from 'react';
import Cart from './components/cart';
import Filter from './components/filter';
import Products from './components/Products';
import data from "./data.json"
 

class App extends React.Component {
  constructor(){
    super ();
    this.state = {
      products: data.products,
      cartItems: [],
      size: "",
      sort: "",
    };
  }
  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    this.setState({
    cartItems:  cartItems.filter((x)=>x._id !== product._id),
  });
  };

  addToCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    let alreadyIncart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id){
        item.count++;
        alreadyIncart = true;
      }
    });
    if(!alreadyIncart){
      cartItems.push({...product, count: 1})
    }
    this.setState({cartItems});

  };
sortProducts = (event) => {
  // implement
  const sort =  event.target.value;
  console.log(event.target.value);
  this.setState(state => ({
    sort: sort,
    products: this.state.products.slice().sort((a,b) =>
      sort ==="lowest"
      ? a.price > b.price
      ? 1
      :-1
      : sort === "highest"
      ? a.price < b.price
        ? 1
        :-1
      : a._id > b._id
      ? 1
      :-1
    ),
  }));
}

filterProducts = (event) => {
  //implement
  console.log(event.target.value);
  if(event.target.value === ""){
    this.setState({size: event.target.value, products:data.products});
  }else{
  this.setState({
    size: event.target.value,
    products:data.products.filter(product => product.availableSizes.indexOf(event.target.value)>=0
    ),
  });
  }

}
  render() {
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
      <div className="content">
        <div className="main"> 
          <Filter count={this.state.products.length}
            size={this.state.size}
            sort={this.state.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts}

          ></Filter>
          <Products products={this.state.products} addToCart={this.addToCart}></Products>
         </div>
        <div className="sidebar">
          <Cart cartItems={this.state.cartItems}
          removeFromCart={this.removeFromCart} />
        </div>
      </div>
      </main>
      <footer>
        All right is reserver
      </footer>
    </div>
    );
  }
}

export default App;
