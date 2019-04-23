import React, { Component } from 'react';
import ReactTable from 'react-table';

import {
	Button,
	ButtonTypes,
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

const TICKETS = 'TICKETS';
const tickets = localStorage.getItem(TICKETS);


class Tickets extends Component {

	state = {
		clickedTicket: null,
		addTicket: { ...emptyDataForTicket },
		tickets: tickets ? JSON.parse(tickets) : data,
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


	addDataToTable = (data) => {
		const { tickets } = this.state;

		this.setState({
			tickets: [...tickets, data],
			isDownloadQRCode: false,
		});
	};


	removeClickedTicket = () => {
		this.setState({
			clickedTicket: null,
			isDownloadQRCode: false,
		});
	};


	onClickDownloadQRCode = () => {
		this.setState({
			isDownloadQRCode: true,
		})
	};


	onClickSaveToLocalStorage = () => {
		const { tickets } = this.state;

		localStorage.setItem(TICKETS, JSON.stringify(tickets));
	};


	render() {
		const {
			tickets,
			addTicket,
			clickedTicket,
			isDownloadQRCode,
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

				<Button
					type={ButtonTypes.PRIMARY}
					className={Styles.addButton}
					onClick={this.onClickDownloadQRCode}
				>
					Add ticket from QR Code
				</Button>

				<Button
					type={ButtonTypes.WARNING}
					className={Styles.addButton}
					onClick={this.onClickSaveToLocalStorage}
				>
					Save to Local Storage
				</Button>

				<ReactTable
					data={tickets}
					columns={columns}
					className={Styles.table}
					defaultPageSize={10}
					getTdProps={this.getTdProps}
				/>

				<QRCode
					addData={this.addDataToTable}
					data={clickedTicket}
					isDownload={isDownloadQRCode}
					onCloseModal={this.removeClickedTicket}
				/>
			</>
		);
	}
}


export default Tickets;
