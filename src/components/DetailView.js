import React from "react";

const DetailView = function(props) {
    return (
        <div className="detail-view-container">
            <header>
                <h1>Marshalls Mum</h1>
                <div class="icons">
                    <div class="glutenfree-icon">

                    </div>
                    <div class="vegan-icon">
                        
                    </div>
                    <div class="vegetarian-icon">
                        
                    </div>
                    <div className="close-button" onClick={props.onClose}>X</div>
                </div>
            </header>
            <main>
                <address>
                    <strong>Address:</strong>&nbsp;August-Bebel-Straße 1, 04275 Leipzig
                </address>
                <time class="opening-times">
                    <strong>Opening Hours:</strong>&nbsp;Samstag:&nbsp;12:00–19:00
                </time>
                <p class="telephone-number">
                    <strong>Telephone Number:</strong>&nbsp;0341 30698857
                </p>
                <p class="description">
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