import React from "react";

import Overlay from './Overlay';
import Button from './Button';

function setIcon(state, diet){
    console.log(diet);
    if (state === "yes")
        return diet+"-icon";
    if (state === "no")
        return diet+"-icon no-diet";
    return ""
}

const DetailView = function(props) {
    var glutenfree = setIcon(props.data["diet:gluten_free"], "glutenfree");
    var vegan = setIcon(props.data["diet:vegan"], "vegan");
    var vegetarian = setIcon(props.data["diet:vegetarian"], "vegetarian");

    return (
        <Overlay className="detail-view">
            <Button onClick={props.onClose} className="close icon-only secondary">
                <i className="material-icons">clear</i>
            </Button>
            
            <header>
                <h1>{props.data.name || ""}</h1>
                <div className="amenity">{(props.data.amenity && props.data.amenity.replace("\_", " ")) || ""}</div>
                <div className="icons">
                    <div className={glutenfree}></div>
                    <div className={vegan}></div>
                    <div className={vegetarian}></div>
                </div>
            </header>
            <main>
                <address>
                    <dl>
                        <dt><strong>Address:</strong></dt>
                        <dd>{props.data["addr:street"]+" " +props.data["addr:housenumber"] || ""}</dd>
                        <dd>{props.data["addr:postcode"]+" "+props.data["addr:city"] || ""}</dd>
                    </dl>
                </address>
                <time className="opening-times">
                    <dl>
                        <dt><strong>Opening Hours:</strong></dt>
                        <dd>{props.data["opening_hours"] || "No information"}</dd>
                    </dl>
                </time>
                <div className="telephone-number">
                    <dl>
                        <dt><strong>Telephone Number:</strong></dt>
                        <dd>{props.data["phone"] || "No information"}</dd>
                    </dl>
                </div>
                <div className="furtherInformation">
                    {props.data.website && <a href={props.data.website} target="_blank">Website</a>}
                </div>
            </main>
            <footer>

            </footer>
            {props.children}
        </Overlay>
    ); 
};

export default DetailView;