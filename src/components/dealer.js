import React, { useState, useEffect } from 'react';
import './dealer.css';

const Dealer = ({dealersHand}) => {
    
return (
    <div className="Dealer">
        <div>Dealer's Hand </div>
        <div>
            {dealersHand.map((c) => {
                <img src={c["image"]} />
            })}
        </div>        
    </div>
)
}

export default Dealer;