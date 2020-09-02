import React from 'react';
import './item-page.scss';
import { connect } from 'react-redux';
import { menuLoaded, onError , menuRequested, addToCard } from '../../actions';
import Spinner from '../spinner';
import WithRestoService from '../hoc'


class ItemPage extends React.Component {
    componentDidMount() {
        const { menuItems, menuRequested, RestoService, menuLoaded, onError} = this.props
        if( menuItems.length === 0){
            menuRequested();
        RestoService.getMenuItems()
            .then(res => {
                menuLoaded(res)
            })
            .catch(onError);
        }
    }
    render() {
        if (this.props.loading) {
            return <Spinner/>
        }
        const item = this.props.menuItems.find(el => +el.id === +this.props.match.params.id);

        const{title, url, price, id, desc} = item;
        return (
            <div className="item">
                <h2 className="item__title">{title}</h2>
                <img className="item__img" src={url} alt="item"/> 
                <span className="item__desc" > {desc} </span>
                <span className="item__price" > {price}$ </span>
                <button onClick={()=> this.props.addToCard(id)} className="item__button" >Add to card</button>
            </div>
        )
    }
}
const MapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = {
    menuLoaded: menuLoaded,
    menuRequested,
    onError,
    addToCard
}
export default WithRestoService()(connect(MapStateToProps, mapDispatchToProps)(ItemPage))