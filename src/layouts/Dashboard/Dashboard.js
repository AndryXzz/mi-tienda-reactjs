import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import { Topbar, SliderBar, ShoppingCart } from './components'
import 'moment/locale/es'
import { Products } from '../../views'
const useStyles = makeStyles()(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto',
    padding: 6,
    background: '#ebedf0'
  },
  topBarContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  genCont: {
    flex: '1 1 auto',
    display: 'flex',
    overflow: 'hidden',
  },
}));

const Dashboard = ({ children }) => {

  const [productList, setProductList] = useState([
    {
      id: 0,
      added: false,
      name: 'Play Station 5',
      price: '2.000.000',
      imgUrl: 'https://www.muycomputer.com/wp-content/uploads/2020/06/PS5-portada-1.jpg'
    },
    {
      id: 1,
      added: false,
      name: 'Bicicleta todo terreno',
      price: '1.500.000',
      imgUrl: 'https://tuvalum.com/blog/wp-content/uploads/2021/03/Trek-Domane-2-900x484.jpg'
    },
    {
      id: 2,
      added: false,
      name: 'Pórtatil Asus',
      price: '6.310.000',
      imgUrl: 'https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/asus_g733cx_xs97_rog_hxh55_32_1_w11p_1655395538_1704376.jpg'
    },
    {
      id: 3,
      added: false,
      name: 'Teclado mécanico VSG',
      price: '220.000',
      imgUrl: 'https://i.ytimg.com/vi/Ppkcv7PGw_M/maxresdefault.jpg'
    },
    {
      id: 4,
      added: false,
      name: 'Iphone 11 Pro Max',
      price: '2.200.000',
      imgUrl: 'https://cdn.shopify.com/s/files/1/0271/0922/8578/products/apple-iphone-pro-10-max_700x_40143608-d87c-4593-b83f-a551ff800f3c.png?v=1665798763'
    },
    {
      id: 5,
      added: false,
      name: 'Morral Xiaomi',
      price: '100.000',
      imgUrl: 'https://vshop.com.co/5539-medium_default/maleta-xiaomi-mi-sport-back-pack-pequeno.jpg'
    },

  ])

  const [componentSlider, setComponentSlider] = useState(null)
  const [headerSlider, setHeaderSlider] = useState(null)
  const [open, setOpen] = useState(false)

  const [user, setUser] = useState({
    firstNames: '',
    lastNames: '',
    birthday: '',
    typeDoc: '',
    document: '',
    phone: '',
    email: '',
    address: '',
    created: false,
  })

  const [card, setCard] = useState({
    cardNumber: '',
    dueDate: '',
    cvc: '',
    titularName: '',
    document: '',
    created: false,
  })

  const [shoppingCart, setShoppingCart] = useState([]);


  useEffect(() => {
    if (componentSlider) {
      setOpen(true)
    }
  }, [componentSlider])



  const { classes } = useStyles();

  const handleOpenSlider = (typeFunction) => {
    setComponentSlider(typeFunction)
    switch (typeFunction) {
      case 'CreateUser':
        setHeaderSlider('Registrar usuario')
        break;
      case 'CreateCard':
        setHeaderSlider('Añadir método de pago')
        break;
      case 'BrowseShoppingCart':
        setHeaderSlider('Mi carrito de compras')
        break;

      default:
        break;
    }

  }

  return (
    <div className={classes.topBarContainer}>
      <Topbar
        handleOpenSlider={handleOpenSlider}
        setComponentSlider={setComponentSlider}
        open={open}
        setOpen={setOpen}
        user={user}
      />
      <div className={classes.genCont} >
        <main className={classes.content}>
          <Products
            productList={productList}
            setProductList={setProductList}
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
          />
          <SliderBar
            user={user}
            setUser={setUser}
            card={card}
            setCard={setCard}
            open={open}
            setOpen={setOpen}
            component={componentSlider}
            setComponentSlider={setComponentSlider}
            header={headerSlider}
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
          />
          {children}
          <ShoppingCart
            shoppingCart={shoppingCart}
            setOpen={setOpen}
            handleOpenSlider={handleOpenSlider}
          />
        </main>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  children: PropTypes.any
};

export default Dashboard;
