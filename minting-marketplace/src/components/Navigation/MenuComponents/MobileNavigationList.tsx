import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import MobileEditProfile from './MobileEditProfile';

import { ColorChoice } from '../../../ducks/colors/colorStore.types';
import useConnectUser from '../../../hooks/useConnectUser';
import { NavFooter, NavFooterBox } from '../../Footer/FooterItems/FooterItems';
import TalkSalesComponent from '../../Header/HeaderItems/TalkToSalesComponent/TalkSalesComponent';
import { BackBtnMobileNav } from '../NavigationItems/NavigationItems';

interface IMobileNavigationList {
  messageAlert: string | null;
  setMessageAlert: (arg: string | null) => void;
  primaryColor: ColorChoice;
  currentUserAddress: string | undefined;
  toggleMenu: (otherPage?: string) => void;
  setTabIndexItems: (arg: number) => void;
  isSplashPage: boolean;
  click: boolean;
}

const MobileNavigationList: React.FC<IMobileNavigationList> = ({
  messageAlert,
  setMessageAlert,
  primaryColor,
  toggleMenu,
  currentUserAddress,
  // setTabIndexItems,
  isSplashPage,
  click
}) => {
  // const goToMyItems = (tab: number) => {
  //   setTabIndexItems(tab);
  //   toggleMenu();
  // };

  const [copyEth, setCopyEth] = useState<boolean>(false);

  const { logoutUser } = useConnectUser();

  useEffect(() => {
    setCopyEth(false);

    return () => {
      setCopyEth(false);
    };
  }, [messageAlert, click]);

  return (
    <NavFooter>
      {messageAlert && messageAlert === 'notification' ? (
        <NavFooterBox
          className="nav-header-box-mobile"
          primaryColor={primaryColor}>
          <BackBtnMobileNav onClick={() => setMessageAlert(null)}>
            <i className="fas fa-chevron-left"></i>
          </BackBtnMobileNav>
          <li>You don’t have notifications yet</li>
        </NavFooterBox>
      ) : messageAlert === 'profile' ? (
        <NavFooterBox
          className="nav-header-box-mobile"
          primaryColor={primaryColor}>
          <BackBtnMobileNav onClick={() => setMessageAlert(null)}>
            <i className="fas fa-chevron-left"></i>
          </BackBtnMobileNav>
          {/* <li onClick={() => setMessageAlert('profileEdit')}>
            Personal Profile <i className="fal fa-edit" />
          </li> */}
          <li onClick={() => toggleMenu()}>
            <NavLink to={`/${currentUserAddress}`}>View Profile</NavLink>
          </li>
          {currentUserAddress && (
            <li
              onClick={() => {
                navigator.clipboard.writeText(currentUserAddress);
                setCopyEth(true);
              }}>
              {copyEth ? 'Copied!' : 'Copy your eth address'}
            </li>
          )}
        </NavFooterBox>
      ) : messageAlert === 'profileEdit' ? (
        <NavFooterBox
          className="nav-header-box-mobile"
          primaryColor={primaryColor}
          messageAlert={messageAlert}>
          <BackBtnMobileNav onClick={() => setMessageAlert('profile')}>
            <i className="fas fa-chevron-left"></i>
          </BackBtnMobileNav>
          <li>
            Personal Profile <i className="fal fa-edit" />
          </li>
          <MobileEditProfile />
        </NavFooterBox>
      ) : (
        <NavFooterBox
          className="nav-header-box-mobile"
          primaryColor={primaryColor}>
          {/* {!isSplashPage && (
            <li onClick={() => toggleMenu()}>
              <NavLink to="/about-page">About</NavLink>
            </li>
          )} */}
          <li>
            <a
              href="https://etherscan.io/token/0xc76c3ebea0ac6ac78d9c0b324f72ca59da36b9df"
              target={'_blank'}
              rel="noreferrer">
              Token
            </a>
          </li>
          {/* {currentUserAddress && (
            <li onClick={() => toggleMenu()}>
              <NavLink to={`/${currentUserAddress}`}>View Profile</NavLink>
            </li>
          )} */}
          {/* {currentUserAddress && (
            <li
              onClick={() => {
                navigator.clipboard.writeText(currentUserAddress);
                setCopyEth(true);
              }}>
              {copyEth ? 'Copied!' : 'Copy your eth address'}
            </li>
          )} */}
          <li>
            <TalkSalesComponent
              text={'Inquiries'}
              classes={'inquiries-sales'}
            />
          </li>
          {currentUserAddress && (
            <li className="logout" onClick={logoutUser}>
              <i className="fas fa-sign-out-alt"></i>Logout
            </li>
          )}
        </NavFooterBox>
      )}
    </NavFooter>
  );
};

export default MobileNavigationList;
