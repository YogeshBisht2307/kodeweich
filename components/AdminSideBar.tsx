"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { 
  DashboardIcon,
  ReaderIcon,
  StackIcon,
  PersonIcon,
  FrameIcon,
  GearIcon
} from "@radix-ui/react-icons";



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
    icon: <DashboardIcon/>,
    link: "/admin/dashboard",
    isParent: false,
  },
  {
    label: "Posts",
    icon: <ReaderIcon/>,
    link: "/admin/posts",
    isParent: false,
  },
  {
    label: "Categories",
    icon: <StackIcon/>,
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
    icon: <PersonIcon/>,
    link: "/admin/users",
    isParent: false,
  },
  {
    label: "Settings",
    icon: <GearIcon/>,
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
    return (
        <>
            <aside className={`w-60 bg-background text-foreground border border-secondary pt-4 rounded-md h-4/6`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {sideMenu.map((menu) => (
                            <li 
                                key={menu.link}
                            >
                                <Link href={menu.link} className={`${pathname.startsWith(menu.link) ? "bg-primary text-primary-foreground" : ""} flex items-center p-2 rounded-lg hover:bg-primary hover:text-primary-foreground group`}>
                                    {menu.icon}
                                    <span className="ml-3">{menu.label}</span>
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