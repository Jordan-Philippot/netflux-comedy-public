import styled from "styled-components";
import { COLOR_BLUE } from "utils/colors";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { ChannelData } from "api/channel.type";
import { setSearchResult, setSearchText } from "redux/video";
import { useState } from "react";
import Fuse from "fuse.js";
import { mergeAndRemoveDuplicates } from "utils/mergeAndRemoveDuplicates";

// ----------
// Component
// ----------
import type { InputProps } from "components/ui/Input";
import Search from "components/icon/Search";
import Cross from "components/icon/Cross";
import { VideoDataType } from "api/video.type";

interface ExtendedInputProps extends InputProps {
  hasSearch: boolean;
}

const StyledSearchInputContainer = styled.div`
  display: block;
  width: 200px;
  overflow: hidden;
`;
const StyledSearchInput = styled.input<ExtendedInputProps>`
  display: block;
  position: relative;
  width: 100%;
  right: ${(props) => (props.hasSearch ? 0 : "-100%")};
  padding: ${(props) => (props.hasSearch ? "10px 15px" : "0")};
  border: none; /* Assure-toi que la bordure est nulle si nécessaire */
  transition: all 0.7s ease;
  box-sizing: border-box;
  overflow: hidden;
  height: 35px;
  border-radius: 2px;
  :active,
  :focus {
    outline: none;
    border: 1px solid ${COLOR_BLUE};
  }
`;
const StyledSearchContainer = styled.div`
  margin: auto 15px;
  cursor: pointer;
  svg {
    width: 22px;
    height: 22px;
  }
`;
export default function SearchInput() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  // Get data
  const channelsData = queryClient.getQueryData(["channels"]) as ChannelData[];

  // Input onChange
  const checkSearchBar = () => {
    if (hasSearch) {
      setSearch("");
      dispatch(setSearchResult([]));
      dispatch(setSearchText(""));
    }
    setHasSearch((prev) => !prev);
  };

  const setSearchAndResult = (e: string) => {
    dispatch(setSearchText(e));
    setSearch(e);
    if (e.length === 0) {
      dispatch(setSearchResult([]));
      return;
    }

    // -----------------
    // Filter by Channel
    // -----------------
    const fuseOptionsChannel = {
      threshold: 0.2,
      keys: ["title"],
    };

    const fuseChannel = new Fuse(channelsData, fuseOptionsChannel);

    const resultsChannel = fuseChannel.search(e);
    const channelsResult: VideoDataType[] = resultsChannel.flatMap(
      (channel) => channel.item.videos
    );

    // -----------------
    // Filter by Videos
    // -----------------
    const fuseOptionsVideos = {
      threshold: 0.2,
      keys: ["title", "description", "tags"],
    };

    const allVideos: VideoDataType[] = channelsData.flatMap(
      (channel) => channel.videos
    );

    const fuseVideos = new Fuse(allVideos, fuseOptionsVideos);
    const resultVideos = fuseVideos.search(e);
    // Change type
    const videosResult: VideoDataType[] = resultVideos.map(
      (result) => result.item
    );

    const resultArray = mergeAndRemoveDuplicates(videosResult, channelsResult);
    dispatch(setSearchResult(resultArray));
  };

  return (
    <>
      <StyledSearchInputContainer>
        <StyledSearchInput
          onChange={(e) => setSearchAndResult(e.target.value)}
          placeholder="Titre, Description, Chaîne..."
          type="text"
          hasSearch={hasSearch}
          value={search}
        />
      </StyledSearchInputContainer>
      <StyledSearchContainer onClick={checkSearchBar}>
        {hasSearch ? <Cross /> : <Search />}
      </StyledSearchContainer>
    </>
  );
}
