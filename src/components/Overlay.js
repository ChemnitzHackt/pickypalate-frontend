import React from "react";

const Overlay = function(props) {
  return (
    <div className={ 'overlay-container ' + props.className }>
      {props.children}
    </div>
  ); 
};

export default Overlay;