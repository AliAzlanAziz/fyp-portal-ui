import React, { useContext, useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authentication";
import { axiosStudent } from "../../global/axios";
import Common from "../common/index";
import { UserRoles } from "../enums/roles.enum";
import { UserSigninModel } from "../models/userSignin.model";

const Login = () => {
  let navigate = useNavigate();
  const { setRole, setAuth } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<String>("");

  const onSubmit = async (form: UserSigninModel) => {
    try {
      const res = await axiosStudent({
        method: "POST",
        url: "/signin",
        data: {
          user: form,
        },
      });

      if (res.status === 200) {
        // console.log(res.data);
        setSuccess(true);
        setAuth(res.data.token, UserRoles.STUDENT);
      } else {
        setSuccess(false);
      }
      setMsg(res.data.message);
      setShow(true);
      setTimeout(() => {
        navigate("/student/dashboard");
      }, 3000);
    } catch (error: any) {
      setSuccess(false);
      setMsg(error?.response?.data?.message);
      setShow(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const authDataString = localStorage.getItem("sessionToken");
    const authData = JSON.parse(authDataString || "");

    if (authData !== "") {
      const roleData = localStorage.getItem("role");
      const role = JSON.parse(roleData || "0");

      if (role === UserRoles.ADMIN) {
        navigate("/admin/dashboard");
      } else if (role === UserRoles.ADVISOR) {
        navigate("/advisor/dashboard");
      } else if (role === UserRoles.PANEL) {
        navigate("/panel/dashboard");
      } else if (role === UserRoles.STUDENT) {
        navigate("/student/dashboard");
      } else {
        setRole(UserRoles.STUDENT);
      }
    } else {
      setRole(UserRoles.STUDENT);
    }
  }, []);

  return (
    <>
      <Common.Login
        onSubmit={onSubmit}
        signupURL={"/student/signup"}
        role={UserRoles.STUDENT}
      />

      <div
        className="toast-container position-absolute"
        style={{ top: "70px", right: "30px" }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          {success && (
            <Toast.Header className="bg-primary text-light">
              <strong className="me-auto">Success!</strong>
            </Toast.Header>
          )}

          {!success && (
            <Toast.Header className="bg-danger text-light">
              <strong className="me-auto">Error!</strong>
            </Toast.Header>
          )}

          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export { Login };
