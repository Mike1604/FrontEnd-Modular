import { useState } from "react";
import { Link } from "react-router";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import "./SideBarSection.css";
import "./UIStyles.css";

export default function SideBarSection({ title, icon: Icon, options }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="sidebar-section-cont">
      <div onClick={toggleSection}>
        <div className="sidebar-section-title">
          {Icon && <Icon />}
          <h3>{title}</h3>
          {isOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </div>
        <hr className="divider" />
      </div>
      <ul className={`sidebar-section-options ${isOpen ? "open" : ""}`}>
        {options.map((option, index) => (
          <li key={index} className="sidebar-option">
            <Link to={option.route}>
              <h2>{option.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
