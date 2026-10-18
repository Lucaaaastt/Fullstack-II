import { Texto } from '../atoms/Texto';
import Selector from '../atoms/Selector';

function SelectorText({ titulo, opciones }) {
    return (
        <div>
            <Texto variant="label">{titulo}</Texto>
            <Selector opciones={opciones} />
        </div>
    );
}

export default SelectorText;