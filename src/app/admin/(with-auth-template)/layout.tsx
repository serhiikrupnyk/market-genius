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
import { DEFAULT_AVATAR_URL } from "@/utils/constants/insex";
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
      <div className="sticky">
        <div className="flex h-14 items-center justify-between pl-5 pr-5 shadow-lg shadow-indigo-500/50">
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
                        <a
                          href="#"
                          className="block px-4 py-2 hover:font-bold hover:bg-indigo-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <PersonIcon /> Profile
                        </a>
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
        <aside
          id="default-sidebar"
          className="h-screen w-[300px] items-center shadow-xl shadow-indigo-500/100"
        >
          <div className="flex h-screen flex-col pt-7">
            <div className="flex h-full grow flex-col px-5 pb-8">
              <div className="mb-10 flex flex-col gap-10">
                <nav className="flex flex-col gap-1 list-none">
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
                            : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700 group"
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
                </nav>
              </div>
            </div>
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
