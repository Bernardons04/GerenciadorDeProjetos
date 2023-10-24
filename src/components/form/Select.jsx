import styles from './Select.module.css'


function Select({text, name, options, handleOnChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>
                {text}
            </label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
                
                {options && options.length > 0 && options.map((option) => (
                    <option value={option.name} key={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select