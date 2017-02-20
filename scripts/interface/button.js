

export const Button = props => {
	return <button
		className={props.underline && 'button--underline'}
		onClick={(e)=> {
			e.currentTarget.blur()
			if (props.onClick) {props.onClick(e)}
		}}>{props.label}</button>
}