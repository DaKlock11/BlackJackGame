import React, { useState, useEffect } from 'react';
import './hand.css';

const Hand = props => {

    const { items } = props;


    return (
        <div className="Hand">
            <div>Your Hand</div>
            <div className="cardHandler">
                {items.map((playersHand) => {
                    return (
                        <div>
                            <img src={playersHand.image} />
                        </div>
                    )
                    
                })}
            </div>
        </div>
    )
}

export default Hand;