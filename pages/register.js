import { Button, FormControl, TextField, InputAdornment, IconButton} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';

export default function Register() {
  const [values, setValues] = useState({
    namaAwal:'',
    namaAkhir:'',
    username:'',
    password: '',
    email:'',
    showPassword: false,
  });
 const [message, setMessage] = useState({
   show: false,
   success: false,
   text: 'wawa'
 })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    postData(values)
  }

  const url = (process.env.NODE_ENV === "production" 
  ? "https://words-aas.vercel.app/db/" 
  : "http://localhost:3000/api/")
  + "register"

  const center ='bg-blue-100 flex flex-wrap w-full h-screen justify-center content-center'


  async function postData(data) {
    const reset = {
      namaAwal:'',
      namaAkhir:'',
      username:'',
      password: '',
      email:'',
      showPassword: false,
    }
    setValues(reset)
    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      })
      const respon = await response.json()
      if (response.status === 400) {
        setMessage({success:false, show:true, text: respon.message})
      } else {
        setMessage({success:true, show:true, text: respon.message})
      }
      setTimeout(() => {setMessage({...message, show:false})}, 3000)
    } catch(e) {
      console.log(e)
      setMessage({...message, show:true, text:e})
      setTimeout(setMessage({...message, show:false}), 3000)
    }
  }

  return (
    <div className={`${center}`}>
      <div>
      <FormControl>
        <form className={'grid gap-5'} noValidate autoComplete="off">
          <div className='flex gap-6 flex-col md:flex-row'>
            <TextField onChange={handleChange('namaAwal')} value={values.namaAwal} className='bg-blue-50' id="nama-awal" label="Nama Awal" variant="outlined" />
            <TextField onChange={handleChange('namaAkhir')} value={values.namaAkhir} className='bg-blue-50' id="nama-akhir" label="Nama Akhir" variant="outlined" />
          </div>
          <TextField onChange={handleChange('username')} value={values.username} className='bg-blue-50' id="username" label="Username" variant="outlined" />
          <TextField type={values.showPassword ? 'text' : 'password'} 
            onChange={handleChange('password')} value={values.password}
            className='bg-blue-50' id="password" label="Password" variant="outlined" 
            InputProps={{endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="memperlihatkan password"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
              )}}
            />
          <TextField onChange={handleChange('email')} value={values.email} className='bg-blue-50' id="email" label="Email" variant="outlined" />
          <Button onClick={handleSubmit} type="submit" fullWidth  variant="contained" color="primary">
            Register
          </Button>
        </form>
      </FormControl>
      {message.show && 
        <div className={'text-xl font-bold'}>
          {message.text}
        </div>
      }
      </div>  
    </div>

  )
}