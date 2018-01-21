import React, {Component} from "react";
import PropTypes from "prop-types";
import cc from "classcat";
import Button from "../Button/Button";
import List from "../List/List";
import Popover from "../Popover/Popover";
import { POSITION } from "../../constants";
import ListItem from "../ListItem/ListItem";

class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            isOpen: false,
            openPosition: props.position
        };
    }

    handleButtonClick(event) {
        const client = event.target.getBoundingClientRect();
        const screenHeight = window.innerHeight || document.documentElement.offsetHeight;
        const up = client.top > ((screenHeight / 2) + client.height);
        if (up) {
            this.state.openPosition = POSITION.TOP;
            this.setState({isOpen: !this.state.isOpen, openPosition: POSITION.TOP});
        } else {
            this.setState({isOpen: !this.state.isOpen});
        }
    }

    handleSelect(item) {
        if (this.props.onChange) {
            this.props.onChange(item);
        }
        this.setState({isOpen: false});
    }

    renderDropDownList() {
        const { props } = this;
        return (
            <List
                items={props.items} 
                primary={props.primary}
                secondary={props.secondary}
                danger={props.danger}
                onClick={this.handleSelect}
                selectedItem={props.value}
            >
                {props.placeholder && props.displayPlaceHolderOnList ? <ListItem label={props.placeholder} disabled /> : null}
                {props.children}
            </List>
        );
    }

    render() {
        const { props } = this;
        const childrenData = React.Children.map(props.children, child => child.props);
        const data = (props.items || []).concat(childrenData || []);
        const valueOnData = data.find(item => item.value === props.value || item === props.value);
        const displayText = valueOnData ? (valueOnData.label ? valueOnData.label : valueOnData) : props.placeholder;
        return (
            <div className={cc(["codeflow-dropdown", {"codeflow-dropdown--material": props.material}, props.className])}>
                <Popover isOpen={this.state.isOpen} content={this.renderDropDownList()} position={this.state.openPosition}>
                    <Button flat={props.flat || props.material} hover={props.hover != undefined ? props.hover : !props.material}
                        primary={props.primary} secondary={props.secondary} danger={props.danger} 
                        neutral={props.neutral} outline={props.outline} rounded={props.rounded}
                        icon={props.icon}
                        className={cc(["codeflow-dropdown__button", {"codeflow-dropdown__button--material": props.material}])} 
                        onClick={this.handleButtonClick}>
                        <div className={cc(["codeflow-dropdown__button-text", {"codeflow-dropdown__button-text--material": props.material}])}>
                            {displayText}
                        </div>

                    </Button>
                </Popover>
            </div>
        );
    }

}

Dropdown.propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    position: PropTypes.oneOf([POSITION.TOP, POSITION.BOTTOM, POSITION.CENTER]),
    items: PropTypes.array,
    material: PropTypes.bool,
    placeholder: PropTypes.string,
    neutral: PropTypes.bool,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	danger: PropTypes.bool,
	outline: PropTypes.bool,
	flat: PropTypes.bool,
	rounded: PropTypes.bool,
    hover: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    displayPlaceHolderOnList: PropTypes.bool,
};

Dropdown.defaultProps = {
    position: POSITION.BOTTOM,
    material: false,
    displayPlaceHolderOnList: true
};

export default Dropdown;