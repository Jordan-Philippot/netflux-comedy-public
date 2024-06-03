import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getChannelsVideos } from "api/channel";
import { device } from "utils/breakpoints";

// --------------
// Components
// --------------
import Carousel from "./Carousel";
import Loader from "components/ui/Loader";
import CarouselResume from "./CarouselResume";
import { useAuth } from "hooks/useAuth";
import { Suspense, useDeferredValue } from "react";
import LoaderSuspense from "components/ui/LoaderSuspense";

const StyledCarouselsContainer = styled.main`
  position: relavtive;
  z-index: 3;
  padding: 0 20px;
  margin-top: 50px;
  @media ${device.laptop} {
    padding: 0 40px;
    margin-top: -160px;
  }
  @media ${device.laptopL} {
    padding: 0 60px;
  }
`;

export default function CarouselsContainer() {
  const { data: channels, isLoading: isChannelsLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannelsVideos(),
  });

  const firstChannel = channels?.slice(0, 1);

  const restOfChannels = channels?.slice(1);
  const deferredRestOfChannels = useDeferredValue(restOfChannels);

  const { user } = useAuth();

  return (
    <StyledCarouselsContainer>
      {isChannelsLoading ? (
        <Loader />
      ) : (
        <>
          {firstChannel &&
            firstChannel.map(
              (channel, key) =>
                !channel?.madeForKids && (
                  <Carousel channel={channel} key={key} />
                )
            )}

          {user && (
            <Suspense fallback={<LoaderSuspense />}>
              <CarouselResume />
            </Suspense>
          )}
          {deferredRestOfChannels &&
            deferredRestOfChannels.map(
              (channel, key) =>
                !channel?.madeForKids && (
                  <Suspense fallback={<LoaderSuspense />} key={key}>
                    <Carousel channel={channel} key={key} />
                  </Suspense>
                )
            )}
        </>
      )}
    </StyledCarouselsContainer>
  );
}
