import React, { useState,useEffect } from 'react';

const Controls = (handleStartGame, drawCards, startGame) => {


    return (

        <div className="controls">
            <button onClick={startGame}>START GAME</button>
            <button onClick={drawCards}>Hit</button>
            <button>Stay</button>
            <button>Reset</button>
        </div>
    )
};



export default Controls;