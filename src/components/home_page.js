import { React, Component } from "react";
import Cookies from 'js-cookie';
import Header from "./header";
import Login from "./login";
import Signup from "./signup";
import ItemList from "./item_list";
import Cart from "./cart";
import History from "./history";
import configs from '../config'
import SearchBar from "./search_bar";


// Home Page component
class HomePage extends Component {
  constructor(props) {
    super(props);

    // Initialize the state
    this.state = {
      show_component : "home",
      user_name : "",
      product_list : [],
      show_product_list : [],
      checkout_in_progress : false,
      cart : [],
      product_count : 0
    };
    this.onNavButtonClick = this.onNavButtonClick.bind(this)
    this.onAddToCart = this.onAddToCart.bind(this)
    this.onLoginButtonClick = this.onLoginButtonClick.bind(this)
    this.onCheckoutButtonClick = this.onCheckoutButtonClick.bind(this)
    this.onSearch = this.onSearch.bind(this)
    }

    componentDidMount = async() => {

        // Get the user name from url
        const windowUrl = window.location;
        console.log(windowUrl)
        var message = windowUrl.toString().split('/').pop().replace("?", "").replace("#", "")

        // Display message if redirected from email verified link
        if(message === "email_verified") {
          alert("Your email is verified. Login to your account")
          window.location = "/home"
        }

        // Get the products from the API and store in state
        var response = await fetch(configs.api_url + "/product/get_products", {
        method: "GET",
        credentials: "include"
        })
        var data = JSON.parse(await response.json())
        data.data = JSON.parse(data.data)

        if (data.data.length > 0) {
            this.setState({
              product_list : data.data,
              show_product_list : data.data
            })
        }

        console.log(data.data)

        if(Cookies.get('user_name')) {
          this.setState({user_name : Cookies.get('user_name')})
        }
    }

    // Show component based on clicked button
    onNavButtonClick = async(show_component) => {
        console.log(show_component)

        if(show_component == "logout") {
          Cookies.remove("session_id")

          // Logout using API and show the home page
          const response = await fetch(configs.api_url + "/user/logout", {
            method : "GET",
            credentials: "include",
          })
          this.setState({
            show_component:"home",
            user_name : ""
          })
        }

        else {
            this.setState({show_component:show_component})
        }

    }

    // Add the product to the cart
    onAddToCart(product_details, count) {
      var other_products = this.state.cart.filter((value) => value.name !== product_details.name)
      var existing_product = this.state.cart.filter((value) => value.name === product_details.name)

      // Update the product count
      if(count < 0) {
        if(existing_product.length == 1) {
          this.state.product_count = this.state.product_count - existing_product[0].quantity
          this.state.cart = other_products
          this.setState({
            product_count : this.state.product_count
          })
      }}
      else{
        this.setState({
          product_count : this.state.product_count + count
        })

        // Add new product to empty cart
        if(existing_product.length == 0){
          var new_product = this.state.cart
          new_product.push({
            name : product_details.name,
            price : product_details.price,
            quantity : count,
            amount : product_details.price * count,
            image : product_details.image
          })
          this.setState({
            cart : new_product
          })
        }

        // Add new product to existing products in cart
        else{
          other_products.push({
            name : product_details.name,
            price : product_details.price,
            quantity : count + existing_product[0].quantity,
            amount : product_details.price * (count + existing_product[0].quantity),
            image : product_details.image
          })

          this.setState({
            cart : other_products
          })
          this.state.cart = other_products
        }
      }
    }

    // Place on order from the cart
    place_order = async() => {

      // Store the order in the database
      var response = await fetch(configs.api_url + "/product/place_order", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              user_name : this.state.user_name,
              cart : JSON.stringify(this.state.cart)
          })
      })
      var data = JSON.parse(await response.json())
      this.setState({show_component: "home"})
    }

    // Login the user
    onLoginButtonClick(user_name) {
      console.log(user_name)

      // When redirected from checkout
      if(this.state.checkout_in_progress) {
        this.setState({
          cart : [],
          product_count : 0
        })
        alert("Order placed successfully")

      }

      // Update the user in state
      this.setState({
        user_name: user_name,
        show_component: "home"})
    }

    // Checkout from cart
    onCheckoutButtonClick = async() => {

      // When user is already logged in
      if(this.state.user_name.length > 0){
        await this.place_order();
        this.setState({
          cart : [],
          product_count : 0
        })
        alert("Order placed successfully")
        this.setState({
          checkout_in_progress : false,
          show_component: "home"
        })
      }

      // Redirect to login before placing order
      else{
        alert("Login to place order")
        this.setState({
          checkout_in_progress: true,
          show_component: "login"
        })
      }
    }

    // Update the products based on search string
    onSearch(search_text) {
      if (search_text.length > 0) {
        const product_list = this.state.product_list.filter((value) => value.name.toLowerCase().indexOf(search_text.toLowerCase()) != -1);
        this.setState({show_product_list : product_list})
      }
      else {
        this.setState({show_product_list : this.state.product_list})
      }
    }

    render() {
      if(Cookies.get('session_id')) {
        this.state.user_name = Cookies.get("user_name")
      }
      else{
        this.state.user_name = ""
      }
        return (
          <>
            <Header
                onNavButtonClick = {this.onNavButtonClick} username = {this.state.user_name} product_count = {this.state.product_count} />
            {/* {console.log(this.state.show_component)} */}
            {(this.state.show_component=="home") && <SearchBar onSearch={this.onSearch}/>}
            {(this.state.show_component=="home") && <ItemList product_list={this.state.show_product_list} onAddToCart={this.onAddToCart}/>}
            {(this.state.show_component=="login") && <Login onLoginButtonClick = {this.onLoginButtonClick} />}
            {(this.state.show_component=="signup") && <Signup onNavButtonClick = {this.onNavButtonClick} />}
            {(this.state.show_component=="cart") && <Cart onCheckoutButtonClick = {this.onCheckoutButtonClick} cart = {this.state.cart} />}
            {(this.state.show_component=="history") && <History user_name= {this.state.user_name}/>}
          </>
        )
    }
}

export default HomePage;
