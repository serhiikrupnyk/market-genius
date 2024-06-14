import React, { FC } from "react";

export const GoogleIcon: FC = () => (
  <svg
    width="15"
    height="17"
    style={{ display: "inline-block" }}
    viewBox="0 0 14 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2022_3538)">
      <path
        d="M14.6721 7.16065C14.6721 6.68482 14.6327 6.20641 14.5487 5.73828H7.8125V8.43388H11.6701C11.51 9.30321 10.9956 10.0723 10.2425 10.561V12.3101H12.5439C13.8954 11.0909 14.6721 9.2904 14.6721 7.16065Z"
        fill="#4285F4"
      />
      <path
        d="M7.81172 14.0005C9.73784 14.0005 11.3622 13.3805 12.5457 12.3106L10.2443 10.5615C9.604 10.9885 8.77737 11.2303 7.81431 11.2303C5.95115 11.2303 4.37139 9.99821 3.80457 8.3418H1.42969V10.1449C2.64206 12.5086 5.11141 14.0005 7.81172 14.0005Z"
        fill="#34A853"
      />
      <path
        d="M3.80383 8.3416C3.50468 7.4722 3.50468 6.53082 3.80383 5.66144V3.8584H1.43157C0.418642 5.83635 0.418642 8.16667 1.43157 10.1447L3.80383 8.3416Z"
        fill="#FBBC04"
      />
      <path
        d="M7.81172 2.77063C8.82987 2.75521 9.81393 3.13073 10.5513 3.82006L12.5903 1.82152C11.2993 0.633211 9.58566 -0.0201051 7.81172 0.00047172C5.11141 0.00047172 2.64206 1.49229 1.42969 3.85864L3.80195 5.66169C4.36615 4.00268 5.94852 2.77063 7.81172 2.77063Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0_2022_3538">
        <rect
          width="14"
          height="14"
          fill="white"
          transform="translate(0.671875)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const PersonIcon: FC = () => (
  <svg
    style={{ display: "inline-block" }}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 28"
    fill="none"
    stroke="#374151"
    strokeWidth="2.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-user"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const SettingsIcon: FC = () => (
  <svg
    style={{ display: "inline-block" }}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 28"
    fill="none"
    stroke="#374151"
    strokeWidth="2.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-settings"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const BankCardIcon: FC = () => (
  <svg
    style={{ display: "inline-block" }}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 28"
    fill="none"
    stroke="#374151"
    strokeWidth="2.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-credit-card"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

export const LogoutIcon: FC = () => (
  <svg
    style={{ display: "inline-block" }}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 28"
    fill="none"
    stroke="#374151"
    strokeWidth="2.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-log-out"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);
