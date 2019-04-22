import React, { Component } from 'react';
import Modal from 'react-modal';
import QRCodeReact from 'qrcode.react';
import { saveAs } from 'file-saver';

import { TextField, Button } from 'components';
import { sentenceCase } from 'utils';
import Styles from './QRCode.module.scss';


class QRCode extends Component {

	state = {
		isOpen: true,
	};

	qrCode = React.createRef();


	static getDerivedStateFromProps(props) {
		return {
			isOpen: Boolean(props.data),
		}
	}


	onCloseModal = () => {
		const { onCloseModal } = this.props;

		this.setState({
			isOpen: false,
		});

		onCloseModal && onCloseModal();
	};


	downloadQRCode = () => {
		if (!this.qrCode || !this.qrCode.current) {
			return;
		}

		const { data } = this.props;
		const canvas = this.qrCode.current.querySelector('canvas');

		canvas.toBlob((blob) => {
			saveAs(blob, Object.values(data).join(', '));
		});
	};


	render() {
		const { isOpen } = this.state;
		const { data } = this.props;

		return (
			<Modal
				isOpen={isOpen}
				ariaHideApp={false}
				contentLabel="QRCode"
				onRequestClose={this.onCloseModal}
			>
				<div className={Styles.header}>
					<h2>QR Code</h2>
					<button onClick={this.onCloseModal} className={Styles.close}>✖</button>
				</div>


				<div className={Styles.content}>
					{data ? (
						<>
							{Object.keys(data).map(key => (
								<TextField
									key={key}
									disabled
									value={data[key]}
									placeholder={sentenceCase(key)}
								/>
							))}

							<div className={Styles.QRCode} ref={this.qrCode}>
								<QRCodeReact
									size={380}
									value={JSON.stringify(data)}
								/>

								<Button
									className={Styles.downloadBtn}
									onClick={this.downloadQRCode}
								>
									Save QR Code
								</Button>
							</div>
						</>
					) : (
						<p>No content</p>
					)}
				</div>

			</Modal>
		);
	}
}


export default QRCode;
