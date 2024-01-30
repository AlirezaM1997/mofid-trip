import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import SearchHostMap from "@organisms/search/host/map";
import SearchHostList from "@organisms/search/host/list";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const SearchHost: React.FC = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const [showMap, setShowMap] = useState(false);

  navigation.setOptions({
    title: tr("search for hosts"),
  });

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
    <SearchHostMap button={showMapButton} />
  ) : (
    <SearchHostList button={showMapButton} />
  );
};

export default SearchHost;
