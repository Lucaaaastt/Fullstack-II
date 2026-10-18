import { Texto } from '../atoms/Texto';
import Selector from '../atoms/Selector';

function SelectorText({ titulo, opciones, value, onChange }) {
    return (
        <div>
            <Texto variant="label">{titulo}</Texto>
            <Selector
                opciones={opciones}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default SelectorText;