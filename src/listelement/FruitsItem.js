/**
 * Created by navee on 28/10/2016.
 */

import React, { Component } from 'react';
import './FruitsItem.css';
import '../App.css'

class FruitsItem extends Component {
    constructor() {
        super();
        this.changeQuantityBy = this.changeQuantityBy.bind(this);
    }

    render() {
        return (
            <div className="FruitsItem" onMouseDown={()=>{this.changeQuantityBy(1);}}>
                <div className="FruitsItemImage" style={ { backgroundImage: 'url("' + this.props.item.imageUrl + '")'} }>
                    {
                        <div className="OfferLayout">
                            <div className="RoundedRectangle OfferButton">
                                {
                                    this.props.priceFormatted(this.props.item.priceEach)
                                }
                                {
                                    this.props.item.freeItemsOffer &&
                                        (', ' + this.props.item.freeItemsOffer.numberOfferedInstead + ' for ' + this.props.item.freeItemsOffer.numberToPayFor)
                                }
                            </div>
                        </div>
                    }
                    {
                        this.props.item.quantityChosen>0 && <div className="RoundedRectangle FruitsItemButton" onMouseDown={(e)=> {
                                this.changeQuantityBy(-1);
                                e.stopPropagation();
                            }}>-</div>
                    }
                    {
                        this.props.item.quantityChosen>0 && <div className="RoundedRectangle FruitsItemButton FruitsItemQuantityButton">{this.props.item.quantityChosen}</div>
                    }
                </div>
                <div>
                    {this.props.item.name}
                </div>
            </div>
        );
    }

    changeQuantityBy(number){
        this.props.item.quantityChosen = Math.max(0, (this.props.item.quantityChosen || 0)) + number;
        this.props.updateBasket();
    }
}

export default FruitsItem;
