import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, Slide, Box, Paper, useMediaQuery, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui'
import { CreateUser, CreateCard, MyShoppingCart } from '../../../../views'
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles()(() => ({
  infoContainer: {
    position: 'fixed',
    zIndex: 1000,
    height: '100%',
    background: 'white',
    border: '1px solid #dadee0',
    boxShadow: 'unset !important',
    borderRadius: '0px !important',
    right: 0,
    top: 0,
    overflow: 'scroll'

  },
  infoContTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 1rem',
    borderBottom: '1.5px solid #5ccce7'
  },
  containerComponent: {
    padding: 30,
    display: 'flex',
    alignItems: 'center'

  },
  fadeBg: {
    position: 'fixed',
    zIndex: 1000,
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    background: '#000000b5'
  }
}));

const SliderBar = ({ open, setOpen, component, setComponentSlider, header, user, setUser, card, setCard, shoppingCart, setShoppingCart }) => {

  const { classes } = useStyles()
  const handleCloseSlider = () => { setOpen(false); setComponentSlider(null); }
  return (
    <Fragment>
      <Slide
        direction="right"
        in={open}
        mountOnEnter
        timeout={200}
        unmountOnExit
      >

        <Box
          className={classes.fadeBg}
          onClick={handleCloseSlider}
        />
      </Slide>
      <Slide
        direction="left"
        in={open}
        mountOnEnter
        timeout={200}
        unmountOnExit
      >
        <Box
          className={classes.infoContainer}
          component={Paper}
          sx={{ width: useMediaQuery('(min-width:1100px)') ? '35%' : '100%', overflowX: 'auto' }}
        >
          <Box className={classes.infoContTitle}>
            <Typography variant="h4">{header}</Typography>
            <IconButton onClick={handleCloseSlider}><CloseIcon /></IconButton>
          </Box>
          <Box className={classes.containerComponent}>

            {component === 'CreateUser' &&
              <CreateUser
                user={user}
                setUser={setUser}
                setOpen={setOpen}
                handleCloseSlider={handleCloseSlider}
              />
            }
            {component === 'CreateCard' &&
              <CreateCard
                card={card}
                setCard={setCard}
                setOpen={setOpen}
                handleCloseSlider={handleCloseSlider}
              />
            }
            {component === 'BrowseShoppingCart' &&
              <MyShoppingCart
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
                setOpen={setOpen}
                handleCloseSlider={handleCloseSlider}
                user={user}
                setUser={setUser}
                card={card}
              />
            }
          </Box>
        </Box>
      </Slide>
    </Fragment>
  )
}

SliderBar.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default SliderBar;