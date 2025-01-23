import { useState } from "react";
import { Link } from "react-router";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

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
          <ArrowRightIcon className={`${isOpen ? "icon-active" : ""}`}/>
        </div>
        <hr className="divider" />
      </div>
      <ul className={`sidebar-section-options ${isOpen ? "open" : ""}`}>
        {options.map((option, index) => (
          <Link to={option.route} key={index}>
            <li className="sidebar-option">
              <h2>{option.title}</h2>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
