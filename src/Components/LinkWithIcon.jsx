import React from "react";
import { NavLink } from "react-router-dom";
import "./LinkWithIcon.css";
const LinkWithIcon = ({ title, link, emoji, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center  sidebar_link" : "align_center"}
    >
      {title} <img src={emoji} alt="" className="link_emoji" />
    </NavLink>
  );
};

export default LinkWithIcon;
// here we make this component reusable by passsing three props title ie home
// link to psss in href, and emoji tat u will pass as image
