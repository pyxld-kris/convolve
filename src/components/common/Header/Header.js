import React from "react";
//import Link from "next/link";
import { Link } from "react-router-dom";

import {
  HeaderBlock,
  HeaderNav,
  Logo,
  LogoImageHolder,
  LogoWords,
  LogoWrapper,
  NavEntry,
} from "./StyledHeader";

import { useUserDataContext } from "../../../context/UserDataContext.js";
import HamburgerMenu from "../HamburgerMenu";

export default function Header() {
  const { userData } = useUserDataContext();

  return (
    <HeaderBlock>
      <Logo>
        <LogoWrapper>
          <Link to="/" replace>
            <a>
              <LogoImageHolder>🧠</LogoImageHolder>
              <LogoWords>AI Garden</LogoWords>
            </a>
          </Link>
        </LogoWrapper>
      </Logo>
      <HeaderNav>
        <Link to="/" replace>
          <a>
            <NavEntry>HOME</NavEntry>
          </a>
        </Link>
        <Link to="/documentation" replace>
          <a>
            <NavEntry>DOCS</NavEntry>
          </a>
        </Link>
      </HeaderNav>
      <div />
      <HamburgerMenu />
    </HeaderBlock>
  );
}
