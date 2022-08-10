import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Authentication';
import { axiosAdmin } from '../../global/axios';
import Common from '../common/index';
import { UserRoles } from '../enums/roles.enum';
import { UserSigninModel } from '../models/userSignin.model';
import { Toast, ToastContainer } from 'react-bootstrap';

const Login = () => {
  const { setRole, setAuth } = useContext(AuthContext);
  const [show, setShow ] = useState<boolean>(false);
  const [success, setSuccess ] = useState<boolean>(false);
  const [msg, setMsg ] = useState<String>('');

  const onSubmit = async (form: UserSigninModel) => {
    const res = await axiosAdmin({
      method: 'POST',
      url: '/signin',
      data: {
        user: form
      }
    })

    if(res.status === 200){
      console.log(res.data);
      setSuccess(true);
      setAuth(res.data);
    }else{
      setSuccess(false);
    }
    setMsg(res.data.message);
    setShow(true);
  }
  
  useEffect(() => {
    setRole(UserRoles.ADMIN);
  }, []);

  return (
    <>
      <Common.Login onSubmit={onSubmit} signupURL={"/admin/signup"} />

      <div className="mt-5">
        <ToastContainer position={'top-end'} className="mt-5 me-3">
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            {success && <Toast.Header className="bg-primary text-dark">
              <strong className="me-auto">Success!</strong>
            </Toast.Header>}

            {!success && <Toast.Header className="bg-danger text-light">
              <strong className="me-auto">Opps!</strong>
            </Toast.Header>}

            <Toast.Body>{msg}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export { Login };
