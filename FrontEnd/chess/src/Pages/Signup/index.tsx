import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { BASE_URL, SIGN_UP_URL } from '../../Constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(formData.username && formData.password && formData.confirmPassword){
        const url = BASE_URL + SIGN_UP_URL;
        const body = {
            name: formData.username,
            roles: "PLAYER",
            password: formData.password,
        }
        axios.post(url,body)
        .then(()=>{
            navigate("/login",{state : { username : formData.username, password : formData.password }});
        }).catch(()=>{
        });
    }
    // Add your form submission logic here (e.g., API call, validation, etc.)
    console.log(formData);
  };

  return (
    <Container maxWidth="xs" style = {{backgroundColor : 'white', padding : '3rem'}} >
      <Typography style = {{color : 'black'}} >Chess Ninja</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" style={{color : 'black'}}>Sign Up</Typography>
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
            <TextField
              label="Re-enter Password"
              name="confirmPassword"
              type="password"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignupForm;
