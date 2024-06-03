import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import {
  RefObject,
  Suspense,
  useEffect,
  useRef,
  useState,
  startTransition,
} from "react";
import { COLOR_GREY_LIGHT, COLOR_WHITE } from "utils/colors";
import { device } from "utils/breakpoints";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import { addVideoEventListener, muteVideo } from "utils/controlVideo";
import { useModal } from "components/context/ModalContext";
import { Helmet } from "react-helmet-async";

// ----------
// Api
// ----------
import { getVidéoById } from "api/video";

// ----------
// Component
// ----------
import InfoCircle from "components/icon/InfoCircle";
import CarouselsContainer from "components/carousel/CarouselsContainer";
import LoaderPage from "components/ui/LoaderPage";
import Button from "components/ui/Button";
import ButtonPlay from "components/ui/ButtonPlay";
import SvgButton from "components/ui/SvgButton";
import SearchHome from "components/search/SearchHome";
import Mute from "components/icon/Mute";
import UnMute from "components/icon/UnMute";

interface VideosProps {
  ref: RefObject<HTMLVideoElement>;
}

const StyledContainerHome = styled.div`
  position: relative;
  z-index: 0;
  min-width: 100vw;
  height: 100%;
  margin-top: 40px;
  @media ${device.laptop} {
    height: 100vh;
  }
`;

const StyledVideoHome = styled.video<VideosProps>`
  position: relative;
  top: 20px;
  width: 100%;
  height: 100%;
  min-height: 75vh;
  border: none;
  object-fit: cover;
  @media ${device.laptop} {
    position: relative;
    top: 0;
    height: 100vh;
  }
`;

const StyledHomeInfos = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  margin-left: 20px;
  width: calc(90vw - 20px);
  @media ${device.mobile} {
    margin-left: 40px;
    width: calc(90vw - 40px);
  }
  @media ${device.tablet} {
    width: 60%;
  }
  @media ${device.laptop} {
    position: relative;
    z-index: 2;
    top: -50%;
    transform: translateY(calc(-50% - 40px));
    z-index: 2;
    margin-left: 60px;
    width: 40vw;
  }
`;

const StyledTitleVideo = styled.h1`
  text-transform: uppercase;
  text-shadow: 0px 0px 5px #00000030;
  color: ${COLOR_WHITE};
  font-size: 16px;
  padding-bottom: 10px;
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 20px;
  }
  @media ${device.laptopL} {
    font-size: 26px;
  }
`;

const StyledDescriptionVideo = styled.p`
  margin-top: 15px;
  font-size: 12px;
  color: ${COLOR_GREY_LIGHT};
  font-style: italic;
  fon-weight: bold;
  text-shadow: 0px 0px 5px #00000030;
  @media ${device.laptop} {
    font-size: 14px;
  }
  @media ${device.laptopL} {
    font-size: 16px;
  }
  @media ${device.desktop} {
    font-size: 18px;
  }
`;

const StyledBtnContainer = styled.div`
  display: flex;
  margin-top: 25px;
  pointer-events: auto;

  button {
    width: fit-content;
    font-size: 18px;
    svg {
      display: none;
    }
  }
  @media ${device.mobile} {
    button {
      width: auto;
      font-size: 20px;
      svg {
        display: block;
      }
    }
  }
`;

export default function Home() {
  const videoHomepageIdDesktop = process.env.REACT_APP_HOMEPAGE_VIDEO_ID_DESKTOP as string;
  const videoHomepageIdobile = process.env.REACT_APP_HOMEPAGE_VIDEO_ID_MOBILE as string;

  const { openModal, isModalOpen } = useModal();

  const videoRef: RefObject<HTMLVideoElement> = useRef(null);

  const { data: videoHomepage } = useQuery({
    queryKey: ["videoHomepage"],
    queryFn: () => getVidéoById(window.innerWidth < 768 ? videoHomepageIdobile : videoHomepageIdDesktop),
  });

  // --------------------------
  // Loading Vidéo
  // --------------------------
  const [playedVideo, setPlayedVideo] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const { isLoading: isSearchLoading, search } = useSelector(
    (state: RootState) => state.video
  );

  useEffect(() => {
    if (videoHomepage) {
      addVideoEventListener(videoRef, setPlayedVideo, setIsMuted);
    }
  }, [videoRef, videoHomepage]);

  useEffect(() => {
    startTransition(() => {
      const currentVideo = videoRef.current;
      if (isModalOpen && !currentVideo?.paused) {
        currentVideo?.pause();
      }
    });
  }, [isModalOpen]);

  return (
    <>
      <Helmet>
        <title>Netflux Comedy</title>
      </Helmet>
      {(() => {
        if (isSearchLoading) {
          return <LoaderPage />;
        } else if (search.length > 0) {
          return (
            <Suspense fallback={<LoaderPage />}>
              <SearchHome />
            </Suspense>
          );
        } else if (videoHomepage) {
          return (
            <>
              {/* Preload poster for higesht priority */}
              <link
                rel="preload"
                href={videoHomepage.thumbnails?.maxres?.url}
                as="image"
              />
              <link
                rel="preload"
                href={
                  process.env.REACT_APP_CLOUDFRONT_AWS_VIDEOS +
                  videoHomepage.filePath
                }
                as="video"
                type="video/mp4"
              />
              <StyledContainerHome>
                <StyledVideoHome
                  title={videoHomepage.title}
                  ref={videoRef}
                  id={videoHomepage?.videoId}
                  controls
                  poster={videoHomepage.thumbnails?.maxres?.url}
                  muted={isMuted}
                >
                  <source
                    src={
                      process.env.REACT_APP_CLOUDFRONT_AWS_VIDEOS +
                      videoHomepage.filePath
                    }
                    type="video/mp4"
                  />
                </StyledVideoHome>
                <StyledHomeInfos>
                  <StyledTitleVideo>{videoHomepage.title}</StyledTitleVideo>
                  <StyledDescriptionVideo>
                    {videoHomepage.description && videoHomepage.description}
                  </StyledDescriptionVideo>
                  <StyledBtnContainer>
                    <ButtonPlay videoRef={videoRef} playedVideo={playedVideo} />
                    <Button
                      color="dark"
                      label={"Informations"}
                      name={"informations"}
                      icon={<InfoCircle />}
                      onClick={() =>
                        openModal(videoHomepage, videoHomepage?.channel)
                      }
                    />
                  </StyledBtnContainer>
                </StyledHomeInfos>

                <SvgButton
                  onClick={() => muteVideo(videoRef)}
                  title="Mute video"
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: "25px",
                  }}
                >
                  {isMuted ? <Mute /> : <UnMute />}
                </SvgButton>
              </StyledContainerHome>

              <CarouselsContainer />
            </>
          );
        } else {
          return <LoaderPage />;
        }
      })()}
    </>
  );
}
