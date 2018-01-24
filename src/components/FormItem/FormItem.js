import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

const required = value => (value ? undefined : 'Campo obrigatório');

const FormItem = props => {
	
	const { label } = props;
	const { error, warning, touched } = props.meta || {};

	return (
		<div className={cc(["codeflow-form-item", props.className])}>
			{props.showLabel ?
				<label className={cc(["codeflow-form-item__label", { "codeflow-form-item__label--required": props.required }])}>
					{props.label || props.input.name}{" "}
				</label>
			: 
				null 
			}
			<div className={cc(["codeflow-form-item__holder", {"codeflow-form-item__holder--inline": props.inline}])}>
				{props.input
					? React.cloneElement(props.children, { ...props.input })
					: props.children}
				<p className="codeflow-form-item__validation">
					{" "}
					{touched &&
						((error && <span>{error}</span>) ||
							(warning && <span>{warning}</span>))}
				</p>
			</div>
		</div>
	);
};

FormItem.propTypes = {
	children: PropTypes.element.isRequired,
	showLabel: PropTypes.bool,
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	label: PropTypes.string,
	connected: PropTypes.bool,
	required: PropTypes.bool,
	inline: PropTypes.bool,
	extraValidate: PropTypes.array
};

FormItem.defaultProps = {
	children: undefined,
	showLabel: true,
	className: "",
	meta: undefined,
	label: "",
	connected: false,
	required: false,
	inline: false,
	extraValidate: []
};

export default FormItem;
