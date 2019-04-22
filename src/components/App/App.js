import React from 'react';
import moment from 'moment';

import { Tickets } from 'components';

import Styles from './App.module.scss';


const years = `2019-${moment().year()}`;


function App() {
	return (
		<>
			<header className={Styles.header}>
				QR code for train tickets
			</header>

			<div className={Styles.content}>
				<Tickets />
			</div>

			<footer className={Styles.footer}>
				Copyright © {years} Tymofii Savytskyi
			</footer>
		</>
	);
}


export default App;