import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';

const NavBar = props => {

    const renderedLeft = (
        <div className="codeflow-navbar__left">
            {typeof props.left === 'function' ?
                props.left()
            : 
                props.left}
        </div>
    );

    const renderedTitle = (
        typeof props.title === 'function' ?
            props.title()
        : 
            <h1 className="codeflow-navbar__title">{props.title}</h1>
    );
        
    const renderedRight = (
        <div className="codeflow-navbar__right">
            {
                typeof props.right === 'function' ?
                    props.right()
                : 
                    props.right
            }
        </div>
    );

    return (
        <Header className="codeflow-navbar">
            {renderedLeft}
            {renderedTitle}
            {React.Children.count(props.children) > 0 
            ?   <nav className="codeflow-navbar__nav">
                    <ul className="codeflow-navbar__ul">
                        {React.Children.map(props.children, child => (
                            <li>{child}</li>
                        ))}
                    </ul>
                </nav>
            :   null }
            {renderedRight}
        </Header>
    );
};

NavBar.propTypes = {
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    left: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    right: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

export default NavBar;