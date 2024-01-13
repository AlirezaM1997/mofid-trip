import { Icon, Input, InputProps, ListItem, useTheme } from "@rneui/themed";
import { useLocalizedNumberFormat } from "@src/hooks/translation";
import { MAP_TILER_KEY } from "@src/settings";
import { useEffect, useState } from "react";

export type locationType = {
  placeNameFa: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type SearchPropsType = InputProps & {
  onSelect: (location: locationType) => void;
};

const Search = ({ value, onSelect, ...props }: SearchPropsType) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [locations, setLocations] = useState([]);
  const [text, setText] = useState();
  const { localizeNumber } = useLocalizedNumberFormat();

  const _onChangeText = async t => {
    setText(t);
    if (t) {
      const q = t.replace(" ", "%20");
      const result = await fetch(
        `https://api.maptiler.com/geocoding/${q}.json?proximity=ip&fuzzyMatch=true&key=${MAP_TILER_KEY}`,
        {
          headers: {
            accept: "*/*",
            "accept-language": "en,fa;q=0.9,en-US;q=0.8,ar;q=0.7",
            "sec-ch-ua": '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
          referrer: "https://docs.maptiler.com/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "omit",
        }
      );
      const jsonResult = await result.json();
      setLocations(
        jsonResult.features
          .map(f => ({
            placeNameFa: f.place_name_fa,
            location: { lat: f.center[0], lng: f.center[1] },
          }))
          .slice(0, 3)
      );
      props.onChangeText(text);
    }
  };

  useEffect(() => {
    setOpen(text?.length);
  }, [text]);

  return (
    <>
      <Input {...props} onChangeText={_onChangeText} />
      {open && text &&
        locations.map((loc, index) => (
          <ListItem
            key={index}
            bottomDivider={index + 1 !== locations.length}
            onPress={() => {
              onSelect(loc);
              setOpen(false);
            }}>
            <ListItem.Content>
              <ListItem.Title>{localizeNumber(loc.placeNameFa)}</ListItem.Title>
            </ListItem.Content>
            <Icon name="map-pin" type="feather" color={theme.colors.black} />
          </ListItem>
        ))}
    </>
  );
};

export default Search;
