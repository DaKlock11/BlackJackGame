import React, { useState,useEffect } from 'react';
import './controls.css';

const Controls = (props) => {
    const { Hit, reset, Stand } = props;

    return (

        <div className="controls">
            <button className="btn" onClick={Hit}>Hit</button>
            <button className="btn" onClick={Stand} >Stay</button>
            <button className="btn" onClick={reset}>Reset</button>
        </div>
    );
};



export default Controls;