import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { Link } from 'react-router-dom';

const Header = () => {
  const linkArr = ['home', 'auth'];
  const [tabVal, setTabVal] = useState();
  return (
    <AppBar sx={{ bgcolor: 'transparent', position: 'sticky' }}>
      <Toolbar>
        <WorkHistoryIcon sx={{ color: 'black', textDecoration: 'none' }} />
        <Tabs
          value={tabVal}
          onChange={(e, value) => setTabVal(value)}
          sx={{
            ml: 'auto',
            textDecoration: 'none',
          }}
        >
          {linkArr.map((t) => {
            return (
              <Tab
                LinkComponent={Link}
                to={`/${t === 'home' ? '' : t}`}
                key={t}
                label={t}
                sx={{
                  textDecoration: 'none',
                  ':hover': {
                    textDecoration: 'underline',
                    textUnderlineOffset: '7px',
                  },
                }}
              />
            );
          })}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
