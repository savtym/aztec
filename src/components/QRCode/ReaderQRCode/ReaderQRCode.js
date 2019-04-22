import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';

import {
	Button,
	ButtonTypes,
	TextField,
} from 'components';
import { sentenceCase } from 'utils';
import Styles from './ReaderQRCode.module.scss';


class ReaderQRCode extends Component {

	state = {
		data: {},
	};

	qrReader1 = React.createRef();

	onScan = (data) => {
		this.setState({
			data: JSON.parse(data) || {},
		});
	};


	handleError = (err) => {
		console.error(err);
	};


	openImageDialog = () => {
		if (!this.qrReader1 || !this.qrReader1.current) {
			return
		}

		this.qrReader1.current.openImageDialog()
	};


	onClickAddTicket = () => {
		const { data } = this.state;
		const { addData } = this.props;

		addData && addData(data);
	};


	render() {
		const { data } = this.state;

		const keysData = Object.keys(data);

		return (
			<>
				<Button
					className={Styles.submit}
					onClick={this.openImageDialog}
				>Submit QR Code</Button>

				<div className={Styles.data}>
					{keysData.map(key => (
						<TextField
							key={key}
							disabled
							value={data[key]}
							placeholder={sentenceCase(key)}
						/>
					))}

					{keysData.length === 0 ? (
						<p>No content</p>
					) : (
						<Button
							className={Styles.addBtn}
							type={ButtonTypes.PRIMARY}
							onClick={this.onClickAddTicket}
						>Add data to table</Button>
					)}
				</div>

				<QrReader
					legacyMode
					ref={this.qrReader1}
					onError={this.handleError}
					onScan={this.onScan}
					style={{
						width: 380,
					}}
				/>
			</>
		);
	}
}


export default ReaderQRCode;