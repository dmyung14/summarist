"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Search from "../components/Search";
import AuthModalWrapper from "../components/AuthModalWrapper";
import navStyles from "@/app/styles/Navbar.module.css";
import searchStyles from "@/app/styles/Search.module.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div style={{ display: "flex" }}>
      <Navbar isOpen={isOpen} />
      {isOpen && (
        <div
          className={searchStyles.sidebar__overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={navStyles.app__content}>
        <Search onMenuToggle={() => setIsOpen((prev) => !prev)} />
        <main>{children}</main>
      </div>
      <AuthModalWrapper />
    </div>
  );
}
