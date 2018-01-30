import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import cc from "classcat";
import Button from '../Button/Button';

const Alert = (props) => (

    <Modal {...props}
        className={cc(["codeflow-alert", props.className])}
        float={false}
        onClose={props.onDismiss}
        hideClose={true}
        >

      <div className="codeflow-alert__body">
      {props.children}
      </div>
        {props.showFooter ?
            <div className="codeflow-alert__footer">
                <Button flat hover={false}
                    onClick={props.onDismiss}
                    className="codeflow-alert__button codeflow-alert__button--dismiss"
                >{props.dismissButtonLabel}</Button>
                <Button flat hover={props.danger}
                    primary={props.primary}
                    secondary={props.secondary}
                    danger={props.danger}
                    onClick={props.onConfirm}
                    className="codeflow-alert__button"
                >{props.confirmButtonLabel}</Button>
            </div>
        : null
        }
    </Modal>
);

Alert.defaultProps = {
    primary: false,
    secondary: false,
    danger: false,
    showFooter: true
};

export default Alert;