import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

export const Column = props => null;

Column.propTypes = {
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    className: PropTypes.string,
};

const Table = props => {
    let columns = props.columns;
    if (props.children && (!columns || columns.length === 0)) {
        columns = React.Children.map(props.children, element => ({
            header: element.props.header,
            value: element.props.value,
            className: element.props.className,
        }));
    }
    return (
        <div className={cc(["codeflow-table", props.className])}>
            <div className="codeflow-table-head">
                {columns.map((item, i) => <div key={`header${i}`} className={cc(["codeflow-table-cell", item.className])}>{ typeof item.header === "function" ? item.header() : item.header}</div>)}
            </div>
            <div className="codeflow-table-body">
                {props.data ? props.data.map((item, i) => (
                    <div key={`bodyRow${i}`} className="codeflow-table-row" onClick={() => props.onClick ? props.onClick(item) : null}>
                        {columns.map((col, colIndex) => <div key={`bodyCel${i}-${colIndex}`} className={cc(["codeflow-table-cell", col.className])}>{ typeof col.value === "function" ? col.value(item) : item[col.value]}</div>)}
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