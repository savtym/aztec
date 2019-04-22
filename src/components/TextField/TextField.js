import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

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


TextField.propTypes = {
	type: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
};


export default TextField;
