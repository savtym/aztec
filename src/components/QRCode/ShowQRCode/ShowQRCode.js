import React from 'react';
import QRCodeReact from 'qrcode.react';
import PropTypes from 'prop-types';

import { Button, TextField } from 'components';
import { sentenceCase } from 'utils';

import Styles from './ShowQRCode.module.scss';


function ShowQRCode(props) {
	const {
		data,
		refQRCode,
		downloadQRCode,
	} = props;

	return (
		<>
			{Object.keys(data).map(key => (
				<TextField
				key={key}
				disabled
				value={data[key]}
				placeholder={sentenceCase(key)}
				/>
			))}

			<div className={Styles.QRCode} ref={refQRCode}>
				<QRCodeReact
					size={380}
					value={JSON.stringify(data)}
				/>

				<Button
					className={Styles.downloadBtn}
					onClick={downloadQRCode}
				>
					Save QR Code
				</Button>
			</div>
		</>
	);
}


ShowQRCode.propTypes = {
	data: PropTypes.object,
	refQRCode: PropTypes.object.isRequired,
	downloadQRCode: PropTypes.func.isRequired,
};


export default ShowQRCode;
