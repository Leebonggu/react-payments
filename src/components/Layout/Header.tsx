import { Link } from 'react-router-dom';
import { Props } from '.';
import { BackArrow } from '../Common/Icon';

function Header({ headerTitle, goBack }: Props) {
  return (
    <h2 className="px-6 py-4 flex items-center">
      {goBack ? (
        <Link to={goBack ?? ''}>
          <BackArrow />
        </Link>
      ) : null}
      {headerTitle}
    </h2>
  );
}

export default Header;
