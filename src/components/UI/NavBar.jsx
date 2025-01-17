import SearchBar from "./SearchBar";
import NavBarStyles from "./NavBar.module.css"

export default function NavBar({gridClass}) {
   

  return (
    <nav className={`${gridClass || ''}`}>
      <SearchBar className={NavBarStyles["searchBar"]}></SearchBar>
      <div>
        hola
      </div>
    </nav>
  );
}
