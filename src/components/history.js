import React from 'react';
import configs from '../config'

// Booking History component
class History extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order_history : []
        }
    }

    // Get the total amount from the order history
    get_total(order_data) {

        // calculate total
        var total = 0
        for (var i=0; i<order_data.length; i++) {
            total += order_data[i].amount
        }

        return (
            <>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong><i class="fa fa-inr"></i>{total}</strong></li>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong><i class="fa fa-inr"></i>{Math.round((0.1*total) * 100) / 100}</strong></li>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax (8%)</strong><strong><i class="fa fa-inr"></i>{Math.round((0.08*total) * 100) / 100}</strong></li>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                <h5 className="fw-bold"><i class="fa fa-inr"></i>{Math.round((1.18*total) * 100) / 100}</h5>
                </li>
            </>
        )
    }

    // Construct the HTML tags of the order history
    get_order_history() {
        var orders = []
        for(var i=0; i<this.state.order_history.length; i++)
        {
            orders.push(
                <>
                <tr>
                    <div className="cart" style={{"background-color" : "silver"}}>
                    <section className="py-5">
                        <div className="container px-4 px-lg-5 my-5">
                        <div className="row">
                        <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                        <span>Date : {String(this.state.order_history[i].date).substring(0, 10)}</span><br/>
                        <span>Time : {String(this.state.order_history[i].date).substring(11, 19)}</span>
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
                                    {this.get_cart_details(this.state.order_history[i].cart)}
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
                                {this.get_total(this.state.order_history[i].cart)}
                            </ul></div>
                        </div>
                        </div>
                    </div>
                    </section>
                    </div>

                </tr>
                <br></br>
                </>
            )
        }
        return orders;
    }

    componentDidMount = async() => {

        // Get the order history from the database using API
        var response = await fetch(configs.api_url + "/product/get_history", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              user_name : this.props.user_name
          })
        })
        var data = JSON.parse(await response.json())
        console.log(data)
        data.data = JSON.parse(data.data)
        //data.data.cart = JSON.parse(data.data.cart)
        data.data.forEach(element => {
            element.cart = JSON.parse(element.cart)
        });
        console.log(data)
        // store the order history in state
        this.setState({
            order_history : data.data
        })
    }

    // Get the table of products in the order history
    get_cart_details(order_data) {
        var rows = []
        for (var i=0; i<order_data.length; i++) {
            rows.push(
                <>
                    <tr>
                        <th scope="row">
                        <div className="p-2">
                            <img src={order_data[i].image} alt="" width="70" className="img-fluid rounded shadow-sm" />
                            <div className="ms-3 d-inline-block align-middle">
                            <h5 className="mb-0"> <span href="#" className="text-dark d-inline-block align-middle">{order_data[i].name}</span></h5>
                            </div>
                        </div>
                        </th>
                        <td className="align-middle"><strong><i class="fa fa-inr"></i>{order_data[i].price}</strong></td>
                        <td className="align-middle"><strong>{order_data[i].quantity}</strong></td>
                        <td className="align-middle"><strong><i class="fa fa-inr"></i>{order_data[i].amount}</strong></td>
                    </tr>
                </>
            )
        }
        return rows;
    }

  render()
  {
    return (
        <div className="table-responsive background" style={{"width" : "100%"}}>
            <br></br>

            {(this.state.order_history.length==0) && <div className="search-bar text-center text-white"><p style={{"width" : "100%", "alignContent" : "center"}}>No orders found</p></div>}
            {
                (this.state.order_history.length>0) &&
                <>
                <table style={{"width" : "90%", "margin-left" : "auto", "margin-right" : "auto"}}>
                    <tbody>
                        {this.get_order_history()}
                    </tbody>
                </table>
                </>
            }
        </div>

    )
  }
}
export default History;