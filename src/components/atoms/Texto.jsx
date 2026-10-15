export function Texto({ variant = 'p', children, className = '', ...props }) {
  const Component = variant;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}