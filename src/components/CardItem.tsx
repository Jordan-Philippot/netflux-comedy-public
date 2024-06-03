import styled from "styled-components";
import { unescapeHtml } from "utils/unescapeHtml";
import { COLOR_BLACK, COLOR_GREY_LIGHT, COLOR_RED } from "utils/colors";
import { useModal } from "components/context/ModalContext";
import { device } from "utils/breakpoints";

// ------
// Api
// ------
import { VideoDataType } from "api/video.type";
import { ChannelType } from "api/channel.type";
import { ResumeType } from "api/resume.type";
import { Suspense } from "react";
import LoaderSuspense from "./ui/LoaderSuspense";

interface CardItemProps {
  item: VideoDataType;
  channel: ChannelType;
  style?: React.CSSProperties;
  resume?: ResumeType;
}
const StyledCardItem = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 2px;
  max-width: 300px;
  height: auto;
  :hover img {
    opacity: 1;
  }
  :hover div {
    opacity: 1;
  }
  @media ${device.laptop} {
    max-width: 350px;
  }
`;
const StyledItemImage = styled.img`
  opacity: 1;
  display: block;
  transition: 0.5s ease;
  backface-visibility: hidden;
  width: 100%;
  height: auto;
  border-radius: 2px;
`;
const StyledProgressBar = styled.div<{ viewPercent?: number | null }>`
  opacity: 1;
  display: block;
  width: ${(props) => (typeof props.viewPercent === "number" ? "100%" : 0)};
  height: 5px;
  background-color: ${COLOR_GREY_LIGHT}20;
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  div {
    width: ${(props) =>
      typeof props.viewPercent === "number" ? props.viewPercent + "%" : 0};
    height: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${COLOR_RED};
  }
`;
const StyledOverlayImg = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: ${COLOR_BLACK}EE;
  border-radius: 2px;
`;

const StyledTitle = styled.div`
  position: relative;
  color: white;
  font-size: 12px;
  padding: 15px;
  font-weight: 600;
  margin: auto;
  z-index: 3;

  @media ${device.laptop} {
    padding: 25px;
  }

  @media ${device.desktop} {
    font-size: 14px;
  }
`;

export default function CardItem({
  item,
  channel,
  resume,
  style,
}: CardItemProps) {
  const { openModal } = useModal();

  const openModalWithVideo = () => {
    return openModal(item, channel, resume);
  };
  const thumbnails = item.thumbnails;

  const viewPercent = resume ? (resume.resumeTime / item.duration) * 100 : null;
  return (
    <Suspense fallback={<LoaderSuspense />}>
      <StyledCardItem onClick={openModalWithVideo} className="card-item">
        <StyledItemImage
          src={thumbnails?.medium && thumbnails.medium.url}
          alt={item.title}
        />
        <StyledProgressBar viewPercent={viewPercent}>
          <div></div>
        </StyledProgressBar>
        <StyledOverlayImg>
          <StyledTitle>{item?.title && unescapeHtml(item.title)}</StyledTitle>
        </StyledOverlayImg>
      </StyledCardItem>
    </Suspense>
  );
}
