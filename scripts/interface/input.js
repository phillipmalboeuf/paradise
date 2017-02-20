

export const Input = props => {
	return <p>
		{props.label && <label>{props.label}</label>}
		<input name={props.name} 
			type={props.type ? props.type : 'text'}
			value={props.value}
			placeholder={props.placeholder}
			required={props.required ? true : false }
			autoFocus={props.autofocus ? true : false }
			onChange={props.onChange} />
	</p>
}