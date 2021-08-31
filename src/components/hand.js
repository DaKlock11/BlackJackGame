import React, { useState, useEffect } from 'react';
import './hand.css';

const Hand = ({owner, playHand}) => {   
        return (
            <div className="player-hand">
                <div className="text">Your Hand</div> 
                <div className="cardHandler">
                  {playHand.map((c) => {
                       return <img className="cards" src={c["image"]} key={c["code"]} alt="Card" />;
                    })}
                </div>
            </div>
        )
}

export default Hand;