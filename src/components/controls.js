import React, { useState,useEffect } from 'react';

const Controls = (onDrawCardClick, startGame) => {


    return (

        <div className="controls">
            <button onClick={startGame}>START GAME</button>
            <button onClick={onDrawCardClick}>Hit</button>
            <button>Stay</button>
            <button>Reset</button>
        </div>
    )
};



export default Controls;