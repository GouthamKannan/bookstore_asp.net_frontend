import React from 'react';

// Cart component
class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            subtotal : 0,
            shipping : 0,
            tax : 0,
            total : 0
        }
        this.handleCheckout = this.handleCheckout.bind(this)
    }

    // Get the cart details
    get_cart_details() {
        var rows = []
        var total = 0

        // Add all products in the cart
        for (var i=0; i<this.props.cart.length; i++) {
            total += this.props.cart[i].amount
            rows.push(
                <>
                    <tr>
                        <th scope="row">
                        <div className="p-2">
                            <img src={this.props.cart[i].image} alt="" width="70" className="img-fluid rounded shadow-sm" />
                            <div className="ms-3 d-inline-block align-middle">
                            <h5 className="mb-0"> <p href="#" className="text-dark d-inline-block align-middle">{this.props.cart[i].name}</p></h5>
                            </div>
                        </div>
                        </th>
                        <td className="align-middle"><strong><i class="fa fa-inr"></i>{this.props.cart[i].price}</strong></td>
                        <td className="align-middle"><strong>{this.props.cart[i].quantity}</strong></td>
                        <td className="align-middle"><strong><i class="fa fa-inr"></i>{this.props.cart[i].amount}</strong></td>
                    </tr>
                </>
            )
        }

        // Calculate the total amount
        this.state.subtotal = Math.round((total) * 100) / 100
        this.state.shipping = Math.round((0.1*total) * 100) / 100
        this.state.tax = Math.round(( 0.08*total) * 100) / 100
        this.state.total = Math.round((1.18*total) * 100) / 100
        return rows;
    }

    // Checkout button
    handleCheckout = async() => {
        if(this.props.cart.length>0) {
            await this.props.onCheckoutButtonClick();
        }
        else{
            alert("Cart is empty")
        }
    }

  render()
  {
    return (
        <div className="cart">

         <section className="py-5 background">
                <div className="container px-4 px-lg-5 my-5">
                <div className="row">
                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

                    <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">Product</div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Price</div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Quantity</div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Amount</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.get_cart_details()}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
                <div className="row py-5 p-4 bg-white rounded shadow-sm mx-100">
                <div className="col-lg-12">
                    <div className="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Order summary </div>
                    <div className="p-4">
                    <p className="mb-4"><em>Shipping and additional costs are calculated based on values you have entered.</em></p>
                    <ul className="list-unstyled mb-4">
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong><i class="fa fa-inr"></i>{this.state.subtotal}</strong></li>
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong><i class="fa fa-inr"></i>{this.state.shipping}</strong></li>
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax (8%)</strong><strong><i class="fa fa-inr"></i>{this.state.tax}</strong></li>
                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                        <h5 className="fw-bold"><i class="fa fa-inr"></i>{this.state.total}</h5>
                        </li>
                    </ul><button onClick={this.handleCheckout} className="btn btn-dark rounded-pill py-2 d-md-block">Procceed to checkout</button>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>

    )
  }
}
export default Cart;