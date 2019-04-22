import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Styles from './Button.module.scss';


export const Types = {
	DEFAULT: Styles.default,
	PRIMARY: Styles.primary,
};


function Button(props) {
	const {
		type,
		children,
		disabled,
		className,
		onClick,
	} = props;


	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={cx(Styles.btn, type, className)}
		>
			{children}
		</button>
	);
}


Button.defaultProps = {
	type: Types.DEFAULT,
};

Button.propTypes = {
	disabled: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.oneOf(Object.values(Types)),
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};


export default Button;