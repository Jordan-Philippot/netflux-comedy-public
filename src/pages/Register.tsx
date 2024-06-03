import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { COLOR_GREY_LIGHT, COLOR_WHITE } from "utils/colors";
import {
  btnRegistrationStyle,
  inputRegistrationStyle,
  titleRegistrationStyle,
} from "constant/registrationStyle";
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

export default function Register() {
  const { register, errors } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const handleRegister = async () => {
    register(email, password, firstname, lastname);
  };

  return (
    <StyledMainContainer>
      <Helmet>
        <title>Inscription</title>
      </Helmet>
      <StyledFormContainer>
        <Title weight="800" size="h1" style={titleRegistrationStyle}>
          S'inscrire
        </Title>
        <Input
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          style={inputRegistrationStyle}
          status={errors?.firstname ? "error" : "default"}
        />
        <Text color="dark">{errors?.firstname}</Text>
        <Input
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          style={inputRegistrationStyle}
          status={errors?.lastname ? "error" : "default"}
        />
        <Text color="dark">{errors?.lastname}</Text>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputRegistrationStyle}
          status={errors?.email ? "error" : "default"}
        />
        <Text color="dark">{errors?.email}</Text>

        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputRegistrationStyle}
          status={errors?.password ? "error" : "default"}
        />
        <Text color="dark">{errors?.password}</Text>

        <Button
          onClick={handleRegister}
          label="S'inscrire"
          name={"register"}
          color="red"
          style={btnRegistrationStyle}
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
      </StyledFormContainer>
    </StyledMainContainer>
  );
}
