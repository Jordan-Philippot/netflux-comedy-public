import styled from "styled-components";
import { useSubscription } from "hooks/useSubscription";
import { device } from "utils/breakpoints";
import { COLOR_BLUE } from "utils/colors";
import { Helmet } from "react-helmet-async";

// --------------
// Components
// --------------
import CardItem from "components/CardItem";
import Title from "components/ui/Title";
import Alert from "components/ui/Alert";
import { StyledTitleLink } from "components/carousel/Carousel";
import Arrow from "components/icon/Arrow";
import Loader from "components/ui/Loader";

export const StyledPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 95vh;
  padding: 0 20px;

  @media ${device.laptop} {
    padding: 0 40px;
  }
  @media ${device.laptopL} {
    padding: 0 60px;
  }
`;
export const StyledVideosContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 20px 0;
  margin: 50px 0;

  @media ${device.mobile} {
    .card-item {
      max-width: 200px;
    }
  }
  @media ${device.laptop} {
    gap: 80px 0;
    .card-item {
      max-width: 250px;
    }
  }
  @media ${device.laptopL} {
    .card-item {
      max-width: 270px;
    }
  }
`;
export const StyledSpan = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: auto 0 0 25px;

  text-align: center;
  color: ${COLOR_BLUE};
  :hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    svg {
      margin-left: 10px;
    }
  }
  svg {
    margin-top: 5px;
    transition: all 0.3s ease;
  }
  path {
    fill: ${COLOR_BLUE} !important;
  }
`;

export default function UserSubscriptions() {
  const { userSubscriptions, isLoading } = useSubscription();

  return (
    <>
      <Helmet>
        <title>Vos abonnements</title>
      </Helmet>
      <StyledPageContainer>
        <Title weight="800" style={{ margin: "120px 0 50px 0" }}>
          Vos abonnements
        </Title>

        {userSubscriptions && userSubscriptions.latestVideos.length > 0 && (
          <>
            <Title size="h3" weight="600">
              Dernières sorties
            </Title>
            <StyledVideosContainer>
              {userSubscriptions?.latestVideos.map((video, key) => (
                <CardItem
                  item={video}
                  channel={video.channel}
                  key={key}
                  style={{ marginBottom: "25px" }}
                />
              ))}
            </StyledVideosContainer>
          </>
        )}

        {/* Last week videos */}
        {!isLoading ? (
          userSubscriptions && userSubscriptions.subscriptions.length > 0 ? (
            userSubscriptions.subscriptions.map((subscripion, key) => (
              <div key={key}>
                <StyledTitleLink
                  to={"/channel/" + subscripion.channel.customUrl}
                >
                  <Title
                    size="h2"
                    weight="600"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      flexWrap: "wrap",
                      paddingBottom: 0,
                    }}
                  >
                    {subscripion.channel && subscripion.channel.title}
                    <StyledSpan>
                      Voir tout <Arrow />
                    </StyledSpan>
                  </Title>
                </StyledTitleLink>

                <StyledVideosContainer>
                  {subscripion.videos.map((video, key) => (
                    <CardItem
                      item={video}
                      channel={subscripion.channel}
                      key={key}
                      style={{ marginBottom: "25px" }}
                    />
                  ))}
                </StyledVideosContainer>
              </div>
            ))
          ) : (
            <Alert>
              Abonnez-vous à vos chaines préférées afin de ne rater aucune vidéo
            </Alert>
          )
        ) : (
          <Loader />
        )}
      </StyledPageContainer>
    </>
  );
}
