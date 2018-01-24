import React from "react";
import PropTypes from "prop-types";
import cc from 'classcat';
import Button from "../Button/Button";
import ListItem from '../ListItem/ListItem';
import Modal from "../Modal/Modal";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const getDescendantProp = (obj, field) => field.split('.').reduce((a, b) => a[b], obj);

class ListMasterDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItems: []
        };
    }

    handleAddClick(event, column, columnIndex, selectedItems) {
        if (this.props.onAddClick) {
            this.props.onAddClick(column, columnIndex, selectedItems);
        }
    }

    handlerRemoveClick(event, column, columnIndex, selectedItems) {
        if (this.props.onRemoveClick) {
            this.props.onRemoveClick(column, columnIndex, selectedItems);
        }
    }

    selectItem(item, column, columnIndex, itemIndex) {
        const selectedItems = this.state.selectedItems.slice(0, columnIndex);
        selectedItems[columnIndex] = {value: item, index: itemIndex};
        this.setState({selectedItems});
    }

    handleBreacrumbClick(column, columnIndex) {
        const selectedItems = this.state.selectedItems.slice(0, columnIndex);
        this.setState({selectedItems});
    }

    buildBreadcrumb() {
        const {columns} = this.props || [];
        const items = [
            <Button key={0} flat secondary hover={false} onClick={() => this.handleBreacrumbClick(columns[0], 0)} className="codeflow-list-master-detail__breadcrumb-button">
                <i className={cc([this.props.titleIcon, "codeflow-list-master-detail__breadcrumb-icon", "padding-right-sm"])}></i>
                {columns[0].title}
            </Button>
        ];
        this.state.selectedItems.forEach((item, index) => {
            if (index > 0) {
                const column = columns[index];
                items.push(
                    <Button key={index} flat secondary hover={false}  onClick={() => this.handleBreacrumbClick(column, index)} className="codeflow-list-master-detail__breadcrumb-button">
                        <i className={cc([column.titleIcon, "codeflow-list-master-detail__breadcrumb-icon", "padding-right-sm"])}></i>
                        {column.title}
                    </Button>
                );
            }
        });
        return items;
    }

    render() {
        const {columns} = this.props || [];
        const {selectedItems} = this.state;
        const dataSources = [this.props.value];
        for(let i=0; i<selectedItems.length; i++) {
            const selectedItem = selectedItems[i];
            const valueProperty = columns[i].valueProperty;
            const item = dataSources[i][selectedItem.index];
            const array = item[valueProperty];
            dataSources.push(array);
        }

        return (
            <div className={cc(["codeflow-list-master-detail", this.props.className])}>
                <div className="codeflow-list-master-detail__title">
                    <Breadcrumb>
                        {this.buildBreadcrumb()}
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
                                        <Button disabled={!this.state.selectedItems[columnIndex]} flat hover={false} 
                                            className="codeflow-list-master-detail__column-title-trash"
                                            onClick={(event) => this.handlerRemoveClick(event, column, columnIndex, this.state.selectedItems)}
                                            >
                                            <i className="fa fa-trash"></i>
                                        </Button>
                                    : null }
                                </div>
                                <div className="codeflow-list-master-detail__column-list">
                                {column.manageable ?
                                    <Button primary flat 
                                        className="codeflow-list-master-detail__column-add" 
                                        onClick={(event) => this.handleAddClick(event, column, columnIndex, this.state.selectedItems)}
                                        disabled={columnIndex > 0 && (selectedItems[columnIndex-1] === null || selectedItems[columnIndex-1] === undefined)}
                                        >
                                        <div className="codeflow-list-master-detail__icon-box">
                                                <i className="fa fa-plus"></i>
                                        </div>
                                        <p>Adicionar</p>
                                    </Button>
                                : null }
                                    {dataSources[columnIndex] ? dataSources[columnIndex].map((item, indexItem) => {
                                        const itemSelected = this.state.selectedItems[columnIndex] && this.state.selectedItems[columnIndex].index === indexItem;
                                        return (<ListItem icon={itemSelected ? "fa fa-chevron-right" : ""}
                                            className="codeflow-list-master-detail__column-item"
                                            selected={itemSelected}
                                            onClick={() => this.selectItem(item, column, columnIndex, indexItem)}
                                            key={`col${columnIndex}item${indexItem}`}
                                        >
                                            {getDescendantProp(item, column.labelProperty)}
                                        </ListItem>);
                                    }) : null}
                                </div>
                            </div>
                        )) 
                    }
                </div>
            </div>                
        );
    }

}

ListMasterDetail.propTypes = {
    titleIcon: PropTypes.string,
    onAddClick: PropTypes.func,
    onRemoveClick: PropTypes.func,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title:  PropTypes.string.isRequired,
            titleIcon: PropTypes.string,
            labelProperty: PropTypes.string.isRequired,
            valueProperty: PropTypes.string.isRequired,
            manageable: PropTypes.bool,
            final: PropTypes.bool
        })
    ).isRequired,
};

ListMasterDetail.defaultProps = {
    titleIcon: "fa fa-home"
};

export default ListMasterDetail;