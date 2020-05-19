import React from 'react'
import axios from 'axios'

class PreviousOrders extends React.Component{
    constructor(){
        super()

        this.state = {
            orders : [],
            isloaded : false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:1337/orders')
            .then(response => {
                console.log(response.data)
                this.setState({
                    orders: response.data,
                    isloaded: true
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div>
                {this.state.orders === null ? <h1>Looks Like its Your First Order</h1> : 
                this.state.orders.map((item, index) => ( 
                    <div className='orderDisplay'>
                        <div className="card">
                            <div className="card-body">
                                <h3>Order : {item.id}</h3>
                                <table className="orderList">
                                <tr>
                                        <td>Item</td>
                                        <td>Price</td>
                                        <td>Qty</td>
                                        <td>Total</td>
                                    </tr> 
                                {JSON.parse(item.Item).map(item => 
                                    <tr>
                                        <td>{item.Item}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.Qty}</td>
                                        <td>{item.Total}</td>
                                    </tr> 
                                )}
                                </table>
                                <p className="orderTotal">Order Total : {item.Price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default PreviousOrders