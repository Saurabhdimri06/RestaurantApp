import React from "react"
import Header from '../components/header'
import Menu from '../components/menu'
import PreviousOrders from '../components/previousOrders'
import Footer from '../components/footer'
import SiteBody from '../components/sitebody'
import '../style.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            isOpen: true,
        }
    }
    handleClose = () => {
        this.setState({
            isOpen : false
        })
    }
    render(){
        return(
            <BrowserRouter>
            <Route path='/' component={ Header } />

            <Switch>
                <Route exact path="/" component={ SiteBody } />
                <Route path='/menu' component={ Menu } />
                <Route path='/orders' component={ PreviousOrders } />
            </Switch>
            <Route path='/' component={ Footer } />
                <div className={`modal-container ${this.state.isOpen === true ? "modal-showing" : "modal-notshowing"}`}>
                <div className="modal-main">
                    <i onClick={this.handleClose} className="close-modal">&#10006;</i>
                    <h1>Hello Customer</h1>
                    <p>There are some Special Offers avilable for YOU.</p>
                    <p>To Check those offer visit order page of out website</p>
                </div>
                </div>
            }
            </BrowserRouter>
        )
    }
}

export default Dashboard