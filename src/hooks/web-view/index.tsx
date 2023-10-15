import { useNavigation } from "@react-navigation/native";
import { setProjectDetail, setProjectSet, setProjectSetArguments } from "@src/slice/project-slice";
import { setData } from "@src/slice/transaction-slice";
import { setLoginData } from "@src/slice/user-slice";
import { useDispatch } from "react-redux";

const actions = {
  setLoginData: setLoginData,
  setProjectDetail: setProjectDetail,
  setProjectSet: setProjectSet,
  setProjectSetArguments: setProjectSetArguments,
  setData: setData,
};

interface DispatchType {
  action: keyof typeof actions;
  variables?: any;
}

interface HandlePostMessageArgs {
  fn: "navigate" | "dispatch";
  args?: DispatchType;
}

const useWebViewPostMessage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePostMessage = (fn: HandlePostMessageArgs["fn"], args: HandlePostMessageArgs["args"]) => {
    switch (fn) {
      case "navigate":
        navigation.navigate(args);
        break;

      case "dispatch":
        const { action, variables } = args;
        dispatch(actions[action](variables));
        break;
    }
  };
  return handlePostMessage;
};

export default useWebViewPostMessage;
