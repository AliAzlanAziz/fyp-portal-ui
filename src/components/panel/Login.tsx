import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Authentication';
import { axiosPanel } from '../../global/axios';
import Common from '../common/index';
import { UserRoles } from '../enums/roles.enum';
import { UserSigninModel } from '../models/userSignin.model';

const Login = () => {
  const { setRole, setAuth } = useContext(AuthContext);

  const onSubmit = async (form: UserSigninModel) => {
    const res = await axiosPanel({
      method: 'POST',
      url: '/signin',
      data: {
        user: form
      }
    })

    if(res.status === 200){
      console.log(res.data);
      setAuth(res.data.token);
    }
  }

  useEffect(() => {
    setRole(UserRoles.PANEL);
  }, []);

  return (
    <Common.Login onSubmit={onSubmit} signupURL={"/panel/signup"} />
  );
}

export { Login };
