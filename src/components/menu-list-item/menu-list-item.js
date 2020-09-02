import React from 'react';
import './menu-list-item.scss';
import meat from '../../imgs/meat.png';
import salads from '../../imgs/salads.png';
import pizza from '../../imgs/pizza.png';
import { Link } from 'react-router-dom';

const MenuListItem = ({ menuItem, onAddToCard }) => {
    const { title, price, category, url, id } = menuItem;
    return (
        <>
            <li className="menu__item">
                <div className="menu__title">{title}</div>
                <Link to={`/${id}`}><img className="menu__img" src={url} alt={title}></img></Link>
                <div className="menu__category">Category: <span>{category}</span></div>
                {category === "pizza" ? <img className="menu__category_icon" src={pizza} alt="pizz"/> : null }
                {category ==="meat" ? <img className="menu__category_icon" src={meat} alt="meat"/>  : null}
                {category ==="salads" ? <img className="menu__category_icon" src={salads} alt="salad"/>  : null}
                <div className="menu__price">Price: <span>{price}</span></div>
                <button onClick={()=> onAddToCard(id)} className="menu__btn">Add to cart</button>
            </li>
        </>
    )
}

export default MenuListItem;