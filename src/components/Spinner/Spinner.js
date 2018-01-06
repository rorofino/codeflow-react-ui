import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

const Spinner = props => (
	<div
		className={cc(["codeflow-loader", props.className, {"codeflow-loader": {
			"--primary": (props.secondary || props.danger) ? false : true,
			"--secondary": props.secondary,
			"--danger": props.danger,
		}}])}
		style={{
			width: props.size,
			height: props.size,
			fontSize: props.size / 10 > 3 ? props.size / 10 : 3
		}}
	>
		
	</div>
);

Spinner.defaultProps = {
	className: "",
	size: 100,
	primary: false,
	secondary: false,
	danger: false,
};

Spinner.propTypes = {
	className: PropTypes.string,
	size: PropTypes.number,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	danger: PropTypes.bool,
};

export default Spinner;
