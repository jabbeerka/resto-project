import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import WithRestoService from '../hoc';
import { menuLoaded, onLoading, onError, addToCard } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';
import './menu-list.scss';
import { connect } from 'react-redux';

class MenuList extends Component {
    componentDidMount() {
        const { RestoService, menuLoaded, onError, onLoading } = this.props
        onLoading()
        RestoService.getMenuItems()
            .then(res => {
                menuLoaded(res)
            })
            .catch(onError);
    }
    render() {
        const load = this.props.loading ? <Spinner/> : null;
        const { menuItems, error, addToCard } = this.props;
        const content = (!error) ? <View menuItems={menuItems} addToCard={addToCard}/> : <Error/>;
        return (
            <>
            {load}
            {content}
            </>
        )
    }
};
const View = ({ menuItems, addToCard }) => {
    return (
        <ul className="menu__list">
            {menuItems.map(item => {
                return <MenuListItem key={item.id} menuItem={item} onAddToCard={(id)=> addToCard(id)} />
            })
            }
        </ul>
    )
}

const MapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
};


export default connect(MapStateToProps, { menuLoaded, onLoading, onError, addToCard })(WithRestoService()(MenuList));