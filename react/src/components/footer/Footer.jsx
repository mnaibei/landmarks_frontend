import africa from '../../assets/africa.png';

const Footer = () => (
  <footer className="p-2 flex items-center border-2 rounded shadow fixed w-full bg-white dark:bg-[#545252] bottom-0 justify-between">
    <div className="flex items-center gap-2">
      <img src={africa} alt="africa" className="w-10 h-10" />
      <p>Placeholder</p>
    </div>
    <div>
      &copy; 2023 by MNaibei
    </div>
  </footer>
);

export default Footer;
