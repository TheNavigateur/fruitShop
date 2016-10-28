/**
 * Created by navee on 28/10/2016.
 */

import React, { Component } from 'react';
import './Basket.css';
import '../App.css';

class Basket extends Component {
    render() {
        return (
            <div className="Basket">
                <div className="BasketHeading"><div className="BasketTitle">Your basket</div></div>
                <div className="BasketTable">
                    <div className="BasketItems">
                        {
                            this.props.basketData.basketItems && this.props.basketData.basketItems.map(
                                basketItem => (
                                    <div className="BasketItem" key={basketItem.item.name}>
                                        {basketItem.offerScoredMessage && <span className="RoundedRectangle OfferScored">{basketItem.offerScoredMessage}</span>}
                                        {basketItem.item.quantityChosen} x {basketItem.item.name}
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div className="BasketPrices">
                        {
                            this.props.basketData.basketItems && this.props.basketData.basketItems.map(
                                basketItem => (
                                    <div key={basketItem.item.name}>{this.props.priceFormatted(basketItem.totalPriceForItem)}</div>
                                )
                            )
                        }
                    </div>
                </div>

                <div className="BasketTotalPricePanel">
                    <div className="BasketTotalPriceLabel">Total price</div>
                    <div className="BasketTotalPriceAmount">
                        {this.props.priceFormatted(this.props.basketData.totalPrice)}
                    </div>
                </div>

            </div>
        );
    }
}

export default Basket;