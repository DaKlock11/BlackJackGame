import React, { useState, useEffect } from 'react';
import './hand.css';

const Hand = ({playersHand}) => {

        return (
            <div className="player-hand">
                <div>Your Hand</div>
                <div className="cardHandler">
                  {playersHand.map((c) => {
                       <img src={c["image"]} key={c["image"]} alt="Card" />;
                    })}
                </div>
            </div>
        )
}

export default Hand;