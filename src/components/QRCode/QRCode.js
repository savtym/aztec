import React, { Component } from 'react';
import Modal from 'react-modal';
import { saveAs } from 'file-saver';


import ShowQRCode from './ShowQRCode';
import ReaderQRCode from './ReaderQRCode';
import Styles from './QRCode.module.scss';


class QRCode extends Component {

	state = {
		isOpen: false,
	};

	qrCode = React.createRef();


	static getDerivedStateFromProps(props) {
		return {
			isOpen: Boolean(props.data) || Boolean(props.isDownload),
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
		const {
			data,
			addData,
			isDownload,
		} = this.props;

		let component = (
			<p>No content</p>
		);

		if (data) {
			component = (
				<ShowQRCode
					data={data}
					refQRCode={this.qrCode}
					downloadQRCode={this.downloadQRCode}
				/>
			);
		}

		if (isDownload) {
			component = (
				<ReaderQRCode addData={addData} />
			);
		}

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
					{component}
				</div>
			</Modal>
		);
	}
}


export default QRCode;
