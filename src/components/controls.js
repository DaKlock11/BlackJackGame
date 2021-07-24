import React, { useState,useEffect } from 'react';

const Controls = (onChildClick) => {

    const [ card, setCard ] = useState(null)

    return (

        <div className="controls">
            <button onClick={onChildClick}>Hit</button>
            <button>Stay</button>
            <button>Reset</button>
        </div>
    )
};



export default Controls;