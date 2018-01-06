import React from "react";
import PropTypes from 'prop-types';
import ReactModal from "react-modal";
import cc from "classcat";

const Modal = props => (
	<ReactModal
		{...props}
		className={cc(["modal", props.className])}
		overlayClassName="overlay"
		shouldCloseOnEsc={false}
		shouldCloseOnOverlayClick={false}
		ariaHideApp={false}
	>
		<div className={cc(["title", {"danger-title":props.danger}, {"hide": !props.showTitle}])}>
			{props.icon ? <i className={cc(['fa', props.icon])} /> : (props.title || 'Modal title')}
		</div>
		<div className="body">
			{props.children}
		</div>
	</ReactModal>
);

Modal.propTypes = {
	showTitle: PropTypes.bool,
	danger: PropTypes.bool,
};

Modal.defaultProps = {
	showTitle: true,
	danger: false,
};

export default Modal;
