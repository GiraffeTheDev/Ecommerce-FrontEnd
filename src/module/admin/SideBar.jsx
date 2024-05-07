import React from "react";
import { Link } from "react-router-dom";
import { menu } from "../../utils/common";

const SideBar = () => {
  return (
    <div>
      <aside
        id="default-sidebar"
        className="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menu.length > 0 &&
              menu.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className="flex items-center p-2 py-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {item.icon}
                  <span className="ms-3">{item.title}</span>
                </Link>
              ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
