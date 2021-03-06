import React from "react";
import ReactDOM from 'react-dom';
import cc from "classcat";
import PropTypes from "prop-types";
import {POSITION} from '../../constants';

const onBlur = event => {
    event.preventDefault();
    event.stopPropagation();
    if (props.onClickOutside) {
        props.onClickOutside(event);
    }
}

const Popover = props => (
    <div className={cc(["codeflow-popover", props.className])} onBlur={props.onClickOutside}>
        <div className={cc(["codeflow-popover__target"])}>
            {props.children}
        </div>
        {props.isOpen ?
            <div className={cc([
                "codeflow-popover__body",
                {
                    "codeflow-popover__body": {
                        "--top": props.position === POSITION.TOP,
                        "--right": props.position === POSITION.RIGHT,
                        "--bottom": !props.arrow && props.position === POSITION.BOTTOM,
                        "--left": props.position === POSITION.LEFT,
                        "--center": props.position === POSITION.CENTER,
                        "--bottom-arrow": props.arrow && props.position === POSITION.BOTTOM,
                        "--bottom-right": !props.arrow && props.position === POSITION.BOTTOM_RIGHT,
                    }
                }
            ])}>
                {typeof props.content === "function" ? props.content(props) : props.content}
            </div>
        : null }
    </div>
);

Popover.propTypes = {
    className: PropTypes.string,
    position: PropTypes.oneOf(Object.values(POSITION)),
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Popover.defaultProps = {
    position: POSITION.BOTTOM
};

export default Popover;
