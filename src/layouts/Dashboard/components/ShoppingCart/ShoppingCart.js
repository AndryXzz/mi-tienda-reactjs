import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

const useStyles = makeStyles()(() => ({
  ShoppingCart: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    background: '#1ca1c1',
    padding: 15,
    '&:hover': {
      background: '#196b7f',

    },
    '& svg': {
      fill: '#fff',
      width: 30,
      height: 30,

    }
  }
}));

const ShoppingCart = ({ shoppingCart, setOpen, handleOpenSlider }) => {
  const { classes } = useStyles();

  return (
    <IconButton className={classes.ShoppingCart} color="primary" onClick={() => handleOpenSlider('BrowseShoppingCart')}>
      <Badge badgeContent={shoppingCart.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}

ShoppingCart.propTypes = {
  handleOpenSlider: PropTypes.func,
};

export default ShoppingCart;