import React from "react";
import ReactDOM from 'react-dom';
import cc from "classcat";
import PropTypes from "prop-types";
import {POSITION} from '../../constants';

const Popover = props => (
    <React.Fragment>
        {
            props.isOpen ? 
                ReactDOM.createPortal((<div className="codeflow-popover__overlay" onClick={props.onClickOutside}></div>), document.body)
                : null
        }
        <div className={cc(["codeflow-popover", props.className])}>
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
                            "--bottom-arrow": props.arrow && props.position === POSITION.BOTTOM
                        }
                    }
                ])}>
                    {typeof props.content === "function" ? props.content(props) : props.content}
                </div>
            : null }
        </div>
    </React.Fragment>);

Popover.propTypes = {
    className: PropTypes.string,
    position: PropTypes.oneOf(Object.values(POSITION)),
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Popover.defaultProps = {
    position: POSITION.BOTTOM
};

export default Popover;
