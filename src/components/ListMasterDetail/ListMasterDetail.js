import React from "react";
import PropTypes from "prop-types";
import cc from 'classcat';
import Button from "../Button/Button";

//field.split('.').reduce((a, b) => a[b], obj)

const getDescendantProp = (obj, desc) => {
    var arr = desc.split(".");
    while(arr.length && (obj = obj[arr.shift()]));
    return obj;
}

class ListMasterDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSources: [],
            selectedItems: []
        };
    }

    selectItem(item, column, columnIndex, itemIndex) {
        const dataSources = [];
        const selectedItems = [];
        for(let i=0; i<this.props.columns.length; i++) {
            if (i < columnIndex) {
                dataSources[i] = this.state.dataSources[i];
                selectedItems[i] = this.state.selectedItems[i];
            } else if (i === columnIndex) {
                dataSources[i] = this.state.dataSources[i];
                selectedItems[i] = itemIndex;
            } else if (i === columnIndex+1) {
                dataSources[i] = item[column.valueProperty];
                selectedItems[i] = null;
            } else {
                dataSources[i] = null;
                selectedItems[i] = null;
            }
        }
        this.setState({dataSources, selectedItems});
    }

    render() {
        const columnLists = [];
        const {columns} = this.props || [];
        const {dataSources} = this.state;
        dataSources[0] = this.props.value;
        return (
            <div className="codeflow-list-master-detail">
                <div className="codeflow-list-master-detail__title">{this.props.title}</div>
                <div className="codeflow-list-master-detail__columns">
                    {
                        columns.map((column, columnIndex) => (
                            <div key={columnIndex} className="codeflow-list-master-detail__column">
                                <div className="codeflow-list-master-detail__column-title">{column.title}</div>
                                <div className="codeflow-list-master-detail__column-list">
                                {column.manageable ? 
                                    <Button primary flat className="codeflow-list-master-detail__column-add">
                                        <i className="fa fa-plus"></i>
                                        <p>Adicionar</p>
                                    </Button>
                                : null }
                                    {dataSources[columnIndex] ? dataSources[columnIndex].map((item, indexItem) => (
                                        <div key={`col${columnIndex}item${indexItem}`} 
                                            className={cc(["codeflow-list-master-detail__column-item", {"codeflow-list-master-detail__column-item--selected": this.state.selectedItems[columnIndex] === indexItem}])}
                                            onClick={() => this.selectItem(item, column, columnIndex, indexItem)}>
                                            <div className="codeflow-list-master-detail__column-text">{getDescendantProp(item, column.labelProperty)}</div>
                                            <div className="codeflow-list-master-detail__column-icon"><i className="fa fa-chevron-right"></i></div>
                                        </div>
                                    )) : null}
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
    title: PropTypes.string.isRequired,
    titleIcon: PropTypes.string,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title:  PropTypes.string.isRequired,
            titleIcon: PropTypes.string,
            labelProperty: PropTypes.string.isRequired,
            valueProperty: PropTypes.string.isRequired,
            groupByValue: PropTypes.bool,
            manageable: PropTypes.bool
        })
    ).isRequired,
};

export default ListMasterDetail;