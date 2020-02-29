import React from 'react';

import {
  Site,
  Nav,
  Button,
} from "tabler-react";

import webhooksshLogo from '../../assets/webhookssh.png';

export default function SiteWrapper({ children }) {
  return (
    <Site.Wrapper
      headerProps={{
        href: "/",
        alt: "Webhook SSH",
        imageURL: webhooksshLogo,
        navItems: (
          <Nav.Item type="div" className="d-none d-md-flex">
            <Button
              outline
              size="sm"
              RootComponent="button"
              color="primary"
              onClick={() => {
                localStorage.clear()
                window.location.href = '/'
              }}
            >
              Sair
            </Button>
          </Nav.Item>
        ),
      }}
    >
      {children}
    </Site.Wrapper>
  );
}
