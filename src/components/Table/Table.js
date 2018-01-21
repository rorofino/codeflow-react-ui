import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

export const Column = props => null;

Column.propTypes = {
	header: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
};

const Table = props => {
    let columns = props.columns;
    if (props.children && (!columns || columns.length === 0)) {
        columns = React.Children.map(props.children, element => ({header: element.props.header, value: element.props.value}));
    }
    return (
        <div className={cc(["codeflow-table", props.className])}>
            <div className="codeflow-table-head">
                {columns.map(item => <div className="codeflow-table-cell">{item.header}</div>)}
            </div>
            <div className="codeflow-table-body">
                {props.data ? props.data.map(item => (
                    <div className="codeflow-table-row" onClick={() => props.onClick(item)}>
                        {columns.map(col => <div className="codeflow-table-cell">{ typeof col.value === "function" ? col.value(item) : item[col.value]}</div>)}
                    </div>
                )) : null}
            </div>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.array
};

export default Table;