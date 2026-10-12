import { Texto } from '../atoms/Texto';

export function Texts({ items = [] }) {
  return (
    <>
      {items.map((item, index) => (
        <Texto key={index} variant={item.variant} className={item.className}>
          {item.text}
        </Texto>
      ))}
    </>
  );
}


