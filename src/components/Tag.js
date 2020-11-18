import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function Tag(props){
    return(
        <div key={props.index} className="w3-row w3-margin w3-card w3-pale-green w3-padding">
            <div className="w3-col s4 w3-jumbo w3-center">
                <FontAwesomeIcon icon={props.productIcon} size="lg"/>
            </div>
            <div className="w3-col s8">
                <b>{props.item.name}</b>
                <br/>
                <i className="w3-text-grey">{props.item.id}</i>
                <br/>
                Price: ${props.item.price}
                <br/>
                Color: {props.item.color.map((color) => {
                return  <span className={"w3-margin w3-xxround w3-text-" + color}>
                            <FontAwesomeIcon icon={faCircle} size="lg"/>
                        </span>
                        })}
                <br/>
                Manufacturer: {props.item.manufacturer}
                <br/>
                <button className="w3-btn w3-border w3-green"
                        onClick={()=>{props.checkAvailability(props.item.id, props.item.manufacturer)}}
                >
                    Check Availability
                </button>
            </div>
        </div>
    );
}

export default Tag;