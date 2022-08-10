import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Authentication';
import { axiosAdvisor } from '../../global/axios';
import Common from '../common/index';
import { UserRoles } from '../enums/roles.enum';
import { UserSigninModel } from '../models/userSignin.model';

const Login = () => {
  const navigate = useNavigate();
  const { setRole, setAuth } = useContext(AuthContext);

  const onSubmit = async (form: UserSigninModel) => {
    const res = await axiosAdvisor({
      method: 'POST',
      url: '/signin',
      data: {
        user: form
      }
    })

    if(res.status === 200){
      // console.log(res.data);
      setAuth(res.data.token);
      navigate('/advisor/dashboard')
    }
  }

  useEffect(() => {
    setRole(UserRoles.ADVISOR);
  }, []);

  return (
    <Common.Login onSubmit={onSubmit} signupURL={"/advisor/signup"} />
  );
}

export { Login };
