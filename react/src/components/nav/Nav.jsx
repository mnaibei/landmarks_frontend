import { Link } from 'react-router-dom';
import africa from '../../../public/africa.ico';

const Nav = () => (
  <nav className=" flex justify-between border-2 rounded shadow z-50 p-2 fixed w-full mb-2 top-0 bg-white items-center dark:bg-[#545252]">
    <div className="flex gap-2 items-center">
      <img src={africa} alt="africa" className="w-10 h-10" />
      <h1>African Wonders</h1>
    </div>
    <ul className="flex  gap-4 p-2 items-center">
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
