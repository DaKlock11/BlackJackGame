import React, { useState,useEffect } from 'react';

const Controls = (handleStartGame, drawCard) => {


    return (

        <div className="controls">
            <button onClick={handleStartGame}>START GAME</button>
            <button onClick={drawCard}>Hit</button>
            <button>Stay</button>
            <button>Reset</button>
        </div>
    )
};



export default Controls;