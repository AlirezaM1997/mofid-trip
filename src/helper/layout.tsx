import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export const getDrawerContent = (props) => {
  // this function show `docs` page only in development mode
  // `docs` page contains storybook stories
  // https://snack.expo.dev/embedded/@aboutreact/keeping-the-screen-in-navigation-drawer-but-hide-its-name-from-navigation-options?iframeId=zf7h2uz6mi&preview=true&platform=ios&theme=dark
  const filteredProps = {
    ...props,
    state: {
      ...props.state,
      routeNames: props.state.routeNames.filter(
        (routeName) => __DEV__ || routeName !== "docs"
      ),
      routes: props.state.routes.filter((route) => __DEV__ || route.name !== "docs"),
    },
  };

  return (
    <DrawerContentScrollView {...filteredProps}>
      <DrawerItemList {...filteredProps} />
    </DrawerContentScrollView>
  );
};
