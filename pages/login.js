import { Button, CircularProgress, FormControl, TextField, InputAdornment, IconButton} from '@material-ui/core';
import { useState } from 'react';
import { useRouter } from 'next/router'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import loginService from '../services/login'
import appService from '../services/mongodb'


export default function Login() {
  const[values, setValue] = useState({
    username: '',
    password: '',
    showPassword: false
  })

  const [error, setError] = useState({
    status: false,
    message: ''
  })

  const[user, setUser] = useState(null);

  const[loading, setLoading] = useState(false)

  const handleChange = (prop) => (event) => {
    setValue({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValue({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const router = useRouter()

  const loginHandler = async (event) => {
    event.preventDefault();
    setLoading(true)      
    try {
      const res = await loginService(values.username, values.password)
      
      if (res.status === 401) {
        setError({status:true, message: 'Username/Password Salah!'})
        setTimeout(() => {
          setError({status: false, message: ''})
        }, 3000)
        setLoading(false)      
        return
      }

      const response = await res.json()
      appService.setToken(response.token);
      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify(response)
      );
      setUser(response);
      setValue({username:'', password:''});
      if (res.ok) {
        router.push('/popquiz')
      }
      setLoading(false)      
    } catch (error) {
      console.log(error)
      setError({status:true, message: error.message})
      setLoading(false)      
    }
  };

  const center ='bg-blue-100 flex flex-col flex-wrap w-full h-screen justify-center content-center'

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
            {loading ? <CircularProgress color='white'/> : 'Login'}
          </Button>
        </form>
      </FormControl>
      {error.status && 
        <div className={'text-xl font-bold'}>
          {error.message}
        </div>
      }
      </div>  
    </div>
    
  )
}
