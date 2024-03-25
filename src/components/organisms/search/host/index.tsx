import React, { useState } from "react";
import { Button, useTheme } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import useTranslation from "@src/hooks/translation";
import SearchHostMap from "@organisms/search/host/map";
import SearchHostList from "@organisms/search/host/list";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const SearchHost: React.FC = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { isShowMap } = useLocalSearchParams();
  const [showMap, setShowMap] = useState<boolean>(isShowMap === "false" ? false : true);

  const showMapButton = (
    <Button
      size="sm"
      color="secondary"
      containerStyle={{ margin: "auto" }}
      onPress={() => setShowMap(showMap => !showMap)}
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
    <SearchHostMap button={showMapButton} />
  ) : (
    <SearchHostList button={showMapButton} />
  );
};

export default SearchHost;
