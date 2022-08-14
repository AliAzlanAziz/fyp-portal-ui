import React, { createContext } from "react";
import { UserModel } from "../components/models/user.model";
import { UserRoles } from "../components/enums/roles.enum";
import { axiosCommon } from "../global/axios";

type AuthContextType = {
  loggedin: boolean;
  sessionToken: String;
  setAuth(sessionToken: String, role: UserRoles): void;
  removeAuthState(): void;
  getAuthState(): void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  profile: UserModel;
  setProfile: React.Dispatch<React.SetStateAction<UserModel>>;
  getProfile(): Promise<void>;
  role: UserRoles;
  setRole: React.Dispatch<React.SetStateAction<UserRoles>>;
};

export const AuthContext = createContext<AuthContextType>({
  loggedin: false,
  sessionToken: "",
  setAuth(sessionToken: String, role: UserRoles): void {},
  removeAuthState(): void {},
  getAuthState(): void {},
  loading: false,
  setLoading: (value: boolean | ((prevVar: boolean) => boolean)): void => {},
  profile: new UserModel(),
  setProfile: (
    value: UserModel | ((prevVar: UserModel) => UserModel)
  ): void => {},
  getProfile(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  role: UserRoles.NONE,
  setRole: (value: UserRoles | ((prevVar: UserRoles) => UserRoles)): void => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({
  children,
  ...props
}: AuthContextProviderProps) => {
  const [sessionToken, setSessionToken] = React.useState<String>("");
  const [loggedin, setLoggedin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [role, setRole] = React.useState<UserRoles>(UserRoles.NONE);
  const [profile, setProfile] = React.useState<UserModel>({});

  const getProfile = async (): Promise<void> => {
    try {
      setLoading(true);

      if (loggedin) {
        const res = await axiosCommon({
          url: "/profile",
          method: "GET",
        });
        if (res.status === 200) {
          //set user info context
          // console.log(JSON.stringify(res.data))
          localStorage.setItem("role", JSON.stringify(res.data.profile.role));
          setProfile(res.data.profile);
          setRole(res.data.profile.role);
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  // Get current auth state from localStorage
  const getAuthState = (): void => {
    try {
      setLoading(true);
      
      const roleDataString = localStorage.getItem("role");
      const roleData = JSON.parse(roleDataString || "");
      setRole(roleData);

      const authDataString = localStorage.getItem("sessionToken");
      const authData = JSON.parse(authDataString || "");
      setSessionToken(authData);

      if (authData !== "") {
        setLoggedin(true);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  // Update localStorage & context state
  const setAuth = (sessionToken: String, role: UserRoles) => {
    try {
      setLoading(true);
      localStorage.setItem("sessionToken", JSON.stringify(sessionToken));
      localStorage.setItem("role", JSON.stringify(role));

      // Configure axios headers
      // configureAxiosHeaders(auth.sessionToken);
      setSessionToken(sessionToken);
      setRole(role)

      setLoggedin(true);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const removeAuthState = async () => {
    try {
      setLoading(true);

      localStorage.setItem("sessionToken", JSON.stringify(""));
      localStorage.setItem("role", JSON.stringify(0));

      // Configure axios headers
      // configureAxiosHeaders('');

      setSessionToken("");
      setProfile(new UserModel());
      setRole(UserRoles.NONE);
      setLoggedin(false);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAuthState();
  }, []);

  React.useEffect(() => {
    getProfile();
  }, [loggedin]);

  return (
    <AuthContext.Provider
      value={{
        sessionToken,
        setAuth,
        removeAuthState,
        getAuthState,
        loggedin,
        loading,
        setLoading,
        profile,
        setProfile,
        getProfile,
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
