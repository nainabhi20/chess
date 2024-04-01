import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, LOGIN_URL } from '../../Constants';
import { useCookies } from 'react-cookie';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log(location);

  useEffect(()=>{
    if(location?.state?.password && location?.state?.username){
        setFormData({...formData,username:location?.state?.username,password:location?.state?.password})
    }
  },[]);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., API call, validation, etc.)
    const url = BASE_URL+LOGIN_URL;
    const body = {
        username: formData.username,
        password: formData.password,
    }
    axios.post(url, body)
    .then((data)=>{
        setCookie("token", data.data?.token, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        navigate('/');
        alert(cookies['token']);
    }).catch(()=>{
        alert("User/password is wrong");
    })
    console.log(formData);
  };

  return (
    <Container maxWidth="xs" style = {{backgroundColor : 'white', padding : '3rem'}} >
      <Typography style = {{color : 'black'}} >Chess Ninja</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" style={{color : 'black'}}>Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              value={formData.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs = {12} >
            <Link to="/signup" ><Typography>Create new account</Typography></Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SigninForm;
