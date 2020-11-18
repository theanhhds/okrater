import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { actSetProductByCateogry, actSetAvailabilityByManufacturer } from '../redux/actions/productsAction';

import NavBar from './NavBar';
import Listing from './List';
import ScrollToTop from './scroll';

function Main(props){

    const productTypes = ["jackets", "shirts", "accessories"];
    const manufacturers = ["xoon", "reps", "nouke", "derp", "abiplos"];

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
            props.setProductByCateogry(product, data);
        });
    }

    //Get a list of availability by manufacturer
    const getAvailability = (manufacturer) =>{
        axios({
            method: 'get',
            url: 'https://bad-api-assignment.reaktor.com/availability/' + manufacturer,
            headers: {
                'Content-Type': 'application/json',
                // 'x-force-error-mode': 'all'
            },
        }).then((result) => {
            return result.data
        }).then((data) => {
            props.setAvailabilityByManufacturer(manufacturer, data.response);
        })
    }

    //Run this effect when componentDidMount
    useEffect(()=>{
        productTypes.forEach((item, index) => {
            getProduct(item);
        });

        manufacturers.forEach((item, index)=>{
            getAvailability(item);
        });
    }, []);

    return(
        <div className="">
            <BrowserRouter>
                <NavBar/>
                <br/><br/>
                <ScrollToTop>
                <Switch>
                    <Route path='/jackets' exact>
                        <Listing category="jackets" />
                    </Route>
                    <Route path='/shirts' exact>
                        <Listing category="shirts" />
                    </Route>
                    <Route path='/accessories' exact>
                        <Listing category="accessories" />
                    </Route>
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
        },

        setAvailabilityByManufacturer: (manufacturer, value) => {
            dispatch(actSetAvailabilityByManufacturer(manufacturer, value))
        }
    }
}

export default connect(null, mapDispatchToProps)(Main);