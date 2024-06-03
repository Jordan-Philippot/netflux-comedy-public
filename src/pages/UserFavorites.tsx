import { useFavorite } from "hooks/useFavorite";
import { Helmet } from "react-helmet-async";

// --------------
// Components
// --------------
import CardItem from "components/CardItem";
import Title from "components/ui/Title";
import Alert from "components/ui/Alert";
import Loader from "components/ui/Loader";

// ----------
// Assets
// ----------
import {
  StyledPageContainer,
  StyledVideosContainer,
} from "./UserSubscriptions";

export default function UserFavorites() {
  const { userFavorites, isLoading } = useFavorite();

  return (
    <>
      <Helmet>
        <title>Vos favoris</title>
      </Helmet>
      <StyledPageContainer>
        <Title weight="800" style={{ marginTop: "120px" }}>
          Ma liste
        </Title>

        {/* Channel Informations */}
        {!isLoading ? (
          userFavorites && userFavorites.length > 0 ? (
            <StyledVideosContainer>
              {userFavorites.map((favorite, key) => (
                <CardItem
                  item={favorite.video}
                  channel={favorite.video.channel}
                  key={key}
                  style={{ marginBottom: "25px" }}
                />
              ))}
            </StyledVideosContainer>
          ) : (
            <Alert>
              Ajoutez des vidéos à votre liste pour les regarder plus tard
            </Alert>
          )
        ) : (
          <Loader />
        )}
      </StyledPageContainer>
    </>
  );
}
