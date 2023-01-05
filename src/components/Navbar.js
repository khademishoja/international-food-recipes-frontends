import "../pages/style.css";

const Navbar = (props) => {
  return (
    <>
      <div className="navbar">
        <ul classNameName="menu">
          <li>
            <a className="hasDropdown" href="#">
              Electronics <i className="fa fa-angle-down"></i>
            </a>
          </li>
          <li>
            <a className="hasDropdown" href="#">
              Appliances <i className="fa fa-angle-down"></i>
            </a>
          </li>
          <li>
            <a href="#">Kids</a>
          </li>
          <li>
            <a href="#">Men</a>
          </li>
          <li>
            <a href="#">Baby</a>
          </li>
          <li>
            <a href="#">Women</a>
          </li>
          <li>
            <a href="#">Furniture</a>
          </li>
          <li>
            <a href="#">Decors</a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Navbar;
