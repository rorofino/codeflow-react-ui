import React from "react";
import PropTypes from 'prop-types';
import ReactModal from "react-modal";
import cc from "classcat";

const Modal = props => (
	<ReactModal
		{...props}
		className={cc(["codeflow-modal", props.className, {"codeflow-modal--extra-padding": !props.simple}])}
		overlayClassName="codeflow-overlay"
		shouldCloseOnEsc={false}
		shouldCloseOnOverlayClick={false}
		ariaHideApp={false}
	>
		<div className={
			cc([
				"codeflow-modal__title",
				{
					"codeflow-modal__title": {
							"--simple": props.simple,
							"--primary": !props.secondary && !props.danger ? true : false,
							"--secondary": props.secondary,
							"--danger": props.danger,
							"--hide": !props.showTitle
						}
				}
			])
		}>
			{props.icon ? <i className={props.icon} /> : props.title }
		</div>
		<div className="codeflow-modal__body">
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
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	danger: PropTypes.bool,
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
