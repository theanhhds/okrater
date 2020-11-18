import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { actSetProductByCateogry } from '../redux/actions/productsAction';

import NavBar from './NavBar';
import Listing from './List';
import ScrollToTop from './scroll';
import HomePage from './HomePage';
import ErrorPage from './ErrorPage';
function Main(props){

    const productTypes = ["jackets", "shirts", "accessories"];
    
    //Get a list of product by category
    const getProduct = (product) =>{
        axios({
            method: 'get',
            url: 'https://bad-api-assignment.reaktor.com/products/' + product,
            headers: {
                'Content-Type': 'application/json',
                // 'x-force-error-mode': 'all'
            },
        }).then((result)=>{
            return result.data
        }).then((data)=>{
            if (data.length != 0){
                props.setProductByCateogry(product, data);
            }
        });
    }

    //Run this effect when componentDidMount
    useEffect(()=>{
        productTypes.forEach((item, index) => {
            getProduct(item);
        });
    }, []);

    return(
        <div className="">
            <BrowserRouter>
                <NavBar/>
                <br/><br/>
                <ScrollToTop>
                <Switch>
                    <Route path='/' exact component={HomePage} />
                    <Route path='/jackets' exact>
                        <Listing category="jackets" />
                    </Route>
                    <Route path='/shirts' exact>
                        <Listing category="shirts" />
                    </Route>
                    <Route path='/accessories' exact>
                        <Listing category="accessories" />
                    </Route>
                    <Route component={ErrorPage} />
                </Switch>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setProductByCateogry: (category, value) => {
            dispatch(actSetProductByCateogry(category, value));
        }
    }
}

export default connect(null, mapDispatchToProps)(Main);