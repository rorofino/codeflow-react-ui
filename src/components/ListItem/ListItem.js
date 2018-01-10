import React from 'react';
import cc from 'classcat';

const ListItem = props => (
    <div className={cc([
        "codeflow-list-item", 
        {
            "codeflow-list-item": {
                "--selected": props.selected && !props.primary && !props.secondary && !props.danger,
                "--primary": props.primary,
                "--secondary": props.secondary,
                "--danger": props.danger
            }
        },
        props.className])} 
        onClick={props.onClick}
    >
        <div className="codeflow-list-item__body">
            {props.children ? props.children : props.label}
        </div>
        <div className="codeflow-list-item__icon">
            <i className={props.icon}> </i>
        </div>
    </div>
)

export default ListItem;