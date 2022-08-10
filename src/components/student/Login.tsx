import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Authentication';
import { axiosStudent } from '../../global/axios';
import Common from '../common/index';
import { UserRoles } from '../enums/roles.enum';
import { UserSigninModel } from '../models/userSignin.model';

const Login = () => {
  let navigate = useNavigate();
  const { setRole, setAuth } = useContext(AuthContext);

  const onSubmit = async (form: UserSigninModel) => {
    try{
      const res = await axiosStudent({
        method: 'POST',
        url: '/signin',
        data: {
          user: form
        }
      })
  
      if(res.status === 200){
        console.log(res.data);
        setAuth(res.data.token);
        navigate('/student/dashboard')
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    setRole(UserRoles.STUDENT);
  }, []);

  return (
    <Common.Login onSubmit={onSubmit} signupURL={"/student/signup"} />
  );
}

export { Login };
