import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

const TextInput = props => <input {...props} className={cc(["input", props.className])} />;

TextInput.defaultProps = {
	className: "",
	type: 'text'
};

TextInput.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string
};

export default TextInput;
