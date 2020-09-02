import React from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import { deleteFromCard, sendOrder, addToCard } from '../../actions';
import WithRestoService from '../hoc'

const CartTable = ({ items, deleteFromCard, RestoService, sendOrder, orderIsSended, addToCard }) => {
    if (orderIsSended) {
        return (<div className="cart__title"> Скоро мы свяжемся с вами :) </div>)
    }
    if( items.length === 0){
        return (<div className="cart__title"> Ваша корзина пуста :( </div>)
    }
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {items.map(item => {
                    const { title, url, price, id, qtty } = item
                    return (
                    <div className="cart__item">
                        <img src={url} className="cart__item-img" alt={title}></img>
                        <div className="cart__item-title">{title}</div>
                        <span onClick={()=>deleteFromCard(id, "one")}>-</span>
                        <div className="cart__item-price">{price}$ * {qtty}</div>
                        <span onClick={()=>addToCard(id)}>+</span>
                        <div onClick={() => deleteFromCard(id)} className="cart__close">&times;</div>
                    </div>
                    )
                })}
            </div>
            <button onClick = {() => {
                RestoService.setOrder(generateOrder(items));
                sendOrder();
                } } className = "order">Оформить заказ</button>
        </>
    );
};
const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder;
}


const mapStateToProps = ({ items, orderIsSended }) => {
    return {
        items,
        orderIsSended
    }
}


export default WithRestoService()(connect(mapStateToProps, { deleteFromCard, sendOrder, addToCard })(CartTable));