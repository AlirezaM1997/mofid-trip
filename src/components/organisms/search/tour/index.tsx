import React, { useState } from "react";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import SearchTourMap from "@organisms/search/tour/map";
import SearchTourList from "@organisms/search/tour/list";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const SearchTour: React.FC = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [showMap, setShowMap] = useState<boolean>(true);

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

  return showMap ? (
    <SearchTourMap button={showMapButton} />
  ) : (
    <SearchTourList button={showMapButton} />
  );
};

export default SearchTour;
