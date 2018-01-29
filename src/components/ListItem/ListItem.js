import React from 'react';
import cc from 'classcat';

const ListItem = props => (
    !props.separator ? 
        <div className={cc([
            "codeflow-list-item", 
            {
                "codeflow-list-item": {
                    "--selected": props.selected && !props.disabled,
                    "--primary": props.primary && !props.disabled,
                    "--secondary": props.secondary && !props.disabled,
                    "--danger": props.danger && !props.disabled,
                    "--disabled": props.disabled,
                }
            },
            props.className])} 
            onMouseDown={() => props.onClick ? props.onClick(props.value) : null}
        >
            <div className="codeflow-list-item__body">
                {props.children ? props.children : props.label}
            </div>
            <div className="codeflow-list-item__icon">
                <i className={props.icon}> </i>
            </div>
        </div>
    : <hr className="codeflow-list-item__hr" />
)

export default ListItem;