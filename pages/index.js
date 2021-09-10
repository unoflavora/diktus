import { Button, FormControl, TextField, InputAdornment, IconButton} from '@material-ui/core';
import { useState } from 'react';
import { useRouter } from 'next/router'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import loginService from '../services/login'
import appService from '../services/app'

export default function Login() {
  const[values, setValue] = useState({
    username: '',
    password: '',
    showPassword: false
  })

  const [message, setMessage] = useState({
    information: null,
    error: null
  })

  const[user, setUser] = useState(null);

  const handleChange = (prop) => (event) => {
    setValue({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const router = useRouter()

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const request = await loginService(values.username, values.password);
      const response = await request.json()
      console.log(response)
      appService.setToken(response.token);
      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify(response)
      );
      setUser(response);
      setValue({username:'', password:''});
      if (response) {
        router.push('/popquiz')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const center ='bg-blue-100 flex flex-wrap w-full h-screen justify-center content-center'

  return (
    <div className={`${center}`}>
      <div>
      <FormControl>
        <form className={'grid gap-5'} noValidate autoComplete="off">
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
          <Button onClick={loginHandler} type="submit" fullWidth  variant="contained" color="primary">
            Register
          </Button>
        </form>
      </FormControl>
      {message.information && 
        <div className={'text-xl font-bold'}>
          {message.information}
        </div>
      }
      {message.information && 
        <div className={'text-xl font-bold'}>
          {message.information}
        </div>
      }
      </div>  
    </div>
  )
}
