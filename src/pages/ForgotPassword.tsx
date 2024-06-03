import { useState } from "react";
import { Link } from "react-router-dom";
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
import {
  btnRegistrationStyle,
  titleRegistrationStyle,
} from "constant/registrationStyle";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  const { forgotPassword, errors } = useAuth();

  return (
    <StyledMainContainer>
      <Helmet>
        <title>Mot de passe oublié</title>
      </Helmet>
      <StyledFormContainer>
        <Title weight="800" size="h1" style={titleRegistrationStyle}>
          Mot de passe oublié
        </Title>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: "20px" }}
          status={errors?.user | errors?.email ? "error" : "default"}
        />
        <Text color="dark">{errors?.user}</Text>
        <Text color="dark">{errors?.email}</Text>

        <Button
          onClick={() => forgotPassword(email)}
          label="Envoyer"
          color="red"
          style={btnRegistrationStyle}
          name={"forgotpassword"}
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
        <Text style={{ marginTop: "30px" }}>
          Déjà inscrit(e) ?
          <Link
            to="/login"
            style={{
              color: COLOR_WHITE,
              marginLeft: "10px",
              fontWeight: "bold",
            }}
          >
            Connectez-vous
          </Link>
        </Text>
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
