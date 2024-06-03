import {
  StyledPageContainer,
  StyledVideosContainer,
} from "pages/UserSubscriptions";
import { COLOR_BLUE, COLOR_GREY } from "utils/colors";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

// ----------
// Component
// ----------
import CardItem from "components/CardItem";
import Title from "components/ui/Title";
import Text from "components/ui/Text";
import LoaderSuspense from "components/ui/LoaderSuspense";

export default function SearchHome() {
  const { searchResult, search, isLoading } = useSelector(
    (state: RootState) => state.video
  );

  return (
    <StyledPageContainer>
      <Title weight="800" style={{ marginTop: "120px" }}>
        Les résultats de votre recherche :
      </Title>
      <Title
        weight="800"
        size="h2"
        style={{
          textShadow: "1px 1px 30px" + COLOR_BLUE,
          color: COLOR_GREY,
        }}
      >
        {search.toLocaleUpperCase()}
      </Title>
      {/* Search Results */}
      {isLoading ? (
        <LoaderSuspense />
      ) : (
        <StyledVideosContainer>
          {searchResult.length > 0 ? (
            searchResult?.map((result, key) => (
              <CardItem
                item={result}
                key={key}
                channel={(({ videos, ...channel }) => channel)(result.channel)}
              />
            ))
          ) : (
            <Text>Aucun résultat n'est disponible</Text>
          )}
        </StyledVideosContainer>
      )}
    </StyledPageContainer>
  );
}
