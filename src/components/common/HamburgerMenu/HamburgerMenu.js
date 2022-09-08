import React from "react";
import Link from "next/link";
import Image from "next/image";
import { slide as SlideHamburgerMenu } from "react-burger-menu";
import style from "./HamburgerMenu.module.css";
import logoMonogramImage from "../../../images/logo-monogram.png?webp";
import Logout from "../../../utils/Logout";
import { env } from "../../../utils/EnvironmentVariables";
import { useUserDataContext } from "../../../context/UserDataContext";

function HamburgerMenu() {
  const { userData } = useUserDataContext();
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Called when the open/close state of the menu changes (onStateChange callback)
  const isMenuOpen = (state) => {
    setMenuOpen(state.isOpen);
  };

  // Called whenever a navigation item in the menu is clicked (closes menu)
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <SlideHamburgerMenu
      right
      className={style.menuBody}
      overlayClassName={style.overlay}
      isOpen={menuOpen}
      burgerButtonClassName={style.burgerButton}
      burgerBarClassName={style.burgerBar}
      crossButtonClassName={style.crossButton}
      crossClassName={style.crossClass}
      onStateChange={isMenuOpen}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#1c1c1c",
          color: "#d9d9d9",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={style.Logo} onClick={handleNavClick}>
          <div className={style.LogoWrapper}>
            <Link href={"/"} passHref>
              <a className="nav-link">
                <div className={style.LogoImageHolder}>
                  <Image
                    alt="Logo"
                    src={logoMonogramImage}
                    className={style.LogoImage}
                    width="144"
                    height="144"
                  />
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className={style.HeaderNav} onClick={handleNavClick}>
            <Link href={"/"} passHref>
              <a className="nav-link">
                <div className={style.navEntry}>HOME</div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </SlideHamburgerMenu>
  );
}

export default HamburgerMenu;
