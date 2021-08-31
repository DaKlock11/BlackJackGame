import React, { useState, useEffect } from 'react';
import './dealer.css';

const Dealer = ({hand}) => {
    
return (
    <div className="Dealer">
        <div className="text">Dealer's Hand </div>
        <div className="dealer-hand">
            {hand.map((c) => {
                return <img className="cards" src={c["image"]} key={c["code"]} />
            })}
        </div>        
    </div>
)
}

export default Dealer;