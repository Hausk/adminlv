import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import {
  BarChartIcon,
  Code,
  CreditCard,
  Edit2Icon,
  EyeIcon,
  FileClock,
  FilterIcon,
  HomeIcon,
  ImageIcon,
  Scale,
  Settings,
  ShoppingBasket,
  SquareGanttChart,
  UserIcon,
  Users2Icon,
  UsersIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <Link href="/" className={Sidebar.Header()}>
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
                Libre & Vivant
              </h3>
              <span className="text-xs font-medium text-default-500">
                Aller au site
              </span>
            </div>
          </div>
        </Link>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Statistiques"
              icon={<BarChartIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/works"}
                title="Photo Box"
                icon={<ImageIcon />}
                href="/works"
              />
              <SidebarItem
                isActive={pathname === "/payments"}
                title="Utilisateurs"
                icon={<UsersIcon />}
                href="/users"
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Edition"
                icon={<Edit2Icon />}
                href="/edit"
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Button onClick={() => signOut()} color={"danger"}>
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};
