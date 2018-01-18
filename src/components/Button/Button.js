import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";
import Spinner from "../Spinner/Spinner";

const Button = props => {
	const btnRelevance = cc({
		"codeflow-button": {
			"--neutral": props.neutral || (!props.primary && !props.secondary && !props.danger),
			"--primary": props.primary,
			"--secondary": props.secondary,
			"--danger": props.danger
		}
	});
	const btnClasses = cc([
		"codeflow-button",
		props.className,
		btnRelevance,
		{
			[btnRelevance]: {
				"--outline": props.outline,
				"--flat": props.flat,
				"--hover": props.hover
			},
			"codeflow-button--rounded": props.rounded,
			"codeflow-button--circle": props.circle,
			"codeflow-button--loading": props.loading
		}
	]);

	const renderedIcon = typeof props.icon === "function" ? props.icon() : (props.icon ? props.icon : null);

	return (
		<button
			onClick={props.onClick}
			className={btnClasses}
			disabled={props.disabled || props.loading}
			type={props.type}
			style={props.style}
		>
			<div className={cc(["codeflow-button__content-box"])}>
				{props.loading ? <Spinner size={20} primary={props.primary} secondary={props.secondary} danger={props.danger} /> : null}
				{renderedIcon && !props.loading ? renderedIcon : null}
				<div className={cc(["codeflow-button__text", {"codeflow-button__text--padding": (props.loading || renderedIcon != null), "codeflow-button__text--bold": props.bold}])}>{props.children}</div>
			</div>
		</button>
	);
};

Button.propTypes = {
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	danger: PropTypes.bool,
	neutral: PropTypes.bool,
	outline: PropTypes.bool,
	flat: PropTypes.bool,
	rounded: PropTypes.bool,
	hover: PropTypes.bool,
	circle: PropTypes.bool,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	bold: PropTypes.bool,
	icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	onClick: PropTypes.func,
	children: PropTypes.any,
	className: PropTypes.string,
	type: PropTypes.string,
	style: PropTypes.object
};

Button.defaultProps = {
	neutral: false,
	primary: false,
	secondary: false,
	danger: false,
	outline: false,
	circle: false,
	flat: false,
	rounded: false,
	hover: true,
	disabled: false,
	loading: false,
	bold: false,
	children: undefined,
	onClick: undefined,
	type: undefined,
	className: "",
	style: {}
};

export default Button;
