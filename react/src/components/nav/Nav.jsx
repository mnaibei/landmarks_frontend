import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className=" flex justify-between border-2 shadow z-50 p-2 sticky top-0 bg-white items-center">
    <h1>Placeholder</h1>
    <ul className="flex  gap-4 p-2">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">Sign out</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
