import React from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";
import debounce from 'lodash.debounce';
import { reduxForm } from "redux-form";
import "rc-pagination/assets/index.css";
import 'react-table/react-table.css';
import Modal from "../Modal/Modal";
import Page from "../Page/Page";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";

const getPagination = ({ totalCount, page, defaultPageSize, onPageChange }) => (
	<div
		style={{
			flex: 1,
			justifyContent: "flex-end",
			display: "flex",
			marginTop: 20
		}}
	>
		<Pagination
			total={totalCount}
			current={page + 1}
			defaultPageSize={defaultPageSize}
			className="pagination"
			showTitle={false}
			onChange={internalPage => onPageChange(internalPage - 1)}
		/>
	</div>
);

class CrudDataTable extends React.Component {
	constructor(props) {
		super(props);
		this.rowSelector = this.rowSelector.bind(this);
		this.headSelector = this.headSelector.bind(this);
		this.actionsColumn = this.actionsColumn.bind(this);
		this.toggleSelection = this.toggleSelection.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.onFetchDataReWrite = this.onFetchDataReWrite.bind(this);
		this.onRemoveClick = this.onRemoveClick.bind(this);
		this.onMultipleRemoveClick = this.onMultipleRemoveClick.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
		this.onCancelClick = this.onCancelClick.bind(this);
		this.onAddClick = this.onAddClick.bind(this);
		this.deleteConfirmed = this.deleteConfirmed.bind(this);
		this.reloadData = debounce(this.reloadData, 800);
		this.state = {
			selectedRows: [],
			selectedAll: false,
			loading: true,
			data: [],
			pages: 0,
			pageSize: 10,
			page: 0,
			sorted: undefined,
			filtered: undefined,
			totalCount: 0,
			editingItem: undefined,
			deleting: false,
			columns: this.getColumns(),
			deletingItems: [],
			filtrable: false
		};
	}
	
	onFetchDataReWrite(state) {
		const { pageSize, page, sorted, filtered } = state;
		const reWritedFilters = filtered.map(filter => {
			const column = state.columns.filter(c => c.accessor === filter.id)[0];
			return { ...filter, filterMatchMode: column.filterMatchMode };
		});
		this.setState(
			{ pageSize, page, sorted, filtered: reWritedFilters },
			this.reloadData
		);
	}

	onRemoveClick(item) {
		this.setState({ deletingItems: [].push(item) });
	}

	onMultipleRemoveClick() {
		if (this.state.selectedAll) {
			this.setState({deletingItems: this.state.data});
		} else {
			const items = this.state.data.filter(item => this.state.selectedRows.indexOf(item.id) > -1);
			this.setState({deletingItems: items});
		}
	}

	async onSaveClick(item) {
		await this.props.saveFunction(item);
		this.reloadData();
		this.setState({ editingItem: undefined });
	}

	onCancelClick() {
		this.setState({ editingItem: undefined });
	}
	onAddClick() {
		this.setState({ editingItem: {} });
	}

	getColumns() {
		const columns = [];
		const elementColumns = React.Children.toArray(this.props.children);
		elementColumns.forEach(element => {
			columns.push({
				Header: () => (<div><span>{element.props.header}</span><i style={{marginLeft: 5}} className="fa fa-sort" /></div>),
				accessor: element.props.field,
				filterMatchMode: element.props.filterMatchMode,
				className: element.props.className
			});
		});
		const select = {
			id: "_selector",
			accessor: () => "x",
			Header: this.headSelector,
			Cell: ci => this.rowSelector(ci.original),
			width: 50,
			filterable: false,
			sortable: false,
			resizable: false,
			style: { textAlign: "center", paddingLeft: 0 }
		};
		const actions = {
			id: "_actions",
			accessor: () => "x2",
			Header: "Ações",
			Cell: ci => this.actionsColumn(ci),
			width: 70,
			filterable: false,
			sortable: false,
			resizable: false,
			style: { textAlign: "center" }
		};
		return [select, ...columns, actions];
	}

	async reloadData() {
		this.setState({ loading: true });

		const data = await this.props.fetchFunction(
			this.state.pageSize,
			this.state.page,
			this.state.sorted,
			this.state.filtered
		);

		this.setState({
			data: data.rows,
			pages: Math.ceil(data.count / this.state.pageSize),
			totalCount: data.count,
			loading: false
		});
	}

	actionsColumn(row) {
		return (
			<div className="actionsColumn">
				<button
					className="actionColBtn"
					onClick={() => this.handleEditClick(row.original)}
				>
					<i className="fa fa-pencil" />
				</button>
				<button className="actionColBtn" onClick={() => this.onRemoveClick(row.original)}>
					<i className="fa fa-trash" />
				</button>
			</div>
		);
	}

	selectAll() {
		this.setState({ selectedRows: [] });
	}

