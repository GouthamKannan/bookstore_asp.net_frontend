import { Component } from "react";
import Item from "./item";

// Item List component - display products in cards
class ItemList extends Component {
    constructor(props) {
        super(props)
    }

    // Store the products in Item component
    get_items() {
        var items = []
        if (this.props.product_list.length > 0)
            for(var i=0; i<this.props.product_list.length; i++) {
                items.push(<Item product_details={this.props.product_list[i]} onAddToCart={this.props.onAddToCart}/>)
            }
        else
            items.push(<p className="m-0 text-center text-white">No items found</p>)
        return items;
    }

    render() {
        return(
        <section className="py-5 background">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
                {this.get_items()}
                </div>
            </div>
        </section>
        )
    }
}

export default ItemList;