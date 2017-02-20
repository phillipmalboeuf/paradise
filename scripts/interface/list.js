

export const List = props => {
	return <ol className='list--boxes'>{props.children}</ol>
}

export const ListItem = props => {
	return <li className='grid grid--spaced'>{props.children}</li>
}