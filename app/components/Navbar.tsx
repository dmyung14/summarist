"use client"

import React from "react";
import style from "@/app/styles/Navbar.module.css";
import Image from "next/image";
import Logo from "@/app/assets/logofor-you.png";
import Link from "next/link";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BiPencil, BiLogOut } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authSlice";
import { logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <nav className={style.nav}>
        <div className={style.navbar__logo}>
          <Image src={Logo} alt="Summarist Logo" />
        </div>
        <div className={style.navbar__wrapper}>
          <div className={style.navbar__top}>
            <Link href="/for-you" className={style["navbar__link--wrapper"]}>
              <div
                className={`${style["navbar__link--line"]} ${style["active--tab"]}`}
              ></div>
              <div className={style["navbar__icon--wrapper"]}>
                <AiFillHome />
              </div>
              <div className={style["navbar__link--text"]}>For you</div>
            </Link>
            <Link href="/library" className={style["navbar__link--wrapper"]}>
              <div className={`${style["navbar__link--line"]}`}></div>
              <div className={style["navbar__icon--wrapper"]}>
                <BsBookmark />
              </div>
              <div className={style["navbar__link--text"]}>My Library</div>
            </Link>
            <Link href="/highlights" className={style["navbar__link--wrapper"]}>
              <div className={`${style["navbar__link--line"]}`}></div>
              <div className={style["navbar__icon--wrapper"]}>
                <BiPencil />
              </div>
              <div className={style["navbar__link--text"]}>Highlights</div>
            </Link>
            <Link href="/search" className={style["navbar__link--wrapper"]}>
              <div className={`${style["navbar__link--line"]}`}></div>
              <div className={style["navbar__icon--wrapper"]}>
                <AiOutlineSearch />
              </div>
              <div className={style["navbar__link--text"]}>Search</div>
            </Link>
          </div>
          <div className={style.navbar__bottom}>
            <Link href="/settings" className={style["navbar__link--wrapper"]}>
              <div className={`${style["navbar__link--line"]}`}></div>
              <div className={style["navbar__icon--wrapper"]}>
                <AiOutlineSetting />
              </div>
              <div className={style["navbar__link--text"]}>Settings</div>
            </Link>
            <div className={style["navbar__link--wrapper"]}>
              <div className={`${style["navbar__link--line"]}`}></div>
              <div className={style["navbar__icon--wrapper"]}>
                <AiOutlineQuestionCircle />
              </div>
              <div
                className={`${style["navbar__link--text"]} ${style["navbar__link--not-allowed"]}`}
              >
                Help & Support
              </div>
            </div>
            {user ? (
              <div
                className={style["navbar__link--wrapper"]}
                onClick={() => dispatch(logout())}
              >
                <div className={`${style["navbar__link--line"]}`}></div>
                <div className={style["navbar__icon--wrapper"]}>
                  <BiLogOut />
                </div>
                <div className={style["navbar__link--text"]}>Logout</div>
              </div>
            ) : (
              <div
                className={style["navbar__link--wrapper"]}
                onClick={() => dispatch(openModal())}
              >
                <div className={`${style["navbar__link--line"]}`}></div>
                <div className={style["navbar__icon--wrapper"]}>
                  <BiLogOut style={{ transform: "rotate(180deg)" }} />
                </div>
                <div className={style["navbar__link--text"]}>Login</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
