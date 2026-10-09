import { Link } from 'react-router-dom';

export function Enlace({ href, children, icon, className = '', ...props }) {
  const content = (
    <>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </>
  );

  if (href?.startsWith('/')) {
    return <Link to={href} className={className} {...props}>{content}</Link>;
  }

  return <a href={href} className={className} {...props}>{content}</a>;
}


