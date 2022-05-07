import { Component } from "react";

// Item component
class Item extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: 1
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }

    // Handle change in product count
    handleChange = ({ target: { name, value } }) => {
        this.setState({ ...this.state, [name]: value });
      };

    // Add product to cart
    handleAdd() {
        this.props.onAddToCart(this.props.product_details, parseInt(this.state.count))
    }

    // Remove product to cart
    handleRemove() {
        this.props.onAddToCart(this.props.product_details, -1)
    }

    render() {
        return (
        <div className="col mb-5">
            <div className="card h-100">
                <img className="card-img-top" src={this.props.product_details.image} alt="..." />
                <div className="card-body p-4">
                    <div className="text-center">
                    <h5 className="fw-bolder">{this.props.product_details.name}</h5><br></br>
                    <h6>{this.props.product_details.author}</h6><br></br>
                    <i class="fa fa-inr"></i>{this.props.product_details.price}
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center"><input className="text-center mx-3 my-1 w-25" type="number" name="count" value={this.state.count} onChange={evt => this.handleChange(evt)}/></div>
                    <div className="text-center"><button className="btn btn-primary mt-auto" onClick={this.handleAdd}>Add to cart</button></div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center"><button className="btn btn-secondary mt-auto" onClick={this.handleRemove}>Remove from cart</button></div>
                </div>
            </div>
        </div>
        )
    }
}

export default Item