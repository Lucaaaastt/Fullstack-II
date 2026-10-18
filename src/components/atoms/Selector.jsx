function Selector({opciones, value, onChange}) {
    return (
        <select value={value} onChange={onChange}>
            {opciones.map((opcion) => (
                <option key={opcion} value={opcion}>
                    {opcion}
                </option>
            ))}
        </select>
    )
}

export default Selector;