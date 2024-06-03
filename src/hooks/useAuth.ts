import { getUser, login, register, setProfile } from "api/user";
import { UserType } from "api/user.type";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMessage from "hooks/useMessage";
import { forgotPassword, resetPassword } from "api/resetPassword";

export type FieldErrors = {
  [fieldName: string]: any;
};

interface AuthHook {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  profile: (password: string, firstname: string, lastname: string) => void;
  register: (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    newPassword: string,
    confirmNewPassword: string,
    token: string | null
  ) => Promise<void>;
  errors: FieldErrors | undefined;
  isLoading: boolean;
}

export function useAuth(): AuthHook {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<UserType | null>({
    queryKey: ["user"],
    queryFn: () =>
      localStorage.getItem("userToken")
        ? getUser()
        : Promise.resolve<UserType | null>(null),
  });

  const { sendInformation, sendError } = useMessage();

  const [errors, setErrors] = useState<FieldErrors | undefined>();

  const mutationUser = useMutation({
    mutationFn: getUser,
    mutationKey: ["user"],
    onSuccess: async () => {
      setErrors(undefined);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      const initialDataQuery = await queryClient.getQueryData(["user"]);
      await queryClient.setQueryData(["user"], initialDataQuery);
    },
    onError: (e) => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["userLikeList"] });
      queryClient.removeQueries({ queryKey: ["userSubscriptions"] });
      queryClient.removeQueries({ queryKey: ["userFavorites"] });
      queryClient.removeQueries({ queryKey: ["userResumeList"] });
    },
  });

  const loginHandler = async (email: string, password: string) => {
    try {
      const loginResponse = await login({ email, password });

      if (loginResponse.token) {
        localStorage.setItem("userToken", loginResponse.token);
        mutationUser.mutate();

        sendInformation("Bienvenue sur Netflix Comedy !");
      } else {
        sendError("Identifiants incorrects");
      }
    } catch (error) {
      sendError("Identifiants incorrects");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    mutationUser.mutate();
    sendInformation("Déconnexion réussie");
    navigate("/");
  };

  const registerHandler = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) => {
    try {
      const registerResponse = await register({
        email,
        password,
        firstname,
        lastname,
      });

      if (registerResponse.registered) {
        loginHandler(email, password);
      } else if (registerResponse.errors) {
        setErrors(registerResponse.errors);
      }
    } catch (error) {
      sendError("Erreur lors de l'enregistrement");
    }
  };

  const profileHandler = async (
    password: string,
    firstname: string,
    lastname: string
  ) => {
    try {
      const profileResponse = await setProfile({
        password,
        firstname,
        lastname,
      });

      if (profileResponse.user) {
        mutationUser.mutate();
        sendInformation("Profil enregistré");
      } else if (profileResponse.errors) {
        setErrors(profileResponse.errors);
      }
    } catch (error) {
      sendError("Erreur lors de l'enregistrement");
    }
  };

  const forgotPasswordHandler = async (email: string) => {
    try {
      const forgotPasswordResponse = await forgotPassword(email);
      if (forgotPasswordResponse.forgotPassword) {
        sendInformation("Un lien vous a été envoyé par mail");
        navigate("/");
      } else {
        setErrors(forgotPasswordResponse.errors);
      }
    } catch (error) {
      sendError("Aucun utilisateur trouvé");
    }
  };

  const resetPasswordHandler = async (
    newPassword: string,
    confirmNewPassword: string,
    token: string | null
  ) => {
    if (token === null) {
      sendError("Le lien de réinitialisation est incorrecte");
    } else {
      try {
        const resetPasswordResponse = await resetPassword(
          newPassword,
          confirmNewPassword,
          token
        );
        if (resetPasswordResponse.resetPassword) {
          sendInformation("Votre mot de passe à été réinitialisé");
          navigate("/login");
        } else {
          setErrors(resetPasswordResponse.errors);
        }
      } catch (error) {
        sendError("Aucun utilisateur trouvé");
      }
    }
  };

  return {
    user: data ?? null,
    login: loginHandler,
    logout: logoutHandler,
    register: registerHandler,
    profile: profileHandler,
    forgotPassword: forgotPasswordHandler,
    resetPassword: resetPasswordHandler,
    errors,
    isLoading: isLoading,
  };
}
