<<<<<<< HEAD
export const APP_URL = process.env.EXPO_PUBLIC_APP_URL;
console.log(')))))))))', APP_URL)
export const ZARINPAL_CALLBACK_URL = process.env.EXPO_PUBLIC_ZARINPAL_CALLBACK_URL;
export const WALLET_ZARINPAL_CALLBACK_URL = process.env.EXPO_PUBLIC_WALLET_ZARINPAL_CALLBACK_URL;
export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const PAGE_SIZE = parseInt(process.env.EXPO_PUBLIC_PAGE_SIZE as string, 10);
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const RERENDERING_INSPECTOR_IS_ACTIVE =
  process.env.EXPO_PUBLIC_RERENDERING_INSPECTOR_IS_ACTIVE === "true";
export const MAP_TILER_KEY = process.env.EXPO_PUBLIC_MAP_TILER_KEY;
export const APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION;
=======
export const APP_URL = `http://localhost:8081`
export const BASE_URL = `https://api.hamafza-startup.ir`
export const ZARINPAL_CALLBACK_URL = `${APP_URL}/transactionPaymentStatus`
export const WALLET_ZARINPAL_CALLBACK_URL = `${APP_URL}/wallet/receipt/paymentStatus?`
export const PAGE_SIZE = `10`
export const API_URL = `${BASE_URL}/graphql/`
export const RERENDERING_INSPECTOR_IS_ACTIVE = `false`
export const MAP_TILER_KEY = `Of87hpCmWUtdhJL4OG3k`
export const APP_VERSION = `2.0.25`
>>>>>>> master
