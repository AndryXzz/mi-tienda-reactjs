import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Swal from 'sweetalert2';
const useStyles = makeStyles()(() => ({
}));

const CreateUser = ({ handleOpenSlider, user, setUser, setOpen, handleCloseSlider }) => {
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (
      user.firstNames &&
      user.lastNames &&
      user.birthday &&
      user.typeDoc &&
      user.document &&
      user.phone &&
      user.email &&
      user.address
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)

    }
  }, [user])
  const { classes } = useStyles()
  const handleChangeValUser = (e) => {

    if (e.target) {
      setUser(prev => ({ ...prev, [e.target.id || 'typeDoc']: e.target.value }))
    } else {
      setUser(prev => ({ ...prev, birthday: e.$d }))
    }
  }

  const handleValidateNumber = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      handleChangeValUser(e)
    }
  }

  const handleCreateUser = () => {
    setUser(prev => ({ ...prev, created: true }))
    Swal.fire({
      icon: 'success',
      title: '¡Bien Hecho!',
      text: 'Usuario creado con éxito',
      timer: 2000
    }).then(() => {
      handleCloseSlider()
    })
  }
  return (
    <Fragment >
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField id="firstNames" label="Nombres" variant="outlined" size="small" value={user.firstNames} onChange={handleChangeValUser} />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField id="lastNames" label="Apellidos" variant="outlined" size="small" value={user.lastNames} onChange={handleChangeValUser} />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <DesktopDatePicker
              label="Fecha de nacimiento"
              inputFormat="MM/DD/YYYY"
              value={user.birthday}
              onChange={handleChangeValUser}
              renderInput={(params) => <TextField {...params} size="small" id="birthday" error={false} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="typeDoc-label">Tipo de documento</InputLabel>
            <Select
              labelId="typeDoc-label"
              id="typeDoc"
              value={user.typeDoc}
              label="Tipo de documento"
              onChange={handleChangeValUser}
            >
              <MenuItem value={1}>CC</MenuItem>
              <MenuItem value={2}>CE</MenuItem>
              <MenuItem value={3}>Pasaporte</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField id="document" label="Número Documento" variant="outlined" size="small" value={user.document} onChange={handleValidateNumber} inputProps={{ maxLength: 15 }} />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField id="phone" label="Número celular" variant="outlined" size="small" value={user.phone} onChange={handleValidateNumber} inputProps={{ maxLength: 13 }} />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField id="email" label="Correo Electrónico" variant="outlined" size="small" value={user.email} onChange={handleChangeValUser} />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <TextField id="address" label="Dirección" variant="outlined" size="small" value={user.address} onChange={handleChangeValUser} />
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.contBtn}>
          <Button size="small" variant="contained" color="success" disabled={disabled} onClick={handleCreateUser}>Registrarme</Button>
        </Grid>
      </Grid>
    </Fragment>
  )
}

CreateUser.propTypes = {
  handleOpenSlider: PropTypes.func,
};

export default CreateUser;