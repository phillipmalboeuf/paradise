

export const Grid = props => {
	return <div className={'grid' + (props.center && ' grid--center') + (props.guttered && ' grid--guttered')}>{props.children}</div>
}