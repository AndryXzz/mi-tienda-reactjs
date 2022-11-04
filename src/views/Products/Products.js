import React from 'react'
import { Typography, Card, CardActions, CardContent, CardMedia, Grid, IconButton } from '@mui/material'
import { makeStyles } from 'tss-react/mui';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import Swal from 'sweetalert2';


function Products({ productList, setProductList, shoppingCart, setShoppingCart }) {

  const useStyles = makeStyles()(() => ({
    root: {
      background: '#f4f6f8',
      overflowY: 'auto',
      padding: '20px',
      borderRadius: 4
    },
    price: {
      color: 'green !important'
    },
    gridCont: {
      padding: '5rem !important',
      '& .MuiGrid-item ': {
        display: 'flex',
        justifyContent: 'center',
        '& .MuiCard-root': {
          width: '80%'
        }
      }
    },
    title: {
      width: '100%',
      fontSize: '3rem',
      textAlign: 'center',
      paddingTop: 30
    },
    img: {
      objectFit: 'fill'
    },
    addProduct: {
      background: '#4fae8d',
      padding: 10,
      '&:hover': {
        background: '#295c4b',

      },
      '& svg': {
        fill: '#fff',
        width: 25,
        height: 25,
      }
    },
    addedProduct: {
      background: 'gray',
      padding: 10,
      '& svg': {
        fill: '#fff',
        width: 25,
        height: 25,
      }
    },
  }));


  const { classes } = useStyles()

  const handleAddToShoppingCart = (product) => {
    product.added = true;
    setShoppingCart([...shoppingCart, product]);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '¡Bien hecho!',
      text: 'Se añadió el producto a tu carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handleRemoveToShoppingCart = (product) => {
    product.added = false;
    setShoppingCart(shoppingCart.filter(item => item.id !== product.id));
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Productos
      </Typography>
      <Grid container spacing={3} className={classes.gridCont}>
        {productList.map((product, i) => (
          <Grid item xs={4} key={`product-${i}`} id={`product-${product.id}`}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.imgUrl}
                alt={product.name}
                className={classes.img}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Valor: <span className={classes.price}>${product.price}</span>
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'flex-end', padding: '1rem 1rem 1rem 0' }}>
                {product.added ?
                  <IconButton className={classes.addedProduct} onClick={(e) => handleRemoveToShoppingCart(product, i)} >
                    <OfflinePinIcon />
                  </IconButton>
                  :
                  <IconButton className={classes.addProduct} onClick={(e) => handleAddToShoppingCart(product)}>
                    <AddShoppingCartIcon />
                  </IconButton>
                }
                {/* 
                 */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}


export default Products;