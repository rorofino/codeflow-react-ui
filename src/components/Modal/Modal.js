import React from "react";
import PropTypes from 'prop-types';
import ReactModal from "react-modal";
import cc from "classcat";

import Button from '../Button/Button';

const Modal = props => (
	<ReactModal
		{...props}
		className={
			cc([
				"codeflow-modal", 
				{
					"codeflow-modal": {
						"--extra-padding": !props.simple && (props.position === DEFAULT || props.position === CENTER),
						"--default": props.position === DEFAULT, 
						"--center": props.position === CENTER,
						"--top": props.position === TOP,
						"--right": props.position === RIGHT,
						"--bottom": props.position === BOTTOM,
						"--left": props.position === LEFT,

					}
				},
				props.className,
			])
		}
		overlayClassName={cc(["codeflow-overlay", {"codeflow-overlay--hide": !props.showOverlay}])}
		shouldCloseOnEsc={props.shouldCloseOnEsc}
		shouldCloseOnOverlayClick={false}
		ariaHideApp={false}
	>
		<div className={
			cc([
				"codeflow-modal__title",
				{
					"codeflow-modal__title": {
							"--simple": props.simple || props.neutral || (props.position !== DEFAULT && props.position !== CENTER),
							"--neutral": props.neutral,
							"--primary": !props.secondary && !props.danger ? true : false,
							"--secondary": props.secondary,
							"--danger": props.danger,
							"--hide": !props.showTitle
						}
				}
			])
		}>
			<div className="codeflow-modal__title-box">
				{props.icon ? <i className={cc(["codeflow-modal__title-icon", props.icon])} /> : null } 
				<span>{props.title}</span>
			</div>
			{props.hideClose ? null :
			<Button flat hover={false} className="codeflow-modal__title-close-button" onClick={props.onClose}>
				<i className="fa fa-times" />
			</Button>
			}
		</div>
		<div className={cc(["codeflow-modal__body", props.bodyClassName])}>
			{props.children}
		</div>
	</ReactModal>
);

const DEFAULT = "default";
const CENTER = "center";
const TOP = "top";
const RIGHT = "right";
const BOTTOM = "bottom";
const LEFT = "left";

Modal.propTypes = {
	isOpen: PropTypes.bool,
	showTitle: PropTypes.bool,
	icon: PropTypes.string,
	title: PropTypes.string,
	simple: PropTypes.bool,
	neutral: PropTypes.bool,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	danger: PropTypes.bool,
	position: PropTypes.oneOf([DEFAULT, CENTER, TOP, RIGHT, BOTTOM, LEFT]),
	showOverlay: PropTypes.bool,
	showClose: PropTypes.bool,
	onClose: PropTypes.func,
	className: PropTypes.string,
	bodyClassName: PropTypes.string,
	shouldCloseOnEsc: PropTypes.bool,
};

Modal.defaultProps = {
	isOpen: false,
	showTitle: true,
	showOverlay: true,
	position: DEFAULT,
	title: "Modal title",
	simple: false,
	primary: false,
	secondary: false,
	danger: false,
};

export default Modal;
