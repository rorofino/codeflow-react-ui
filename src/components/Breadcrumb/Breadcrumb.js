import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

const Breadcrumb = props => {
    return (
        <nav className="codeflow-breadcrumb">
            {React.Children.map(props.children, child => (
                <div className="codeflow-breadcrumb__item">
                    {child}
                    <i className="codeflow-breadcrumb__chevron fa fa-chevron-right"></i>
                </div>
            ))}
        </nav>
    );
};

Breadcrumb.propTypes = {

};

Breadcrumb.defaultProps = {

};

export default Breadcrumb;
