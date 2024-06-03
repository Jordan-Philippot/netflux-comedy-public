import { useEffect, useState } from "react";
import styled from "styled-components";
import { useModal } from "components/context/ModalContext";
import { useSubscription } from "hooks/useSubscription";

// --------------
// Components
// --------------
import Button from "components/ui/Button";
import Wifi from "../icon/Wifi";
import Text from "components/ui/Text";
import Check from "components/icon/Check";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { device } from "utils/breakpoints";

const StyledChannelData = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const StyledChannelBannerContainer = styled.div<{
  onClick: React.MouseEventHandler<HTMLDivElement>;
}>`
  display: flex;
  :hover {
    cursor: pointer;
  }
`;
const StyledBanner = styled.img`
  border-radius: 50%;
  width: 90px;
  height: 90px;
`;
const StyledBannerInfos = styled.div`
  margin: auto auto auto 15px;
`;
const StyledButtonContainer = styled.div`
  margin-top: 25px;
  @media ${device.tablet} {
    margin: auto 0 auto auto;
  }
`;
export default function ChannelDescription() {
  let navigate = useNavigate();
  const { selectedChannel, closeModal } = useModal();
  const { user } = useAuth();
  const {
    addSubscription,
    removeSubscription,
    userSubscriptions,
    findUserSubscription,
  } = useSubscription();
  const [isSubscribed, setIsSubscribed] = useState<boolean>();

  useEffect(() => {
    if (selectedChannel)
      findUserSubscription(selectedChannel.channelId, setIsSubscribed);
  }, [userSubscriptions, selectedChannel, findUserSubscription]);

  return (
    <>
      {selectedChannel && (
        <StyledChannelData>
          <StyledChannelBannerContainer
            onClick={() => {
              closeModal();
              navigate(`/channel/${selectedChannel.customUrl}`);
            }}
          >
            <StyledBanner
              src={selectedChannel.thumbnails?.medium?.url}
              alt="Chaine youtube"
            />

            <StyledBannerInfos>
              <Text weight="800">{selectedChannel?.title}</Text>
              <Text> {selectedChannel.subscriberCount} abonnés</Text>
              <Text size="s"> {selectedChannel.viewCount} vues</Text>
            </StyledBannerInfos>
          </StyledChannelBannerContainer>
          <StyledButtonContainer>
            <Button
              label={isSubscribed ? "Abonné(e)" : "S'abonner"}
              icon={isSubscribed ? <Check /> : <Wifi />}
              onClick={() =>
                isSubscribed
                  ? removeSubscription(selectedChannel.channelId)
                  : addSubscription(selectedChannel.channelId)
              }
              color="red"
              disabled={!user}
              style={{ borderRadius: "35px", whiteSpace: "nowrap" }}
              name={"subscribe"}
            />
          </StyledButtonContainer>
        </StyledChannelData>
      )}
    </>
  );
}
