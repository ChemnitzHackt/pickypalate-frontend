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
                    <strong>Opening Hours:</strong>&nbsp;Samstag:&nbsp;12:00–19:00
                </time>
                <p className="telephone-number">
                    <strong>Telephone Number:</strong>&nbsp;0341 30698857
                </p>
                <p className="description">
                    Das im Shabby Chic gestaltete Café bietet zu Kaffee und Frappés feine amerikanische Süßwaren und Eis am Stil.
                </p>
            </main>
            <footer>

            </footer>
            {props.children}
        </div>
    ); 
};

export default DetailView;