"use client";
import useUserData from "@/hooks/useUserData";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { DEFAULT_AVATAR_URL } from "@/utils/constants/insex";
import { getAvatarFilePreviewUrl, uploadFile } from "@/utils/user/userData";
import { setUser, storage } from "@/utils/user";

function Page(): JSX.Element {
  const { user, userData } = useUserData();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (!user) {
      redirect("/signin");
    }
  }, [user]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(userData?.avatarUrl || "");
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setAvatarFile(file);
      getAvatarFilePreviewUrl(file)
        .then((url: string) => {
          setAvatarUrl(url);
        })
        .catch((error) => {
          console.error("Error getting avatar file preview URL:", error);
        });
    }

    event.target.value = "";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const discardAvatarFile = () => {
    setAvatarFile(null);
    setAvatarUrl(userData?.avatarUrl || "");
    setIsChanged(false);
  };

  const saveUserAvatar = async () => {
    try {
      if (avatarFile && user) {
        const url = await uploadFile(
          storage,
          `/usersAvatars/${user.uid}.jpg`,
          avatarFile
        );
        await setUser(user.uid, { avatarUrl: url });
        discardAvatarFile();
      }
    } catch (error) {
      console.error("Error saving user avatar:", error);
    }
  };

  const saveUserInfo = async () => {
    if (user) {
      try {
        const newUserData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
        };

        await setUser(user?.uid, newUserData);
        setIsChanged(false);
      } catch (error) {
        console.error("Error saving user info:", error);
      }
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
      setIsChanged(true);
    };

  useEffect(() => {
    setAvatarUrl(userData?.avatarUrl || "");
    setFirstName(userData?.firstName || "");
    setLastName(userData?.lastName || "");
    setEmail(userData?.email || "");
    setPhoneNumber(userData?.phoneNumber || "");
    setIsChanged(false);
  }, [userData]);

  return (
    <div className={styles.slot_mar + " mt-5 h-screen"}>
      <div className="pl-5 pr-5">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
          Profile
        </h1>
      </div>
      <div className="flex space-x-4 pl-5 pr-5">
        <div
          className={
            styles.div_h +
            " items-center flex flex-col w-2/5 px-4 py-2 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700"
          }
        >
          <div className="h-fit group mt-5">
            <div className="relative overflow-hidden">
              <img
                className="rounded-lg w-36 h-36"
                src={avatarUrl || DEFAULT_AVATAR_URL}
                alt="Extra large avatar"
              />
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <div className="absolute h-full w-full bg-black/20 flex items-center justify-center rounded-lg -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={triggerFileInput}
                  className="bg-black/50 text-white py-2 px-5 rounded-lg"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="font-large font-bold mb-5 dark:text-white mt-5 mb-5">
            {user?.displayName}
          </div>
          {avatarFile && (
            <div className="flex space-x-4">
              <button
                onClick={discardAvatarFile}
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
              >
                Discard photo
              </button>
              <button
                onClick={saveUserAvatar}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Save photo
              </button>
            </div>
          )}
        </div>
        <div className="w-3/5 px-4 py-2 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="mt-5">
            <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">
              User information
            </p>
            <form className="max-w-lg">
              <div className="mb-5">
                <label
                  htmlFor="first-name-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  value={firstName}
                  onChange={handleInputChange(setFirstName)}
                  type="text"
                  id="first-name-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="last-name-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  value={lastName}
                  onChange={handleInputChange(setLastName)}
                  type="text"
                  id="last-name-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  type="email"
                  id="email-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="phone-number-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  value={phoneNumber}
                  onChange={handleInputChange(setPhoneNumber)}
                  type="text"
                  id="phone-number-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </form>
            <div className="mb-5 space-x-4">
              <button
                onClick={() => {
                  setAvatarUrl(userData?.avatarUrl || "");
                  setFirstName(userData?.firstName || "");
                  setLastName(userData?.lastName || "");
                  setEmail(userData?.email || "");
                  setPhoneNumber(userData?.phoneNumber || "");
                  setIsChanged(false);
                }}
                disabled={!isChanged}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Discard
              </button>
              <button
                onClick={saveUserInfo}
                disabled={!isChanged}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
