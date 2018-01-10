import React from 'react';
import cc from 'classcat';

import ListItem from '../ListItem/ListItem';

const List = props => (
    <div className={cc(["codeflow-list", props.className])}>
        {props.items ? props.items.map(item => (
            <ListItem key={item.value}
                primary={props.primary} secondary={props.secondary} danger={props.danger}
                selected={item === props.selectedItem} onClick={() => props.onClick ? props.onClick(item) : null}>
                {typeof item == "string" ? item : item.label}
            </ListItem>
        )) : React.Children.map(props.children, child => 
            React.cloneElement(child, {primary: props.primary, secondary: props.secondary, danger:props.danger})
        )}
    </div>
)

export default List;