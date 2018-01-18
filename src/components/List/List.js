import React from 'react';
import cc from 'classcat';

import ListItem from '../ListItem/ListItem';

const List = props => (
    <ul className={cc(["codeflow-list", props.className])}>
        {
            props.items ? props.items.map(item => {
                return (
                    <li>
                        <ListItem key={item.value || item}
                            primary={props.primary} secondary={props.secondary} danger={props.danger}
                            selected={props.selectedItem && (item.value === props.selectedItem || item === props.selectedItem)} onClick={() => props.onClick ? props.onClick(item) : null}>
                            {typeof item == "string" ? item : item.label}
                        </ListItem>
                    </li>
                    )
                })
            :
                React.Children.map(props.children, child => {
                    return (
                        <li>
                            {
                                child ?
                                    React.cloneElement(child, { primary: props.primary, secondary: props.secondary, danger: props.danger, selected: child.props.value ? child.props.value === props.selectedItem : false })
                                    :
                                    null
                            }
                        </li>
                    );
                })
        }
    </ul>
)

export default List;