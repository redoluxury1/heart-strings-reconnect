
import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) => cn(
    "block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-100",
    isActive && "bg-slate-100"
  );

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex justify-end p-4">
        <button 
          onClick={onClose} 
          className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="px-4 py-2 space-y-1">
        <NavLink to="/" end className={getNavLinkClassName} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/during-conflict" className={getNavLinkClassName} onClick={onClose}>
          During Conflict
        </NavLink>
        <NavLink to="/post-conflict" className={getNavLinkClassName} onClick={onClose}>
          After Conflict
        </NavLink>
        <NavLink to="/bridge-the-gap" className={getNavLinkClassName} onClick={onClose}>
          Bridge the Gap
        </NavLink>
        <NavLink to="/love-notes" className={getNavLinkClassName} onClick={onClose}>
          Love Notes
        </NavLink>
        <NavLink to="/games" className={getNavLinkClassName} onClick={onClose}>
          Games
        </NavLink>
        <NavLink to="/archive" className={getNavLinkClassName} onClick={onClose}>
          Archive
        </NavLink>
      </nav>
    </div>
  );
};

export default NavbarMobileMenu;
