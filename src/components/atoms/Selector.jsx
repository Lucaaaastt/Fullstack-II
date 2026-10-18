function Selector({opciones}) {
    return (
        <select>
            {opciones.map((opcion, index) => (
                <option key={index} value={opcion}> {opcion} </option>
            ))}
        </select>
    )
}

export default Selector;