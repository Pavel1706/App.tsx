import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {loginTC} from "./login-reducer";
import {AppRootStateType} from "../app/store";
import { Redirect } from 'react-router-dom';



export const Login = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType>(state=>state.login.isLoggedIn)





    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password:'',
            rememberMe: false
        },
        validate: (values) => {
            // dispatch(loginTC(values))

            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'required fill';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if(!values.password){
                errors.password = 'password must have'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        }
    })
     if(isLoggedIn){
         return <Redirect to={'/'} />
     }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>

            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField label="Email"
                               margin="normal"
                               {...formik.getFieldProps("email")}
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}/>
                    {formik.touched.email && formik.errors.email
                        ? <div style={{color:'red'}}>
                            {formik.errors.email}</div>
                        :null}
                    <TextField type="password"
                               label="Password"
                               margin="normal"
                               {...formik.getFieldProps("password")}
                               value={formik.values.password}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}/>
                    {formik.touched.password && formik.errors.password
                        ? <div style={{color:'red'}}>
                            {formik.errors.password}</div>
                        :null}
                    <FormControlLabel label={'Remember me'}
                                      control={<Checkbox
                    {...formik.getFieldProps("rememberMe")}
                    checked ={formik.values.rememberMe}
                                      />}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}


