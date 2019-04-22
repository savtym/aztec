import React from 'react';
import cx from 'classnames';

import Styles from './Button.module.scss';



export const Types = {
	DEFAULT: Styles.default,
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


export default Button;