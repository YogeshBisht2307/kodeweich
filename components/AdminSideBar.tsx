"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { 
  LayoutDashboard,
  Spotlight,
  Layers,
  User,
  FrameIcon,
  Settings,
  ChevronLeft
} from "lucide-react";



interface NavItems {
    label: string;
    icon: React.ReactElement | undefined;
    link: string;
    isParent: boolean;
    subMenu?: SubmenuItems[];
}

interface SubmenuItems {
    label: string;
    link: string;
}


const sideMenu: NavItems[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard/>,
    link: "/admin/dashboard",
    isParent: false,
  },
  {
    label: "Posts",
    icon: <Spotlight/>,
    link: "/admin/posts",
    isParent: false,
  },
  {
    label: "Categories",
    icon: <Layers/>,
    link: "/admin/categories",
    isParent: false,
  },
  {
    label: "Tags",
    icon: <FrameIcon/>,
    link: "/admin/tags",
    isParent: false,
  },
  {
    label: "Users",
    icon: <User/>,
    link: "/admin/users",
    isParent: false,
  },
  {
    label: "Settings",
    icon: <Settings/>,
    link: "/admin/settings",
    isParent: true,
    subMenu: [
      {
        label: "Profile",
        link: "/admin/settings/profile",
      },
      {
        label: "Preferences",
        link: "/admin/settings/preferences",
      },
    ],
  }
]


const AdminSideBar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    return (
        <>
            <aside className={`${
                isCollapsed ? "w-20" : "w-60"
            } bg-background text-foreground border border-secondary pt-4 rounded-md h-4/6 transition-all duration-300 ease-in-out`} aria-label="Sidebar">
                <div className="h-full pb-4 overflow-y-auto flex flex-col">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="self-end mr-2 p-1 rounded hover:bg-secondary transition-colors"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <ChevronLeft className={`w-5 h-5 transition-transform ${
                            isCollapsed ? "rotate-180" : ""
                        }`} />
                    </button>
                    <ul className="space-y-2 font-medium px-3">
                        {sideMenu.map((menu) => (
                            <li 
                                key={menu.link}
                            >
                                <Link 
                                    href={menu.link} 
                                    className={`${
                                        pathname.startsWith(menu.link) ? "bg-primary text-primary-foreground" : ""
                                    } flex p-2 rounded-lg hover:bg-primary hover:text-primary-foreground group ${
                                        isCollapsed ? "" : ""
                                    }`}
                                    title={isCollapsed ? menu.label : ""}
                                >
                                    {menu.icon}
                                    {!isCollapsed && <span className="ml-3">{menu.label}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default AdminSideBar;