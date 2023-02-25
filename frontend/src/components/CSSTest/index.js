import React, { useEffect, useState, useTransition } from 'react';
import './CSSTest.css';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const CSSTestPage = () => {
    let [mode, setMode] = useState("light");
    function handleClick() {
        setMode(mode == "light" ? "dark" : "light");
    }
    return (
        <div className={'test ' + mode}>
            <h1>This is a Day/Night Toggle Website</h1>
            <div className="btn-box">
                <button onClick={handleClick}>Toggle</button>
            </div>
        </div>
    );
}


export default CSSTestPage;