import React from "react"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import axios from 'axios'
import '../cart.css'


class Menu extends React.Component{
    constructor(){
        super()
        this.state = {
            menu : [],
            isloaded: false,
            count: 0,
            cart: [],
            cartTotal: 0,
            orders: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:1337/menus`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
                this.setState({
                    isloaded: true,
                    menu: json
                })
            })
        }

    handleClickAdd = (e) => {
        let menuId = e.target.parentNode.parentNode.id;
        console.log(menuId);
        this.state.menu.map((menuItem, index) => {
            if(menuItem.id == menuId){
                let menu = [...this.state.menu];
                console.log("item found" + menuItem.id);
                let item = {...menu[index]};

                item.Qty === null ? item.Qty = 1 : item.Qty += 1;
                console.log("new qty" + item.Qty)
                menu[index] = item;
                this.setState({menu})
            }
        } )
    }
    
    handleClickRemove = (e) => {
        let menuId = e.target.parentNode.parentNode.id;
        console.log(menuId);
        this.state.menu.map((menuItem, index) => {
            if(menuItem.id == menuId){
                let menu = [...this.state.menu];
                console.log("item found" + menuItem.id);
                let item = {...menu[index]};

                item.Qty === 0 ? item.Qty = 0 : item.Qty -= 1;
                console.log("new qty" + item.Qty)
                menu[index] = item;
                this.setState({menu})
            }
        } )
    }

    handleSubmitToCart = (e) => {
        console.log("working");
        console.log(e.target);
        let foundincart = false;
        this.state.cart.length > 0 && this.state.cart.map((cartItem, index) => {
            if(cartItem.id == e.target.id){
               foundincart = true;
        }})
        foundincart ?
        this.state.cart.map((cartItem, index) => {
            if(cartItem.id == e.target.id){
                let cart = [...this.state.cart];
                console.log("item found" + cartItem.id);
                let item = {...cart[index]};
        
                item.Qty === 0 ? item.Qty = 0 : item.Qty += 1;
                item.Total =  item.Price*item.Qty;
                console.log("new qty" + item.Qty)
                cart[index] = item;
                this.setState({cart},() => {
                    this.state.cart.map(data => {
                        this.setState({
                            cartTotal: this.state.cartTotal + data.Price
                        })
                    })
                })
        }}) :
        this.state.menu.map(menuItem => {
            if(menuItem.id == e.target.id){
            console.log("id found" + menuItem.Qty);
                if(menuItem.Qty == 0 || menuItem.Qty == null){}
                else{
                    let data = {
                        id: menuItem.id,
                        Item: menuItem.Item,
                        Price: menuItem.Price,
                        Qty: menuItem.Qty,
                        Total: menuItem.Price*menuItem.Qty
                    }
                    console.log(data)
                    this.setState({
                        cart: [...this.state.cart, data],
                    },() => {
                        this.state.cart.map(data => {
                            this.setState({
                                cartTotal: this.state.cartTotal + data.Price
                            })
                        })
                    })
                }
            }
        })
        
    }

    handlePlaceOrder = () => {
        let data = {
            Item: JSON.stringify(this.state.cart),
            Price: this.state.cartTotal
        }
        axios.post('http://localhost:1337/orders', data)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        return(
            <div className="menuwrapper">
                <div className="menucontainer">
                    <br />
                    <table>
                        <tr>
                            <td>Item</td>
                            <td>Price</td>
                        </tr>
                        {this.state.menu === null ? <h1>No Menu to display.</h1> :
                            this.state.menu.map(item => 
                                <tr key={item.id}>
                                    <td>{item.Item}</td>
                                    <td>{item.Price}</td>
                                    <td>
                                        <button id={item.id} onClick = {this.handleClickAdd}><AddCircleIcon /> </button>
                                            {item.Qty === null ? "0" : item.Qty}
                                        <button id={item.id} onClick = {this.handleClickRemove}><RemoveCircleIcon /> </button>
                                        {(item.Qty == null || item.Qty == 0) ? "" : <button id={item.id} onClick = {this.handleSubmitToCart}>ok</button>}
                                    </td>
                                </tr>
                            )
                        }
                    </table>
                </div>
                <div className="cart-container">
                    <div className="heading">
                        <h1>Cart</h1>  
                    </div>
                    <div className="cart transition">
                        <div className="table">
                                <div className="layout-inline row th">
                                    <div className="col col-pro">Product</div>
                                    <div className="col col-price align-center ">Price</div>
                                    <div className="col col-qty align-center">QTY</div>
                                    <div className="col">Total</div>
                                </div>
                            {this.state.cart.map(data => 
                                <div className="layout-inline row">
                                    <div className="col col-pro layout-inline"><p>{data.Item}</p></div>
                                    <div className="col col-price col-numeric align-center "><p>{data.Price}</p></div>
                                    <div className="col col-qty col-numeric align-center "><p>{data.Qty}</p></div>
                                    <div className="col col-total col-numeric align-center"><p>{data.Total}</p></div>
                                </div>
                            ) }
                            </div>         
                    </div>
                    <div className="btn-container">
                        <p>Grand Total : {this.state.cartTotal}</p>
                        <a href="#" onClick={this.handlePlaceOrder} className="btn">Place Order</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu
