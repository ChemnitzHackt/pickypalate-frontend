import React from "react";

const DetailView = function(props) {
    return (
        <div className="detail-view-container">
            <header>
                <h1>{props.data.name || ""}</h1>
                <div className="icons">
                    <div className="glutenfree-icon">

                    </div>
                    <div className="vegan-icon">
                        
                    </div>
                    <div className="vegetarian-icon">
                        
                    </div>
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
                <div className="description">
                    Das im Shabby Chic gestaltete Café bietet zu Kaffee und Frappés feine amerikanische Süßwaren und Eis am Stil.
                </div>
                <div className="furtherInformation">

                    { props.data.website && <a href={props.data.website}>Website</a> }
                </div>
            </main>
            <footer>

            </footer>
            {props.children}
        </div>
    ); 
};

export default DetailView;