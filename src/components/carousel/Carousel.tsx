import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { COLOR_BLACK, COLOR_BOX_SHADOW, COLOR_GREY_LIGHT } from "utils/colors";

// --------------
// Components
// --------------
import Arrow from "components/icon/Arrow";
import Title from "components/ui/Title";
import CardItem from "../CardItem";

// --------------
// Api
// --------------
import { VideoDataType } from "api/video.type";
import { ChannelData } from "api/channel.type";
import { ResumeType } from "api/resume.type";

interface CardItems {
  channel?: ChannelData;
  resumes?: ResumeType[];
}

const StyledCarouselContainer = styled.div`
  margin-bottom: 90px;
  .carouselCustom {
    .slick-track {
      margin-left: 0;
    }
  }
`;

const StyledArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 35px;
  background-color: ${COLOR_BLACK};
  box-shadow: 0 0 10px 1px ${COLOR_BOX_SHADOW};
  opacity: 0.7;
  color: white;
  border-radius: 6px;

  :hover {
    opacity: 0.9;
    background-color: ${COLOR_BLACK};
    box-shadow: 0 0 10px 2px ${COLOR_BOX_SHADOW};
    z-index: 3;
  }
  :before {
    content: "";
  }
`;

export const StyledTitleLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    h2 {
      color: ${COLOR_GREY_LIGHT};
    }
  }
`;

function NextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <StyledArrow className={className} onClick={onClick}>
      <Arrow />
    </StyledArrow>
  );
}

function PrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <StyledArrow className={className} onClick={onClick}>
      <Arrow rotation="left" />
    </StyledArrow>
  );
}

export default function Carousel({ channel, resumes }: CardItems) {
  const settings = {
    infinite: resumes ? false : true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipe: false,
    className: resumes ? "carouselCustom" : "",
    centerMode: true,
    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1499,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <StyledCarouselContainer>
      {channel && (
        <>
          <StyledTitleLink to={"/channel/" + channel.customUrl}>
            <Title
              size="h2"
              weight="600"
              style={{ marginBottom: "15px", zIndex: 2, cursor: "pointer" }}
            >
              {channel.title}
            </Title>
          </StyledTitleLink>

          <Slider {...settings}>
            {channel.videos &&
              channel.videos.map((item: VideoDataType, key) => (
                <CardItem
                  item={item}
                  key={key}
                  channel={(({ videos, ...channel }) => channel)(channel)}
                />
              ))}
          </Slider>
        </>
      )}

      {resumes && (
        <>
          <Title
            size="h2"
            weight="600"
            style={{ marginBottom: "15px", zIndex: 2, cursor: "pointer" }}
          >
            {resumes[0].finished ? "À revoir" : "Reprendre la lecture"}
          </Title>

          <Slider {...settings}>
            {resumes &&
              resumes.map((item: ResumeType, key) => (
                <CardItem
                  item={item.video}
                  key={key}
                  channel={item.video.channel}
                  resume={item}
                />
              ))}
          </Slider>
        </>
      )}
    </StyledCarouselContainer>
  );
}
