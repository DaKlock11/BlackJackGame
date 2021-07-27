import React, { useState, useEffect } from 'react';
import './hand.css';

const drawButton = ({ draw, isDisabled }) => {

    let CardHolder_URL = 'https://raw.githubusercontent.com/PTR-KLK/oko-card-game/master/src/back.png'

    const CardHolder = () => {
        fetch(CardHolder_URL)
    }

    return (
       <figure>
            <button className="playHandDrawCard" onClick={draw} disabled={isDisabled}>
                <img src={CardHolder} alt="Hidden Card" />
            </button>
       </figure> 
        
    )
}

const Hand = ({playersHand, drawCards}) => {


    return (
        <div className="Hand">
            <div>Your Hand</div>
            {playersHand.draws === 0 ? (
                <drawButton draw={() => drawCards(2)} />
            ) : (
                <drawButton draw={() => drawCards(1)} />
            )}
            
            <div className="cardHandler">
                {playersHand.cards.map((playersHand) => {
                    return (
                        <div key={playersHand.code}>
                            <img src={playersHand.image} alt={`${playersHand.suit} ${playersHand.value}`}  />
                        </div>
                    )
                    
                })}
            </div>
        </div>
    )
}

export default Hand;