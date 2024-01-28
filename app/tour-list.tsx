import React, { useState } from "react";
import useTranslation from "@src/hooks/translation";
import SearchTourMap from "@modules/search/tour/map";
import SearchTourList from "@modules/search/tour/list";
import { Button, Divider, useTheme } from "@rneui/themed";
import SearchBar from "@src/components/modules/search-bar";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const TourListScreen: React.FC = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [showMap, setShowMap] = useState(false);

  const showMapButton = (
    <Button
      size="sm"
      color="secondary"
      onPress={() => setShowMap(showMap => !showMap)}
      containerStyle={{ margin: "auto" }}
      icon={
        showMap ? (
          <Ionicons name="list-sharp" size={15} color={theme.colors.white} />
        ) : (
          <FontAwesome name="map" size={15} color={theme.colors.white} />
        )
      }>
      {showMap ? tr("show list") : tr("show map")}
    </Button>
  );

  return (
    <>
      <SearchBar />
      <Divider />

      {showMap ? (
        <SearchTourMap button={showMapButton} />
      ) : (
        <SearchTourList button={showMapButton} />
      )}
    </>
  );
};

export default TourListScreen;
