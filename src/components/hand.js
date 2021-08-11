import React, { useState, useEffect } from 'react';
import './hand.css';

const drawButton = ({ draw, isDisabled }) => {

    let CardHolder_URL = 'https://raw.githubusercontent.com/PTR-KLK/oko-card-game/master/src/back.png'

    const CardHolder = () => {
        fetch(CardHolder_URL)
    }

    return (
       <figure>
            <button className="playHandDrawCard" disabled={isDisabled}>
                <img src={CardHolder} alt="Hidden Card" />
            </button>
       </figure> 
        
    )
}

const Hand = (playersHand, dealersHand, drawCard) => {
    

    return (
        <div className="Hand">
            <div>Your Hand</div>
            <div className="cardHandler">
              {/*}  {playersHand.map( card => {
                   return <img src={card.image} key={card.code} alt="Card" />;
                })} */}
            </div>
        </div>
    )
}

export default Hand;