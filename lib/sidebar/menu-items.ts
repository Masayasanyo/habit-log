import { IconHelp, IconHome, IconPencil, IconSearch, IconSettings } from "@tabler/icons-react";

// Menu items.
export const items = {
  user: {
    name: "Test User",
    email: "test@gmail.com",
    avatar: "",
  },
  navMain: [
    {
      title: "ホーム",
      url: "/dashboard",
      icon: IconHome,
    },
    {
      title: "日記",
      url: "/dashboard/diary",
      icon: IconPencil,
    },
  ],
  navSecondary: [
    {
      title: "設定",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "ヘルプ",
      url: "/dashboard/help",
      icon: IconHelp,
    },
    {
      title: "探す",
      url: "/dashboard/search",
      icon: IconSearch,
    },
  ],
};
