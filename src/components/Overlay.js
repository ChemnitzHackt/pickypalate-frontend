import React from "react";

const Overlay = function(props) {
    return (
        <div className="overlay-container">
            <h1>Das ist das Overlay</h1>
            {props.children}
        </div>
    ); 
};

export default Overlay;