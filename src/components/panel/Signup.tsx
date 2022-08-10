import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Authentication';
import { axiosPanel } from '../../global/axios';
import Common from '../common/index';
import { UserRoles } from '../enums/roles.enum';
import { UserSignupModel } from '../models/userSignup.model';

const Signup = () => {
  const { setRole, setAuth } = useContext(AuthContext);

  const onSubmit = async (form: UserSignupModel) => {
    const res = await axiosPanel({
      method: 'POST',
      url: '/signup',
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
    <Common.Signup onSubmit={onSubmit} signinURL={"/panel/login"} />
  );
}

export { Signup };
