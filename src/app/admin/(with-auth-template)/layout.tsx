"use client";
import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Menu, MenuButton } from "@mui/base";
import {
  BankCardIcon,
  LogoutIcon,
  PersonIcon,
  SettingsIcon,
} from "@/icons/svgIcons";
import useUserData from "@/hooks/useUserData";
import { logout } from "@/firebase/auth/signOut";
import { DEFAULT_AVATAR_URL } from "@/utils/constants";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {

  }, [])
  const { user, userData } = useUserData();

  useEffect(() => {
    if(!user) {
      redirect("/signin")
    }
  }, [])

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuButtonClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/signin");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <div className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="flex h-14 items-center justify-between pl-5 pr-5 shadow-lg shadow-indigo-200/50">
          <p className="font-semibold flex justify-center">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            />
          </p>

          <div className="flex items-center gap-1">
            <Dropdown open={menuOpen} onClose={() => setMenuOpen(false)}>
              <MenuButton ref={buttonRef} onClick={handleMenuButtonClick}>
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    userData?.avatarUrl
                      ? userData?.avatarUrl
                      : DEFAULT_AVATAR_URL
                  }
                  alt="user photo"
                />
              </MenuButton>
              {menuOpen && (
                <Menu ref={menuRef} className="mt-3 shadow">
                  <div
                    id="dropdownInformation"
                    className="z-10 bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>{user?.displayName}</div>
                      <div className="font-medium truncate">{user?.email}</div>
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200 bg-white border-t border-gray-200"
                      aria-labelledby="dropdownInformationButton"
                    >
                      <li>
                        <Link
                          onClick={() => setMenuOpen(false)}
                          href="/admin/profile"
                          className="block px-4 py-2 hover:font-bold hover:bg-indigo-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <PersonIcon /> Profile
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:font-bold hover:bg-indigo-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <SettingsIcon /> Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:font-bold hover:bg-indigo-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <BankCardIcon /> Upgrade Plan
                        </a>
                      </li>
                    </ul>
                    <div className="py-2">
                      <p
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm hover:font-bold cursor-pointer text-gray-700 hover:bg-indigo-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        <LogoutIcon /> Sign out
                      </p>
                    </div>
                  </div>
                </Menu>
              )}
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex">
        <aside id="sidebar" className="fixed hidden z-20 h-full top-0 left-0 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-16 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white pt-5 divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className={
                        pathname.includes("/admin/dashboard")
                          ? "flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-100 bg-primary-100 group"
                          : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700 group"
                      }
                    >
                      <svg
                        className={
                          pathname.includes("/admin/dashboard")
                            ? "w-5 h-5 text-gray-500 transition duration-75 text-primary-900 group-hover:text-primary-900"
                            : "w-5 h-5 flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700 group"
                        }
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 21"
                      >
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                      </svg>
                      <span className="ms-3">Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <div  id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"><main>{children}</main></div>
      </div>
    </div>
  );
}
