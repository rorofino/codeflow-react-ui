import React from 'react';
import cc from 'classcat';

import ListItem from '../ListItem/ListItem';

const List = props => (
    <ul className={cc(["codeflow-list", props.className])}>
        {
            React.Children.map(props.children, child => (
                    <li>
                        {
                            child ?
                                React.cloneElement(child, {
                                    primary: props.primary, 
                                    secondary: props.secondary,
                                    danger: props.danger,
                                    selected: child.props.value ? child.props.value === props.selectedItem : false,
                                })
                                :
                                null
                        }
                    </li>
            ))
        }
        {
            props.items ? 
                props.items.map((item, index) => {
                    return (
                        <li key={`${item.value || item}-${index}`}>
                            <ListItem
                                primary={props.primary}
                                secondary={props.secondary}
                                danger={props.danger}
                                selected={props.selectedItem && (item.value === props.selectedItem || item === props.selectedItem)}
                                onClick={() => props.onClick ? props.onClick(item) : undefined}
                                onMouseDown={() => props.onMouseDown ? props.onMouseDown(item) : undefined}
                            >
                                {item.hasOwnProperty('label') ? item.label : item}
                            </ListItem>
                        </li>
                        )
                    })
                : null 
        }
    </ul>
)

export default List;