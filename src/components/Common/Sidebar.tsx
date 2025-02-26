import React, { useContext, useState } from "react";
import DashboardIcon from "../icons/DashboardIcon";
import InboxIcon from "../icons/InboxIcon";
import NotesIcon from "../icons/NotesIcon";
import TodoIcon from "../icons/TodoIcon";
import SettingsIcon from "../icons/SettingsIcon";
import { JSX } from "react/jsx-runtime";
import clsx from "clsx";
import logo from "../../assets/logo.svg";
import { CreateAppLevelContext } from "../../contexts/AppContext";
import { HiOutlineXCircle } from "react-icons/hi";

type IconType = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => JSX.Element;
interface SidebarLinkInterface {
  href: string;
  icon: IconType;
  title: string;
}

const sidebarLinks: SidebarLinkInterface[] = [
  { href: "/calendar", icon: DashboardIcon, title: "Calendar" },
  { href: "/inbox", icon: InboxIcon, title: "Inbox" },
  { href: "/notes", icon: NotesIcon, title: "Notes" },
  { href: "/todo-list", icon: TodoIcon, title: "Todo List" },
  { href: "/settings", icon: SettingsIcon, title: "Settings" },
];

const Sidebar = () => {
  const [active, setActive] = useState("/calendar");
  const { state, setState } = useContext(CreateAppLevelContext);
  return (
    <aside
      className={clsx(
        "fixed top-0 -left-full z-[99] h-full w-[280px] shrink-0 bg-white py-8 shadow-xl duration-200 lg:static lg:shadow-none",
        state.showSidebar ? "left-0" : "-left-full",
      )}
    >
      <button
        className="absolute top-4 right-4 cursor-pointer lg:hidden"
        onClick={() =>
          setState?.((n) => ({ ...n, showSidebar: !n.showSidebar }))
        }
      >
        <HiOutlineXCircle size={24} className="lg:hidden" />
      </button>
      <div className="py-12 pt-6">
        <img className="m-auto h-auto w-[175px]" src={logo} />
      </div>

      <div className="flex w-full flex-col">
        {sidebarLinks.map((link) => (
          <a
            className={clsx(
              "flex w-full items-center gap-4 border-r-4 border-transparent p-4 text-lg font-medium uppercase",
              active === link.href
                ? "text-sidebar-text-active bg-sidebar-active border-r-sidebar-border-active"
                : "text-sidebar-text-default",
            )}
            href="#"
            onClick={() => setActive(link.href)}
          >
            <link.icon
              className=""
              stroke={active === link.href ? "#4F35F3" : "#65676D"}
            />
            {link.title}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
