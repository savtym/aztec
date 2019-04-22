import React, { Component } from 'react';
import ReactTable from 'react-table';

import {
	Button,
	QRCode,
	TextField,
} from 'components';

import 'react-table/react-table.css';
import Styles from './Tickets.module.scss';

import data from './data';


const columns = [
	{
		Header: 'First Name',
		accessor: 'firstName',
	},
	{
		Header: 'Second Name',
		accessor: 'secondName',
	},
	{
		Header: '# Train',
		accessor: 'numberTrain',
	},
	{
		Header: 'Railway Carriage',
		accessor: 'railwayCarriage',
	},
	{
		Header: 'Seat',
		accessor: 'seat',
	},
];

const emptyDataForTicket = {
	firstName: '',
	secondName: '',
	numberTrain: '',
	railwayCarriage: '',
	seat: '',
};


class Tickets extends Component {

	state = {
		tickets: data,
		clickedTicket: null,
		addTicket: { ...emptyDataForTicket },
	};


	onChangeField = (key) => ({ target }) => {
		const { addTicket } = this.state;

		this.setState({
			addTicket: {
				...addTicket,
				[key]: target.value,
			},
		});
	};


	onClickAddTicket = () => {
		const { addTicket, tickets } = this.state;

		this.setState({
			tickets: [...tickets, addTicket],
			addTicket: { ...emptyDataForTicket },
		});
	};


	getTdProps = (state, rowInfo) => ({
		onClick: (e, handleOriginal) => {
			if (rowInfo) {
				this.setState({
					clickedTicket: rowInfo.original,
				});
			}

			if (handleOriginal) {
				handleOriginal();
			}
		}
	});


	removeClickedTicket = () => {
		this.setState({
			clickedTicket: null,
		});
	};


	render() {
		const {
			tickets,
			addTicket,
			clickedTicket,
		} = this.state;

		const isDisabledAddBtn = !Object.values(addTicket).every(Boolean);

		return (
			<>
				<form onSubmit={this.onClickAddTicket}>
					<div className={Styles.fields}>
						<TextField
							value={addTicket.firstName}
							placeholder="First Name"
							onChange={this.onChangeField('firstName')}
						/>

						<TextField
							value={addTicket.secondName}
							placeholder="Second Name"
							onChange={this.onChangeField('secondName')}
						/>

						<TextField
							value={addTicket.numberTrain}
							type="number"
							placeholder="# Train"
							onChange={this.onChangeField('numberTrain')}
						/>

						<TextField
							value={addTicket.railwayCarriage}
							type="number"
							placeholder="Railway Carriage"
							onChange={this.onChangeField('railwayCarriage')}
						/>

						<TextField
							value={addTicket.seat}
							type="number"
							placeholder="Seat"
							onChange={this.onChangeField('seat')}
						/>
					</div>

					<Button
						onClick={this.onClickAddTicket}
						className={Styles.addButton}
						disabled={isDisabledAddBtn}
					>
						Add ticket
					</Button>
				</form>

				<ReactTable
					data={tickets}
					columns={columns}
					className={Styles.table}
					defaultPageSize={10}
					getTdProps={this.getTdProps}
				/>

				<QRCode
					data={clickedTicket}
					onCloseModal={this.removeClickedTicket}
				/>
			</>
		);
	}
}


export default Tickets;
