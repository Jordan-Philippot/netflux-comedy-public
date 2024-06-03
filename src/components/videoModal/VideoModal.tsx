import { useEffect, useState, useRef, RefObject, Suspense } from "react";
import styled from "styled-components";
import { useModal } from "components/context/ModalContext";
import {
  COLOR_BLACK_LIGHT,
  COLOR_BLACK_LIGHTER,
  COLOR_WHITE,
} from "utils/colors";
import { useLike } from "hooks/useLike";
import { useFavorite } from "hooks/useFavorite";
import { LikeTypeType } from "api/like.type";
import { useAuth } from "hooks/useAuth";
import { device } from "utils/breakpoints";
// --------------
// Components
// --------------
import Modal from "components/ui/Modal";
import Title from "components/ui/Title";
import Text from "components/ui/Text";
import SvgButton from "components/ui/SvgButton";
import Add from "components/icon/Add";
import Like from "components/icon/Like";
import Tooltip from "components/ui/Tooltip";
import Mute from "components/icon/Mute";
import UnMute from "components/icon/UnMute";
import ButtonPlay from "components/ui/ButtonPlay";
import ChannelDescription from "./ChannelDescription";
import Check from "components/icon/Check";
import LikeFull from "components/icon/LikeFull";
import Comment from "components/icon/Comment";
import Stats from "components/icon/Stats";
import Calendar from "components/icon/Calendar";
import { addVideoEventListener, muteVideo } from "utils/controlVideo";
import LoaderSuspense from "components/ui/LoaderSuspense";

interface VideosProps {
  ref: RefObject<HTMLVideoElement>;
}

const StyledModalVideo = styled.video<VideosProps>`
  width: 100%;
  height: 500px;
  border-radius: 6px 6px 0 0;
  border: none;
  display: block;
  opacity: 1;
  z-index:5:
`;

const StyledModalHeader = styled.div`
  position: relative;
  background: ${COLOR_BLACK_LIGHT};
}`;

const StyledModalBody = styled.div`
  padding: 20px;
  @media ${device.tablet} {
    padding: 40px;
  }
`;

const StyledBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  svg {
    width: 26px;
    height: 26px;
  }
  @media ${device.mobile} {
    flex-direction: row;
  }
`;
const StyledIconContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 25px;
  @media ${device.mobile} {
    margin-top: 0;
  }
`;
const StyledDescriptionContainer = styled.div`
  background-color: ${COLOR_BLACK_LIGHTER};
  border-radius: 6px;
  padding: 15px 15px 0 15px;
  margin-bottom: 25px;
`;

const StyledStatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 15px;
`;

export default function VideoModal() {
  const { selectedVideo, isModalOpen, closeModal, resume } = useModal();
  const { user } = useAuth();
  const { addLike, removeLike, userLikeList, findUserLike } = useLike();
  const { addFavorite, findUserFavorite, userFavorites, removeFavorite } =
    useFavorite();

  const videoRef: RefObject<HTMLVideoElement> = useRef(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playedVideo, setPlayedVideo] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>();

  const styledStatsContainer = {
    marginBottom: "25px",
    backgroundColor: COLOR_BLACK_LIGHT,
    color: COLOR_WHITE,
    borderRadius: "6px",
    padding: "10px 20px",
    width: "fit-content",
    display: "flex",
    gap: "0 10px",
  };

  useEffect(() => {
    if (selectedVideo) findUserFavorite(selectedVideo.videoId, setIsFavorite);
  }, [userFavorites, selectedVideo, findUserFavorite]);

  const [isLiked, setIsLiked] = useState<boolean>();

  useEffect(() => {
    if (selectedVideo) findUserLike(selectedVideo.videoId, setIsLiked);
  }, [userLikeList, selectedVideo, findUserLike]);

  useEffect(() => {
    if (isModalOpen) {
      addVideoEventListener(videoRef, setPlayedVideo, setIsMuted);
    }
  }, [videoRef, isModalOpen]);

  const closeModalWithResumeTime = () => {
    const currentRef = videoRef.current;
    closeModal(currentRef?.currentTime);
  };
  useEffect(() => {
    if (selectedVideo && resume) {
      const currentRef = videoRef.current;
      if (currentRef) currentRef.currentTime = resume.resumeTime;
    }
  }, [selectedVideo, resume, videoRef]);

  return (
    <Modal opened={isModalOpen} onClose={closeModalWithResumeTime}>
      <StyledModalHeader>
        {selectedVideo?.filePath && (
          <>
            <link
              rel="preload"
              href={selectedVideo.thumbnails?.maxres?.url}
              as="image"
            />
            <StyledModalVideo
              title="Netflux iframe video"
              controls
              id={selectedVideo?.videoId}
              ref={videoRef}
              muted={isMuted}
              poster={selectedVideo.thumbnails?.maxres?.url}
            >
              <source
                src={`${process.env.REACT_APP_CLOUDFRONT_AWS_VIDEOS}${selectedVideo.filePath}`}
                type="video/mp4"
              />
            </StyledModalVideo>
          </>
        )}
      </StyledModalHeader>
      {selectedVideo && (
        <StyledModalBody>
          <StyledBtnContainer>
            <ButtonPlay videoRef={videoRef} playedVideo={playedVideo} />
            {/* -----------------
               Favorite Component
              ------------------- */}
            <StyledIconContainer>
              <Tooltip
                position="top"
                label={
                  <SvgButton
                    disabled={!user}
                    title="Ajouter à vos favoris"
                    onClick={() => {
                      isFavorite
                        ? removeFavorite(selectedVideo.videoId)
                        : addFavorite(selectedVideo.videoId);
                    }}
                  >
                    {isFavorite ? <Check /> : <Add />}
                  </SvgButton>
                }
              >
                <Text
                  size="xl"
                  weight={"800"}
                  color={"secondary"}
                  style={{ textAlign: "center" }}
                >
                  {isFavorite ? "Retirer de ma liste" : "Ajouter à ma liste"}
                </Text>
              </Tooltip>

              {/* -----------------
               Like Component
              ------------------- */}
              <Tooltip
                position="top"
                label={
                  <SvgButton
                    disabled={!user}
                    title="Ajouter un j'aime"
                    onClick={() =>
                      isLiked
                        ? removeLike(selectedVideo.videoId)
                        : addLike(selectedVideo.videoId, LikeTypeType.like)
                    }
                  >
                    {isLiked ? <LikeFull /> : <Like />}
                  </SvgButton>
                }
              >
                <Text
                  size="xl"
                  weight={"800"}
                  color={"secondary"}
                  style={{ textAlign: "center" }}
                >
                  {isLiked ? "Je n'aime plus ce contenu" : "J'aime ce contenu"}
                </Text>
              </Tooltip>

              <SvgButton
                title="Mute video"
                onClick={() => muteVideo(videoRef)}
                style={{ marginLeft: "auto" }}
              >
                {isMuted ? <Mute /> : <UnMute />}
              </SvgButton>
            </StyledIconContainer>
          </StyledBtnContainer>

          {/* ---------------------
              Channel Informations 
          ------------------------- */}
          <ChannelDescription />

          <Title
            size="h2"
            weight="600"
            style={{ marginBottom: "15px", width: "90%" }}
          >
            {selectedVideo.title}
          </Title>

          <StyledDescriptionContainer>
            <StyledStatsContainer>
              {selectedVideo.viewCount && (
                <Text size="l" color="secondary" style={styledStatsContainer}>
                  <Stats /> {selectedVideo.viewCount} vues
                </Text>
              )}
              <Text size="l" color="secondary" style={styledStatsContainer}>
                <Calendar />
                Publié le {selectedVideo.publishedAt?.substring(0, 10)}
              </Text>
              {selectedVideo.viewCount && (
                <Text size="l" color="secondary" style={styledStatsContainer}>
                  <Comment /> {selectedVideo.commentCount} commentaires
                </Text>
              )}
            </StyledStatsContainer>
            {selectedVideo.description && (
              <Text
                style={{ color: COLOR_WHITE, paddingBottom: "15px" }}
                weight="800"
              >
                {selectedVideo.description}
              </Text>
            )}
          </StyledDescriptionContainer>

          <Suspense fallback={<LoaderSuspense />}>
            {selectedVideo.tags && (
              <StyledDescriptionContainer>
                <Text
                  style={{ color: COLOR_WHITE, paddingBottom: "15px" }}
                  weight="800"
                  size="s"
                >
                  {selectedVideo.tags?.map((tag: string) => "#" + tag + " - ")}
                </Text>
              </StyledDescriptionContainer>
            )}
          </Suspense>
        </StyledModalBody>
      )}
    </Modal>
  );
}
