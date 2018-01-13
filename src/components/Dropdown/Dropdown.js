import React, {Component} from "react";
import PropTypes from "prop-types";
import cc from "classcat";
import Button from "../Button/Button";
import List from "../List/List";

class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            isOpen: false
        };
    }

    handleButtonClick() {
        this.setState({isOpen: !this.state.isOpen});
    }

    handleSelect(item) {
        if (this.props.onChange) {
            this.props.onChange(item);
        }
        this.setState({isOpen: false});
    }

    render() {
        const { props } = this;
        const childrenData = React.Children.map(props.children, child => child.props);
        const data = props.items.concat(childrenData || []);
        const valueOnData = data.find(item => item.value === props.value || item === props.value);
        const displayText = valueOnData ? (valueOnData.label ? valueOnData.label : valueOnData) : props.placeholder;
        return (
            <div className={cc(["codeflow-dropdown",{"codeflow-dropdown--material": props.material}])}>
                <Button flat={props.flat || props.material} hover={props.hover != undefined ? props.hover : !props.material} 
                    className={cc(["codeflow-dropdown__button", {"codeflow-dropdown__button--material": props.material}])} 
                    onClick={this.handleButtonClick}>
                    <div className={cc(["codeflow-dropdown__button-text", {"codeflow-dropdown__button-text--material": props.material}])}>
                        {displayText}
                    </div>

                </Button>
                {this.state.isOpen ?
                    <List className="codeflow-dropdown__list"
                        items={props.items} 
                        primary={props.primary}
                        secondary={props.secondary}
                        danger={props.danger}
                        onClick={this.handleSelect}
                        selectedItem={props.value}
                    >
                        {props.children}
                    </List>
                    : null
                }
            </div>
        );
    }

}

export default Dropdown;