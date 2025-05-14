
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface NavbarDesktopLinksProps {
  hasNewLoveNote?: boolean;
  onViewLoveNote?: () => void;
}

const getNavLinkClassName = ({isActive}: {isActive: boolean}) => cn(
  "px-3 py-2 text-sm font-medium rounded-md text-slate-900 hover:bg-slate-100 transition-colors",
  isActive && "bg-slate-100 font-semibold"
);

const NavbarDesktopLinks: React.FC<NavbarDesktopLinksProps> = ({ hasNewLoveNote, onViewLoveNote }) => {
  return (
    <div className="hidden md:flex items-center space-x-1">
      <NavLink to="/" end className={getNavLinkClassName}>
        Home
      </NavLink>
      <NavLink to="/during-conflict" className={getNavLinkClassName}>
        During Conflict
      </NavLink>
      <NavLink to="/post-conflict" className={getNavLinkClassName}>
        After Conflict
      </NavLink>
      <NavLink to="/bridge-the-gap" className={getNavLinkClassName}>
        Bridge the Gap
      </NavLink>
      <NavLink to="/love-notes" className={getNavLinkClassName}>
        Love Notes
      </NavLink>
      <NavLink to="/games" className={getNavLinkClassName}>
        Games
      </NavLink>
      <NavLink to="/archive" className={getNavLinkClassName}>
        Archive
      </NavLink>
    </div>
  );
};

export default NavbarDesktopLinks;
