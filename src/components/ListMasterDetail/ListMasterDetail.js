import React from "react";
import PropTypes from "prop-types";
import cc from 'classcat';
import Button from "../Button/Button";
import ListItem from '../ListItem/ListItem';
import Modal from "../Modal/Modal";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

import { getDescendantProp } from '../../utils/objUtils';

const handleAddClick = (item, column) => {
    if (column.onAddClick) {
        column.onAddClick(item, column);
    }
}

const handlerRemoveClick = (item, column) => {
    if (column.onRemoveClick) {
        column.onRemoveClick(item, column);
    }
}

const handleItemClick = (item, column, columns) => {
    if (item !== column.value) {
        if (column.onChange) {
            column.onChange(item, column);
        }
        for(let i=columns.indexOf(column)+1; i<columns.length; i++) {
            if (i < columns.length) {
                const col = columns[i];
                if (col.onChange) {
                    col.onChange(null, col);
                }
            }
        }
    }
}

const handleBreacrumbClick = (column, columnIndex) => {
    
}

const buildBreadcrumb = (props) => {
    const { columns } = props || [];
    const items = [
        <Button key={0} flat secondary hover={false} onClick={() => handleBreacrumbClick(null, columns[0])} className="codeflow-list-master-detail__breadcrumb-button">
            <i className={cc([props.titleIcon, "codeflow-list-master-detail__breadcrumb-icon", "padding-right-sm"])}></i>
            {columns[0].title}
        </Button>
    ];
    columns.forEach((column, index) => {
        if (index > 0 && column.value) {
            items.push(
                <Button key={index} flat secondary hover={false} onClick={() => handleItemClick(null, column, columns)} className="codeflow-list-master-detail__breadcrumb-button">
                    <i className={cc([column.titleIcon, "codeflow-list-master-detail__breadcrumb-icon", "padding-right-sm"])}></i>
                    {column.title}
                </Button>
            );
        }
    });
    return items;
}

const ListMasterDetail = props => {

    const { columns } = props;

    return (
        <div className={cc(["codeflow-list-master-detail", props.className])}>
            <div className="codeflow-list-master-detail__title">
                <Breadcrumb>
                    {buildBreadcrumb(props)}
                </Breadcrumb>
            </div>
            <div className="codeflow-list-master-detail__columns">
                {
                    columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="codeflow-list-master-detail__column">
                            <div className="codeflow-list-master-detail__column-title">
                                <div className="codeflow-list-master-detail__column-text">
                                    <div className="codeflow-list-master-detail__icon-box">
                                        <i className={cc([column.titleIcon, "codeflow-list-master-detail__column-title-icon"])}></i>
                                    </div>
                                    {column.title}
                                </div>
                                {column.manageable ?
                                    <Button disabled={!column.value} flat hover={false}
                                        className="codeflow-list-master-detail__column-title-trash"
                                        onClick={(event) => handlerRemoveClick(column.value, column)}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                    : null}
                            </div>
                            <div className="codeflow-list-master-detail__column-list">
                                {
                                    column.manageable ?
                                        <Button primary flat
                                            className="codeflow-list-master-detail__column-add"
                                            onClick={(event) => handleAddClick(column.value, column)}
                                            disabled={columnIndex > 0 && !columns[columnIndex-1].value}
                                        >
                                            <div className="codeflow-list-master-detail__icon-box">
                                                <i className="fa fa-plus"></i>
                                            </div>
                                            <p>Adicionar</p>
                                        </Button>
                                        : null
                                }
                                {
                                    (column.values || []).map((item, indexItem) => {
                                        const itemSelected = item === column.value;
                                        return (<ListItem icon={itemSelected ? "fa fa-chevron-right" : ""}
                                            className="codeflow-list-master-detail__column-item"
                                            selected={itemSelected}
                                            onClick={() => handleItemClick(item, column, columns)}
                                            key={`col${columnIndex}item${indexItem}`}
                                        >
                                            {column.text ? column.text(item) : item}
                                        </ListItem>);
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


ListMasterDetail.propTypes = {
    titleIcon: PropTypes.string,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            titleIcon: PropTypes.string,
            manageable: PropTypes.bool,
            values: PropTypes.array,
            value: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
            text: PropTypes.func,
            onChange: PropTypes.func,
            onAddClick: PropTypes.func,
            onRemoveClick: PropTypes.func,
        })
    ).isRequired,
};

ListMasterDetail.defaultProps = {
    titleIcon: "fa fa-home"
};

export default ListMasterDetail;