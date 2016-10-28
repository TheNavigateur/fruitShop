import React, { Component } from 'react';
import FruitsGallery from './composite/FruitsGallery';
import Basket from './composite/Basket';
import logo from './fruits.png';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            items: [
                {
                    name: 'Apples',
                    priceEach: 25,
                    imageUrl: 'http://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Fruit-PNG/Large_Red_Apples_PNG_Clipart.png?m=1375394400'
                },
                {
                    name: 'Oranges',
                    priceEach: 30,
                    imageUrl: 'https://s-media-cache-ak0.pinimg.com/originals/4f/55/db/4f55dbf84e69146105ba90e0e1dec1b1.png'
                },
                {
                    name: 'Bananas',
                    priceEach: 15,
                    imageUrl: 'http://www.pngall.com/wp-content/uploads/2016/04/Banana.png'
                },
                {
                    name: 'Papayas',
                    priceEach: 50,
                    freeItemsOffer: {
                        numberToPayFor: 2,
                        numberOfferedInstead: 3
                    },
                    imageUrl: 'http://3.bp.blogspot.com/-0fEKM74E6Us/UZ0t89yUYOI/AAAAAAAAF8U/lp58zjaZXaw/s1600/green_papayas.png'
                }
            ],
            basketData: {}
        };

        this.updateBasket = this.updateBasket.bind(this);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>The fruit shop</h2>
                    </div>
                    {
                        this.state.basketData.basketItems && this.state.basketData.basketItems.length ?
                            <Basket basketData={this.state.basketData} priceFormatted={this.priceFormatted}/> :
                            null
                    }
                </div>
                <div className="App-intro">
                    <FruitsGallery items={this.state.items} updateBasket={this.updateBasket} priceFormatted={this.priceFormatted}/>
                </div>
            </div>
        );
    }

    priceFormatted(priceInCt){
        return '$' + (priceInCt/100).toFixed( 2 );
    }

    updateBasket(){
        var
            items = this.state.items,
            basketItems =
                items
                    .filter((item)=>item.quantityChosen)
                    .map(
                        (item)=>{
                            var
                                totalPriceForItem = item.quantityChosen * item.priceEach,
                                freeItemsOffer = item.freeItemsOffer,
                                offerScoredMessage
                            ;

                            if(freeItemsOffer){
                                var
                                    numberToPayFor = freeItemsOffer.numberToPayFor||0,
                                    numberOfferedInstead = freeItemsOffer.numberOfferedInstead||0,
                                    numberOfOffersScored = Math.floor(item.quantityChosen/numberOfferedInstead),
                                    numberOfFreeItemsPerOffer = numberOfferedInstead - numberToPayFor,
                                    reductionInPrice = numberOfOffersScored * numberOfFreeItemsPerOffer * item.priceEach
                                ;

                                totalPriceForItem -= reductionInPrice;

                                if(numberOfOffersScored){
                                    offerScoredMessage = (numberOfferedInstead * numberOfOffersScored) + ' for ' + (numberToPayFor * numberOfOffersScored);
                                }
                            }

                            return {
                                item: item,
                                totalPriceForItem: totalPriceForItem,
                                offerScoredMessage: offerScoredMessage
                            }
                        }
                    )
            ,
            totalPrice = basketItems.reduce((previousValue, arrayElement)=>previousValue + arrayElement.totalPriceForItem, 0)
        ;

        this.setState(
            {
                items: items,
                basketData: {
                    basketItems: basketItems,
                    totalPrice: totalPrice
                }
            }
        );
    }

}

export default App;
