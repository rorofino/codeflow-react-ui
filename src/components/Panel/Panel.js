import React from "react";
import PropTypes from 'prop-types';
import cc from "classcat";
import Page from '../Page/Page';

const Panel = props => {

    return (
        <Page className={cc([props.className, "codeflow-panel", { "codeflow-panel--float": props.float }])}>
            <div className={
                cc([
                    "codeflow-panel__title",
                    {
                        "codeflow-panel__title": {
                            "--float": props.float,
                            "--primary": props.primary,
                            "--secondary": props.secondary,
                            "--danger": props.danger
                        }
                    }
                ])
            }>
                {typeof props.title === "function" ? props.title() : props.title}
            </div>
            <div className={cc(["codeflow-panel__body"])}>
                {props.children}
            </div>
            {props.footer ? 
                <div className={cc(["codeflow-panel__footer"])}>
                    {props.footer()}
                </div>
            : null}
        </Page>
    );
}

Panel.propTypes = {
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    footer: PropTypes.func,
    float: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    danger: PropTypes.bool,
    className: PropTypes.string,
};

Panel.defaultProps = {
    title: "My title modal",
    simple: false,
    primary: false,
    secondary: false,
    danger: false,
};

export default Panel;