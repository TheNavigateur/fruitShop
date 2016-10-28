
import React, { Component } from 'react';
import FruitsItem from '../listelement/FruitsItem';
import './FruitsGallery.css';

class FruitsGallery extends Component {
    render() {
        return (
            <div className="FruitsGallery">
                {
                    this.props.items.map(
                        item => (
                            <FruitsItem item={item} key={item.name} updateBasket={this.props.updateBasket} priceFormatted={this.props.priceFormatted}/>
                        )
                    )
                }
            </div>
        );
    }
}

export default FruitsGallery;
