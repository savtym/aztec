import React from 'react';
import cx from 'classnames';

import Styles from './TextField.module.scss';


function TextField(props) {
	const {
		type,
		value,
		onChange,
		disabled,
		className,
		placeholder,
	} = props;

	return (
		<label className={cx(Styles.textField, {
			[Styles.disabled]: disabled,
		})}>
			<span className={Styles.title}>{placeholder}</span>

			<input
				type={type}
				value={value}
				onChange={onChange}
				disabled={disabled}
				placeholder={placeholder}
				className={cx(Styles.input, className)}
			/>
		</label>
	)
}


TextField.defaultProps = {
	type: 'text',
};


export default TextField;
