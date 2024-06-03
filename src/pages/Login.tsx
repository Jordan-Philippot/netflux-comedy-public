import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { COLOR_BLACK, COLOR_GREY_LIGHT, COLOR_WHITE } from "utils/colors";
import { useAuth } from "hooks/useAuth";
import {
  btnRegistrationStyle,
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
import NetflixBg from "assets/netflix_bg.jpg";

export const StyledMainContainer = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${NetflixBg});
  background-size: cover;
`;

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_BLACK}CC;
  border-radius: 4px;
  padding: 50px 50px 100px 50px;
  width: fit-content;
  height: fit-content;
  a {
    color: white;
  }
`;

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();

  return (
    <StyledMainContainer>
      <Helmet>
        <title>Connexion</title>
      </Helmet>
      <StyledFormContainer>
        <Title weight="800" size="h1" style={titleRegistrationStyle}>
          S'identifier
        </Title>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: "20px" }}
        />

        <Button
          onClick={() => login(email, password)}
          label="S'identifier"
          name={"login"}
          color="red"
          style={btnRegistrationStyle}
        />
        <Link
          to="/forgot-password"
          style={{
            textAlign: "left",
            color: COLOR_GREY_LIGHT,
            fontSize: "14px",
            marginBottom: "10px",
          }}
        >
          Mot de passe oublié ?
        </Link>

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
