import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, IconButton, Typography, Grid, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/Inbox';
import Swal from 'sweetalert2';



const MyShoppingCart = ({ shoppingCart, setShoppingCart, user, setUser, card }) => {

  const handleRemoveToShoppingCart = (product) => {
    product.added = false;
    setShoppingCart(shoppingCart.filter(item => item.id !== product.id));
  }
  const getTotalShoppingCart = () => {
    return shoppingCart.map(item => item.price.replaceAll('.', '')).reduce((partialSum, a) => (parseInt(partialSum) + parseInt(a)), 0)
  }

  const loadingAprobation = () => {
    Swal.fire({
      icon: 'info',
      title: 'Procesando...',
      text: 'Por favor, espere',
      allowOutsideClick: false,
      closeOnClickOutside: false,
      didOpen: () => {
        Swal.showLoading()
        setTimeout(() => {
          Swal.close();
          if (parseInt(Math.random() * 10) % 2 === 0) {
            Swal.fire({
              icon: 'success',
              title: 'Aprobado',
              html: `
                <h3>¡Se realizó la compra con éxito!</h3>
                <h4>Detalle de compra:</h4>
                <div style="padding:3rem; border:1px solid;">
                  <ul>
                    <li>Valor: $${getTotalShoppingCart()}</li>
                    <li>Productos: ${shoppingCart.length}</li>
                    <li>Dirección de envío: ${user.address}</li>
                  </ul>
                </div>
              `
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Desaprobado',
              text: '¡Ups! hubo un error conectando con tu tarjeta de crédito, prueba de nuevo más tarde'
            })
          }
        }, 3000);
      }
    })
  }

  const confirmBuy = () => {
    Swal.fire({
      icon: 'info',
      title: 'Aviso',
      text: `¿Desea comprar ${shoppingCart.length > 1 ? 'los' : 'el'} ${shoppingCart.length > 1 ? shoppingCart.length : ''} articulo${shoppingCart.length > 1 ? 's' : ''}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Comprar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.created) {
          if (card.created) {
            loadingAprobation()
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Aviso',
              text: 'No has registrado algún método de pago, ¿deseas añadir uno para continuar?',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Continuar'
            }).then((res) => {
              if (res.isConfirmed) {
                const alertCardBuyer = () => {
                  Swal.fire({

                    html: `
                  <h3>Por favor, llena la información de la tarjeta</h3>
                  <input id="NCardNumber" class="swal2-input" placeholder="Número de tarjeta">
                  <input id="NCvc" class="swal2-input" placeholder="CVC">
                  <input id="NcardOwner" class="swal2-input" placeholder="Nombre del titular">
                  <input id="Naddress" class="swal2-input" placeholder="Dirección de envío">

                `,
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Comprar con la tarjeta de crédito',
                    preConfirm: () => {
                      const inputs = document.getElementsByClassName('swal2-input');
                      let inputsFilled = 0;
                      for (const element of inputs) {
                        if (element.value.trim()) {
                          inputsFilled++;
                        }

                      }
                      if (inputsFilled === inputs.length - 1) {
                        setUser(prev => ({ ...prev, address: document.getElementsById('Naddress') }))
                        loadingAprobation()
                      } else {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Error',
                          text: 'por favor llene todos los campos'
                        }).then(() => {
                          alertCardBuyer()
                        })
                      }
                    }
                  })
                }
                alertCardBuyer()

              }
            })
          }
        } else {
          const alertInviteBuyer = () => {
            Swal.fire({
              icon: 'info',
              title: 'Aviso',
              text: 'no te has registrado, ¿deseas comprar como invitado?',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Continuar'
            }).then((res) => {
              if (res.isConfirmed) {
                Swal.fire({

                  html: `
                  <h3>Por favor, completa tu información</h3>
                  <input id="Nnames" class="swal2-input" placeholder="Nombre completo">
                  <input id="Nphone" class="swal2-input" placeholder="Número celular">
                  <input id="Naddress" class="swal2-input" placeholder="Dirección de envío">
                  <input id="NcardNumber" class="swal2-input" placeholder="Número de tarjeta">

                `,
                  showCancelButton: true,
                  cancelButtonText: 'Cancelar',
                  confirmButtonText: 'Comprar como invitado',
                  preConfirm: () => {
                    const inputs = document.getElementsByClassName('swal2-input');
                    let inputsFilled = 0;
                    for (const element of inputs) {
                      if (element.value.trim()) {
                        inputsFilled++;
                      }

                    }
                    if (inputsFilled === inputs.length - 1) {
                      loadingAprobation()
                    } else {
                      Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: 'por favor llene todos los campos'
                      }).then(() => {
                        alertInviteBuyer()
                      })
                    }
                  }
                })
              }
            })
          }
          alertInviteBuyer()
        }
      }
    })
  }
  return (
    <Fragment>
      <Grid container spacing={2}>
        {shoppingCart.length ? shoppingCart.map(item => (
          <Grid item xs={12}>
            <Card style={{ padding: 20 }}>
              <Grid container spacing={5}>
                <Grid item xs={5}>
                  <img src={item.imgUrl} style={{ width: '70%' }} alt={item.imgUrl} />
                </Grid>
                <Grid item xs={5}>
                  <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                    <Typography>{item.name}</Typography>
                    <Typography variant="p">${item.price}</Typography>
                  </Box>

                </Grid>
                <Grid item xs={2}>
                  <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <IconButton color="error" onClick={() => handleRemoveToShoppingCart(item)}>
                      <DeleteIcon size="large" />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        )) :

          <Box style={{ textAlign: 'center' }}>
            <InboxIcon color="primary" style={{ width: 100, height: 100 }} />
            <Typography variant="h2">No Has añadido ningún producto</Typography>
          </Box>
        }
        <Grid item xs={12}>
          <Typography variant="h5">Total: {getTotalShoppingCart}</Typography>
          <br />
          {shoppingCart.length ?
            <Button variant="contained" color="success" onClick={confirmBuy}>
              Finalizar Compra
            </Button>
            : null}
        </Grid>
      </Grid>
    </Fragment>
  )
}

MyShoppingCart.propTypes = {
  handleOpenSlider: PropTypes.func,
};

export default MyShoppingCart;