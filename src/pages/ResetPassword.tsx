import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { COLOR_GREY_LIGHT, COLOR_WHITE } from "utils/colors";
import { useAuth } from "hooks/useAuth";
import { Helmet } from "react-helmet-async";

// ----------
// Components
// ----------
import Text from "components/ui/Text";
import Title from "components/ui/Title";
import Button from "components/ui/Button";
import Input from "components/ui/Input";

// ----------
// Assets
// ----------
import { StyledFormContainer, StyledMainContainer } from "./Login";
import { titleRegistrationStyle } from "constant/registrationStyle";

export default function ResetPassword() {
  // ----- Get params -----
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>(
    query.get("token") ? query.get("token") : null
  );

  useEffect(() => {
    setToken(query.get("token"));
  }, [token, query]);

  const { resetPassword, errors } = useAuth();

  const btnStyle = {
    width: "100%",
    margin: "35px 0 25px 0",
  };

  return (
    <StyledMainContainer>
        <Helmet>
        <title>Modification de votre mot de passe</title>
      </Helmet>
      <StyledFormContainer>
        <Title weight="800" size="h1" style={titleRegistrationStyle}>
          Modifier mot de passe
        </Title>
        <Input
          type="password"
          placeholder="Mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <Text color="dark">{errors?.account}</Text>
        <Text color="dark">{errors?.passwordConfirm}</Text>

        <Button
          onClick={() => resetPassword(newPassword, confirmNewPassword, token)}
          label="Envoyer"
          name={"resetpassword"}
          color="red"
          style={btnStyle}
        />
        <Link
          to="/help"
          style={{
            textAlign: "right",
            color: COLOR_GREY_LIGHT,
            fontSize: "14px",
          }}
        >
          Besoin d'aide ?
        </Link>
        <Text color={"grey"} style={{ marginTop: "30px" }}>
          Première visite sur Netflix ?
          <Link
            to="/register"
            style={{
              color: COLOR_WHITE,
              marginLeft: "10px",
              fontWeight: "bold",
            }}
          >
            Inscrivez-vous
          </Link>
        </Text>
      </StyledFormContainer>
    </StyledMainContainer>
  );
}
