import React from "react";
import PropTypes from 'prop-types';
import ReactModal from "react-modal";
import cc from "classcat";

import Button from '../Button/Button';

const Modal = props => (
	<ReactModal
		{...props}
		className={cc(["codeflow-modal", props.className, {"codeflow-modal--extra-padding": !props.simple}])}
		overlayClassName="codeflow-overlay"
		shouldCloseOnEsc={props.shouldCloseOnEsc}
		shouldCloseOnOverlayClick={false}
		ariaHideApp={false}
	>
		<div className={
			cc([
				"codeflow-modal__title",
				{
					"codeflow-modal__title": {
							"--simple": props.simple || props.neutral,
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
	showClose: PropTypes.bool,
	onClose: PropTypes.func,
	className: PropTypes.string,
	bodyClassName: PropTypes.string,
	shouldCloseOnEsc: PropTypes.bool,
};

Modal.defaultProps = {
	isOpen: false,
	showTitle: true,
	title: "Modal title",
	simple: false,
	primary: false,
	secondary: false,
	danger: false,
};

export default Modal;
