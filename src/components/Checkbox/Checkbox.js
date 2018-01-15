import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

const handleInternalClick = (event, props) => {
	if (props.onClick) {
		props.onClick(event);
	}
	if (props.onChange) {
		props.onChange(!props.value);
	}
};

const Checkbox = props => [
	<input key="1" type="hidden" value={props.value} />,
	<div
		key="2"
		className={cc([
			"codeflow-checkbox",
			{
				"codeflow-checkbox":
				{
					"--primary": (props.secondary || props.danger) ? false : true,
					"--secondary": props.secondary,
					"--danger": props.danger,
				}
			},
			{
				"codeflow-checkbox--checked": props.value || props.value === "true",
				"checkbox-positionLeft": props.labelPosition === "left",
				"checkbox-positionRight": props.labelPosition === "right"
			}
		])}
		onClick={event => handleInternalClick(event, props)}
	/>,
	<span key="3" className="codeflow-checkbox__label" onClick={event => handleInternalClick(event, props)}>
		{props.label}
	</span>
];

Checkbox.propTypes = {
	label: PropTypes.string,
	labelPosition: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	onClick: PropTypes.func
};

Checkbox.defaultProps = {
	label: "",
	labelPosition: "right",
	checked: false,
	onClick: undefined
};

export default Checkbox;
