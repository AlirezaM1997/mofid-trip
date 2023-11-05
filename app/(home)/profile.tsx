import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Container from "@src/components/atoms/container";
import { BottomSheet, Button, ListItem, Text, useTheme } from "@rneui/themed";
import WhiteSpace from "@src/components/atoms/white-space";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "@src/theme";
import { logout } from "@src/slice/user-slice";
import { APP_VERSION } from "@src/settings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { LanguageChoiceEnum, useSettingEditMutation } from "@src/gql/generated";
import useSettingDetail from "@src/hooks/db/setting-detail";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { I18nManager } from "react-native";
import { getFullName } from "@src/helper/extra";
import useIsRtl from "@src/hooks/localization";
import { router, useRootNavigationState } from "expo-router";
import { useIsAuthenticated } from "@src/hooks/user";
import Authentication from "app/(stack)/authentication";

const Profile: React.FC = () => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const isAuthenticated = useIsAuthenticated();
  const [isVisible, setIsVisible] = useState(false);
  const rootNavigationState = useRootNavigationState();
  const { userDetail } = useSelector((state: RootState) => state.userSlice);
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail);
  const userId = useSelector((state: RootState) => state.userSlice?.loginData?.metadata?.id);
  const [settingEdit] = useSettingEditMutation({
    notifyOnNetworkStatusChange: true,
  });
  const { syncTable } = useSettingDetail();
  const [isVisibleLogout, setIsVisibleLogout] = useState(false);
  const { localizeNumber } = useLocalizedNumberFormat();

  I18nManager.allowRTL(true);

  // if you open new tab and enter page url in addressbar and try to open, you see an error. the error described in
  // https://stackoverflow.com/questions/76828511/expo-router-error-attempted-to-navigate-before-mounting-the-root-layout-compone
  // we should use this line of code to render page if navigation was ready
  if (!rootNavigationState?.key) return null;

  if (!isAuthenticated)
    return router.push({
      pathname: "/authentication",
      params: { protectedScreen: "/profile" },
    });

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleNavigateToEditProfile = () => router.push("/editProfile");

  const handleNavigateToComingSoon = () => router.push("/comingSoon");

  const openLanguageSetting = () => setIsVisible(true);

  const handleChangeLang = (lang: LanguageChoiceEnum) => {
    settingEdit({
      variables: {
        data: {
          language: lang,
        },
      },
    }).then(res => {
      setIsVisible(false);
      const ok = res.data.settingEdit.status === "OK";
      if (ok) {
        syncTable({ userId: userId });
      }
    });
  };

  return (
    <>
      <WhiteSpace size={30} />
      <ScrollView>
        <Container size={15}>
          <Pressable style={style.userInfo} onPress={handleNavigateToEditProfile}>
            {userDetail?.avatarS3?.small ? (
              <Image style={style.userAvatar} source={{ uri: userDetail.avatarS3.small }} />
            ) : (
              <View style={style.userAvatar}>
                <Feather name="user" size={24} color="black" />
              </View>
            )}

            <View>
              <Text heading2>{localizeNumber(getFullName(userDetail)) || tr("No Name")}</Text>
              <Text center>{localizeNumber(userDetail?.username)}</Text>
            </View>
          </Pressable>
        </Container>
        <WhiteSpace size={20} />

        <Container>
          <Text color="grey3">{tr("Account")}</Text>
        </Container>
        <ListItem onPress={handleNavigateToEditProfile}>
          <Feather name="user" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={style.label(isRtl)}>{tr("Account Detail")}</ListItem.Title>
          </ListItem.Content>
          <Feather
            name={isRtl ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors.grey3}
          />
        </ListItem>

        {userDetail.isNgo && (
          <>
            <WhiteSpace size={20} />
            <Container>
              <Text color="grey3">{tr("Managements")}</Text>
            </Container>
            <ListItem bottomDivider onPress={openLanguageSetting}>
              <Feather name="aperture" size={24} color="black" />
              <ListItem.Content>
                <ListItem.Title style={style.label(isRtl)}>{tr("Create Tour")}</ListItem.Title>
              </ListItem.Content>
              <Feather
                name={isRtl ? "chevron-left" : "chevron-right"}
                size={24}
                color={theme.colors.grey3}
              />
            </ListItem>
            <ListItem onPress={openLanguageSetting}>
              <Feather name="aperture" size={24} color="black" />
              <ListItem.Content>
                <ListItem.Title style={style.label(isRtl)}>{tr("Manage My Tours")}</ListItem.Title>
              </ListItem.Content>
              <Feather
                name={isRtl ? "chevron-left" : "chevron-right"}
                size={24}
                color={theme.colors.grey3}
              />
            </ListItem>
          </>
        )}

        {!userDetail.isNgo && (
          <>
            <WhiteSpace size={20} />
            <Container>
              <Text color="grey3">{tr("Managements")}</Text>
            </Container>
            <ListItem onPress={openLanguageSetting}>
              <Feather name="aperture" size={24} color="black" />
              <ListItem.Content>
                <ListItem.Title style={style.label(isRtl)}>
                  {tr("Tours and my travels")}
                </ListItem.Title>
              </ListItem.Content>
              <Feather
                name={isRtl ? "chevron-left" : "chevron-right"}
                size={24}
                color={theme.colors.grey3}
              />
            </ListItem>
          </>
        )}

        <WhiteSpace size={20} />

        <Container>
          <Text color="grey3">{tr("Requests")}</Text>
        </Container>
        <ListItem bottomDivider onPress={openLanguageSetting}>
          <Feather name="aperture" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={style.label(isRtl)}>{tr("My Tours Requests")}</ListItem.Title>
          </ListItem.Content>
          <Feather
            name={isRtl ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors.grey3}
          />
        </ListItem>
        <ListItem onPress={openLanguageSetting}>
          <Feather name="aperture" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={style.label(isRtl)}>{tr("My Requests")}</ListItem.Title>
          </ListItem.Content>
          <Feather
            name={isRtl ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors.grey3}
          />
        </ListItem>

        <WhiteSpace size={20} />

        <ListItem bottomDivider onPress={openLanguageSetting}>
          <Feather name="aperture" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={style.label(isRtl)}>{tr("Language Settings")}</ListItem.Title>
          </ListItem.Content>
          <Text type="primary">{tr(language)}</Text>
        </ListItem>
        <ListItem bottomDivider onPress={handleNavigateToComingSoon}>
          <Feather name="user-plus" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={style.label(isRtl)}>{tr("Invite Friends")}</ListItem.Title>
          </ListItem.Content>
          <Feather
            name={isRtl ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors.grey3}
          />
        </ListItem>
        <ListItem bottomDivider onPress={handleNavigateToComingSoon}>
          <Feather name="headphones" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={style.label(isRtl)}>{tr("Support")}</ListItem.Title>
          </ListItem.Content>
          <Feather
            name={isRtl ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors.grey3}
          />
        </ListItem>
        <ListItem bottomDivider onPress={handleNavigateToComingSoon}>
          <Feather name="info" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={style.label(isRtl)}>{tr("About MofidTrip")}</ListItem.Title>
          </ListItem.Content>
          <Feather
            name={isRtl ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors.grey3}
          />
        </ListItem>
        <ListItem bottomDivider onPress={() => router.push("/termsOfServices")}>
          <Feather name="shield" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Title style={style.label(isRtl)}>{tr("Terms of services")}</ListItem.Title>
          </ListItem.Content>
          <Feather
            name={isRtl ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors.grey3}
          />
        </ListItem>
        <ListItem onPress={() => setIsVisibleLogout(true)}>
          <Feather name="log-out" size={24} color={PRIMARY_COLOR} />
          <ListItem.Content>
            <ListItem.Title style={style.logoutStyle(isRtl)}>{tr("Logout")}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <Text style={style.version(isRtl)}>
          {tr("version")} {localizeNumber(APP_VERSION)}
        </Text>
      </ScrollView>
      <WhiteSpace size={10} />
      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        {Object.values(LanguageChoiceEnum).map(lang => (
          <ListItem key={lang} bottomDivider onPress={() => handleChangeLang(lang)}>
            <ListItem.CheckBox
              checkedIcon={<Feather name="check-circle" size={24} />}
              uncheckedIcon={<Feather name="circle" size={24} />}
              checked={lang.toUpperCase() === language.toUpperCase()}
              onPress={() => handleChangeLang(lang)}
            />
            <ListItem.Content>
              <ListItem.Title style={style.label(isRtl)}>{tr(lang)}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <BottomSheet isVisible={isVisibleLogout} onBackdropPress={() => setIsVisibleLogout(false)}>
        <ListItem>
          <ListItem.Content style={style.logoutContent}>
            <ListItem.Title>{tr("Are you sure you want to logout?")}</ListItem.Title>
            <View style={style.buttonContainer}>
              <Button containerStyle={style.logoutBtn} onPress={handleLogout}>
                {tr("Yes, Logout")}
              </Button>
              <Button
                containerStyle={style.logoutBtn}
                color="secondary"
                onPress={() => setIsVisibleLogout(false)}>
                {tr("No, Cancle")}
              </Button>
            </View>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </>
  );
};

const style = StyleSheet.create({
  userInfo: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  imageBackground: { marginRight: 10, width: 41, height: 41 },
  imageStyle: {
    borderRadius: 100,
    width: 41,
    height: 41,
    backgroundColor: "#fff",
  },
  logoutStyle: isRtl => ({
    color: PRIMARY_COLOR,
    fontWeight: "400",
    fontFamily: isRtl
      ? "DanaNoEn"
      : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  imageBackground2: {
    width: 174,
    height: 238,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  buttonItem: {
    flex: 1,
  },
  registerButtonStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
  },
  registerTitleStyle: {
    color: SECONDARY_COLOR,
  },
  userAvatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  label: isRtl => ({
    fontWeight: "400",
    fontFamily: isRtl
      ? "DanaNoEn"
      : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
  version: isRtl => ({
    textAlign: "center",
    fontWeight: "400",
    fontFamily: isRtl
      ? "DanaNoEn"
      : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
  logoutContent: { display: "flex", alignItems: "center", gap: 12 },
  buttonContainer: { display: "flex", flexDirection: "row", gap: 12 },
  logoutBtn: { flexGrow: 1 },
});

export default Profile;
