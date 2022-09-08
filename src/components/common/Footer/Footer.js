import React from "react";
//import Link from "next/link";
import {Link} from "react-router-dom";

import {
  FooterBlock,
  Logo,
  LogoWrapper,
  LogoImageHolder,
  LogoImage,
  LogoWords,
  FooterNav,
  NavEntry,
} from "./StyledFooter";

import { useUserDataContext } from "../../../context/UserDataContext.js";
import HamburgerMenu from "../HamburgerMenu";

export default function Footer() {
  const { userData } = useUserDataContext();
 
  return (
    <FooterBlock>
      <Logo>
        <LogoWrapper>
          <Link to="/" replace>
            <a>
              <LogoImageHolder>
                🧠
              </LogoImageHolder>
              <LogoWords>AI Garden</LogoWords>
            </a>
          </Link>
        </LogoWrapper>
      </Logo>
      <FooterNav>
        <Link to="/" replace>
          <a>
            <NavEntry>HOME</NavEntry>
          </a>
        </Link>
      </FooterNav>
      <div />
      <HamburgerMenu />
    </FooterBlock>
  );
}