	toggleSelection(key) {
		const keyIndex = this.state.selectedRows.indexOf(key);
		if (keyIndex >= 0) {
			this.setState({
				selectedRows: this.state.selectedRows.filter(item => item !== key)
			});
		} else {
			this.setState({ selectedRows: this.state.selectedRows.concat(key) });
		}
	}

	isSelected(key) {
		return (
			this.state.selectedRows.filter(item => item === key).length > 0 ||
			this.state.selectedAll
		);
	}

	headSelector() {
		return (
			<Checkbox
				value={this.state.selectedAll}
				onClick={e => {
					e.stopPropagation();
					this.toggleAll();
				}}
			/>
		);
	}

	toggleAll() {
		this.setState({ selectedAll: !this.state.selectedAll });
	}

	rowSelector(row) {
		const checked = this.isSelected(row[this.props.keyField]);
		return (
			<Checkbox
				value={checked}
				onClick={e => {
					const { shiftKey } = e;
					e.stopPropagation();
					this.toggleSelection(row[this.props.keyField], shiftKey, row);
				}}
			/>
		);
	}

	handleEditClick(row) {
		this.setState({ editingItem: row });
	}

	async deleteConfirmed() {
		this.setState({deleting: true});
		await this.props.deleteFunction(this.state.deletingItems);
		this.reloadData();
		this.setState({deleting: false, deletingItems: []});
	}

	render() {
		return (
			<Page className="dataTable">
				<div className="titleBar">
					<div className="titleBarLeft">Data Table de Usuarios</div>
					<div className="titleBarRight">
						<Button circle outline primary className="titleBarBtn">
							<i className="fa fa-file" />
						</Button>
						<Button circle outline primary className="titleBarBtn" onClick={()=>this.setState({filtrable: !this.state.filtrable})}>
							<i className="fa fa-filter" />
						</Button>
						<Button circle outline primary className="titleBarBtn" onClick={this.onAddClick}>
							<i className="fa fa-plus" />
						</Button>
						<Button circle outline primary className="titleBarBtn" onClick={this.onMultipleRemoveClick} disabled={this.state.selectedRows.length < 1 && !this.state.selectedAll}>
							<i className="fa fa-times" />
						</Button>
					</div>
				</div>
				<div className="datatable-content-body">
					<ReactTable
						manual
						filterable={this.state.filtrable}
						className="table"
						resizable={false}
						getTheadProps={() => ({ style: { boxShadow: "none" } })}
						getTrGroupProps={() => ({ style: { border: "none" } })}
						getTheadThProps={() => ({ className: "th" })}
						getTrProps={() => ({ className: "tr" })}
						getTdProps={() => ({ className: "td" })}
						data={this.state.data}
						onFetchData={this.onFetchDataReWrite}
						pages={this.state.pages}
						columns={this.state.columns}
						PaginationComponent={getPagination}
						totalCount={this.state.totalCount}
						defaultPageSize={5}
						loading={this.state.loading}
						noDataText="A busca não retornou nenhum resultado válido"
						loadingText="Carregando..."
					/>
				</div>
				<Modal
					isOpen={this.state.editingItem != null}
					className={this.props.editModalClassName}
					icon="fa-users"
				>
					<EditFormConnectByReduxForm
						form="uniqueFormId"
						initialValues={this.state.editingItem}
						editForm={this.props.editForm}
						onSave={this.onSaveClick}
						onCancel={this.onCancelClick}
					/>
				</Modal>
				<Modal
					isOpen={this.state.deletingItems.length > 0}
					icon="fa-trash"
					danger
					showTitle={false}
				>
					{this.state.selectedRows.length > 1 ? (
						<p>
							Deseja realmente remover os {this.state.selectedRows.length} itens selecionados ?
						</p>
					) : (
						<p>Deseja realmente apagar esse registro ?</p>
					)}
					<div style={{ textAlign: "right", marginTop: 15 }}>
						<Button flat primary bold onClick={this.deleteConfirmed} loading={this.state.deleting}>
							Sim
						</Button>
						<Button flat danger bold onClick={() => this.setState({deletingItems: []})} type="button">
							Não
						</Button>
					</div>
				</Modal>
			</Page>
		);
	}
}

const EditFormConnectByReduxForm = reduxForm()(props => (
	<form onSubmit={props.handleSubmit(props.onSave)}>
		<props.editForm />
		<div style={{ textAlign: "center", marginTop: 15 }}>
			<Button flat primary bold loading={props.submitting}>
				Salvar
			</Button>
			<Button flat danger bold onClick={props.onCancel} type="button">
				Cancelar
			</Button>
		</div>
	</form>
));

export const Column = () => null;

Column.propTypes = {
	header: PropTypes.string.isRequired,
	field: PropTypes.string.isRequired,
	filterMatchMode: PropTypes.oneOf([
		"eq",
		"ne",
		"startsWith",
		"endsWith",
		"contains",
		"gt",
		"gte",
		"lt",
		"lte",
		"regexp",
		"in",
		"notIn"
	])
};

Column.defaultProps = {
	filterMatchMode: "contains"
};

export default CrudDataTable;
