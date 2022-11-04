import React from 'react';
import PropTypes from 'prop-types';
import { Typography, AppBar, Box, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles()(() => ({
  root: {
    color: '#fff !important',
    fontWeight: 'bold',
    background: '#1CA1C1 !important',
    boxShadow: 'none !important',
    borderBottom: '1.5px solid #dadee0',
    padding: '.5rem 3rem',
    position: 'relative !important',
    zIndex: 500
  },
  cont: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  avatar: {
    width: '30px !Important',
    height: '30px !Important',
    margin: '0 3rem',
  },
  badge: {
    borderRadius: '50%',
    background: '#1CA1C1',
    color: 'white',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 10,
    width: 40,
    height: 40,
    border: '1px solid #4a4e58',
  },
  containerIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiButtonBase-root': {
      width: 50,
      margin: '0 2rem'
    },
    '& svg': {
      fill: '#fff'
    }
  }
}));

const TopBar = ({ handleOpenSlider, user }) => {

  const { classes } = useStyles()
  return (
    <AppBar
      className={classes.root}
      position="fixed"
    >
      <Box className={classes.cont}>
        <Typography
          component="div"
          sx={{ flexGrow: 1 }}
          variant="h6"
        >
          Mi Tienda ReactJS
        </Typography>
        <div className={classes.containerIcon}>
          <Box>
            {user.created ?
              <IconButton color="primary" onClick={() => handleOpenSlider('CreateUser')}>
                <AccountCircleIcon className={classes.avatar} />
              </IconButton>
              :
              <IconButton color="primary" onClick={() => handleOpenSlider('CreateUser')}>
                <GroupAddIcon className={classes.avatar} />
              </IconButton>
            }
          </Box>
          {user.created &&
            <Box>
              <IconButton color="primary" onClick={() => handleOpenSlider('CreateCard')}>
                <CreditCardIcon className={classes.avatar} />
              </IconButton>
            </Box>
          }


        </div>
      </Box>
    </AppBar >)
}

TopBar.propTypes = {
  handleOpenSlider: PropTypes.func,
};

export default TopBar;