import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import './app-header.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const AppHeader = ({totalPrice}) => {
    return (
        <header className="header">
            <NavLink to='/' className="header__link" >Menu</NavLink>
            <NavLink className="header__link" to="/cartpage/">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {totalPrice} $
            </NavLink>
        </header>
    )
};
const mapStateToProps = ({totalPrice}) => {
    return {
        totalPrice
    }
}
export default connect(mapStateToProps)(AppHeader);