import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, FormControl, Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Swal from 'sweetalert2';
const useStyles = makeStyles()(() => ({
}));

const CreateCard = ({ card, setCard, setOpen, handleCloseSlider }) => {
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {

    if (
      card.cardNumber &&
      card.dueDate &&
      card.cvc &&
      card.titularName &&
      card.document
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)

    }
  }, [card])
  const { classes } = useStyles()
  const handleChangeValCard = (e) => {


    if (e.target) {
      setCard(prev => ({ ...prev, [e.target.id]: e.target.value }))
    } else {
      setCard(prev => ({ ...prev, dueDate: e.$d }))
    }
  }

  const handleCreateCard = () => {
    setCard(prev => ({ ...prev, created: true }))
    Swal.fire({
      icon: 'success',
      title: '¡Bien Hecho!',
      text: 'Se añadió la tarjeta con éxito',
      timer: 2000
    }).then(() => {
      handleCloseSlider();
    })
  }

  const handleValidateNumber = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      handleChangeValCard(e)
    }
  }
  return (
    <Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <TextField id="cardNumber" label="Número de tarjeta" variant="outlined" size="small" value={card.cardNumber} onChange={handleValidateNumber} inputProps={{ maxLength: 16 }} />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <DesktopDatePicker
              label="Fecha de vencimiento"
              inputFormat="MM/YY"
              views={['year', 'month']}
              value={card.dueDate}
              onChange={handleChangeValCard}
              renderInput={(params) => <TextField {...params} size="small" id="dueDate" error={false} />}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField id="cvc" label="CVC" variant="outlined" size="small" value={card.cvc} onChange={handleValidateNumber} inputProps={{ maxLength: 3 }} />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField id="titularName" label="Nombre titular" variant="outlined" size="small" value={card.titularName} onChange={handleChangeValCard} />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField id="document" label="Número documento" variant="outlined" size="small" value={card.document} onChange={handleValidateNumber} />
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.contBtn}>
          <Button size="small" variant="contained" color="success" disabled={disabled} onClick={handleCreateCard}>Añadir método de pago</Button>
        </Grid>
      </Grid>
    </Fragment>
  )
}

CreateCard.propTypes = {
  handleOpenSlider: PropTypes.func,
};

export default CreateCard;

