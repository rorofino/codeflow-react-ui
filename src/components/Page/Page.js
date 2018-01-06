import React from "react";
import cc from "classcat";
import PropTypes from "prop-types";

const Page = props => <div className={cc(["page-component", props.className])} >{props.children}</div>;

Page.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any
};

Page.defaultProps = {
	className: "",
	children: undefined
};

export default Page;
