import React, { useState } from "react";
import useTranslation from "@src/hooks/translation";
import SearchHostMap from "@modules/search/host/map";
import SearchHostList from "@modules/search/host/list";
import { Button, Divider, useTheme } from "@rneui/themed";
import SearchBar from "@src/components/modules/search-bar";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const HostListScreen: React.FC = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [showMap, setShowMap] = useState(false);

  const showMapButton = (
    <Button
      color="secondary"
      onPress={() => setShowMap(showMap => !showMap)}
      icon={
        showMap ? (
          <Ionicons name="list-sharp" size={18} color={theme.colors.white} />
        ) : (
          <FontAwesome5 name="map-marked-alt" size={18} color={theme.colors.white} />
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
        <SearchHostMap button={showMapButton} />
      ) : (
        <SearchHostList button={showMapButton} />
      )}
    </>
  );
};

export default HostListScreen;
