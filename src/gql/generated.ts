import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  GenericScalar: { input: any; output: any; }
};

export type AddresListsType = {
  __typename?: 'AddresListsType';
  customer?: Maybe<Array<Maybe<AddressType>>>;
  vendor?: Maybe<Array<Maybe<AddressType>>>;
};

/** An enumeration. */
export enum AddressAddressType {
  /** Business */
  Business = 'BUSINESS',
  /** Home */
  Home = 'HOME'
}

export type AddressInputType = {
  address?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
};

export type AddressType = {
  __typename?: 'AddressType';
  address?: Maybe<Scalars['String']['output']>;
  addressType?: Maybe<AddressAddressType>;
  archived: Scalars['Boolean']['output'];
  deleted: Scalars['Boolean']['output'];
  draft: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  objectId?: Maybe<Scalars['Int']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
};

export type BaseExceptionType = {
  __typename?: 'BaseExceptionType';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

/** An enumeration. */
export enum BusinessSettingCurrency {
  /** cad */
  Cad = 'CAD',
  /** eur */
  Eur = 'EUR',
  /** usd */
  Usd = 'USD'
}

/** An enumeration. */
export enum BusinessSettingDateFormat {
  /** dd_mm_yyyy */
  DdMmYyyy = 'DD_MM_YYYY',
  /** mm_dd_yyyy */
  MmDdYyyy = 'MM_DD_YYYY'
}

export type BusinessSettingType = {
  __typename?: 'BusinessSettingType';
  archived: Scalars['Boolean']['output'];
  bankAccountEnabled: Scalars['Boolean']['output'];
  bankAccountFinancialInstNo?: Maybe<Scalars['String']['output']>;
  bankAccountNo?: Maybe<Scalars['String']['output']>;
  bankAccountOwner?: Maybe<Scalars['String']['output']>;
  bankAccountTransitNo?: Maybe<Scalars['String']['output']>;
  business?: Maybe<BusinessType>;
  cashEnabled: Scalars['Boolean']['output'];
  currency?: Maybe<BusinessSettingCurrency>;
  dateFormat?: Maybe<BusinessSettingDateFormat>;
  deleted: Scalars['Boolean']['output'];
  draft: Scalars['Boolean']['output'];
  emailPhone?: Maybe<Scalars['String']['output']>;
  emailPhoneEnabled: Scalars['Boolean']['output'];
  greetingText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  includingGreeting?: Maybe<Scalars['Boolean']['output']>;
  includingPaymentInformation: Scalars['Boolean']['output'];
  includingSignature: Scalars['Boolean']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  paymentInformation?: Maybe<Scalars['String']['output']>;
  paypalEnabled: Scalars['Boolean']['output'];
  paypalValue?: Maybe<Scalars['String']['output']>;
  template?: Maybe<InvoiceTemplateType>;
  web3Address?: Maybe<Scalars['String']['output']>;
  web3CryptocurrencyType?: Maybe<BusinessSettingWeb3CryptocurrencyType>;
  web3EmailPhone?: Maybe<Scalars['String']['output']>;
  web3Enabled: Scalars['Boolean']['output'];
  /** Enable or disable web push only in this device */
  webPushNotification: Scalars['Boolean']['output'];
};

/** An enumeration. */
export enum BusinessSettingWeb3CryptocurrencyType {
  /** Not Selected */
  A = 'A_',
  /** Bitcoin (BTC) */
  BitcoinBtc = 'BITCOIN_BTC_',
  /** BNB (BNB) */
  BnbBnb = 'BNB_BNB_',
  /** CRONOS (CRO) */
  CronosCro = 'CRONOS_CRO_',
  /** Dogecoin (DOGE) */
  DogecoinDoge = 'DOGECOIN_DOGE_',
  /** Ethereum (Eth) */
  EthereumEth = 'ETHEREUM_ETH_',
  /** Solana (Sol) */
  SolanaSol = 'SOLANA_SOL_',
  /** Tether (USDT)-ERC20 */
  TetherUsdtErc20 = 'TETHER_USDT_ERC20',
  /** Tether (USDT)-POLYGON */
  TetherUsdtPolygon = 'TETHER_USDT_POLYGON',
  /** USD Coin (USDC)-ERC-20 */
  UsdCoinUsdcErc_20 = 'USD_COIN_USDC_ERC_20',
  /** USD Coin (USDC)-POLYGON */
  UsdCoinUsdcPolygon = 'USD_COIN_USDC_POLYGON'
}

export type BusinessSettingsInputType = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  bankAccountEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  bankAccountFinancialInstNo?: InputMaybe<Scalars['String']['input']>;
  bankAccountNo?: InputMaybe<Scalars['String']['input']>;
  bankAccountOwner?: InputMaybe<Scalars['String']['input']>;
  bankAccountTransitNo?: InputMaybe<Scalars['String']['input']>;
  cashEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  currency?: InputMaybe<CurrencyEnum>;
  dateFormat?: InputMaybe<DateFormatEnum>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  emailPhone?: InputMaybe<Scalars['String']['input']>;
  emailPhoneEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  greetingText?: InputMaybe<Scalars['String']['input']>;
  includingGreeting?: InputMaybe<Scalars['Boolean']['input']>;
  includingPaymentInformation?: InputMaybe<Scalars['Boolean']['input']>;
  includingSignature?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  paymentInformation?: InputMaybe<Scalars['String']['input']>;
  paypalEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paypalValue?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['ID']['input']>;
  web3Address?: InputMaybe<Scalars['String']['input']>;
  web3CryptocurrencyType?: InputMaybe<Scalars['String']['input']>;
  web3EmailPhone?: InputMaybe<Scalars['String']['input']>;
  web3Enabled?: InputMaybe<Scalars['Boolean']['input']>;
  webPushNotification?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BusinessType = {
  __typename?: 'BusinessType';
  accountantEmail: Scalars['String']['output'];
  address?: Maybe<Scalars['String']['output']>;
  archived: Scalars['Boolean']['output'];
  businesssetting?: Maybe<BusinessSettingType>;
  city: Scalars['String']['output'];
  costSet: Array<CostType>;
  country: Scalars['String']['output'];
  deleted: Scalars['Boolean']['output'];
  draft: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mobilePhone: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner?: Maybe<ClientType>;
  ownerName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
};

export type CashflowReportType = {
  __typename?: 'CashflowReportType';
  endOfPeriod?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  periodType?: Maybe<ReportPeriodType>;
  report?: Maybe<Scalars['GenericScalar']['output']>;
  startOfPeriod?: Maybe<Scalars['Date']['output']>;
  title?: Maybe<Scalars['GenericScalar']['output']>;
};

export type ClientInputType = {
  address?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  pk?: InputMaybe<Scalars['ID']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
};

export type ClientType = {
  __typename?: 'ClientType';
  address?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  preferredName?: Maybe<Scalars['String']['output']>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String']['output'];
};

export type CompanyProfileInputType = {
  accountantEmail?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  mobilePhone?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  neighbourhood?: InputMaybe<Scalars['String']['input']>;
  ownerName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type CostInputType = {
  cost?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  taxList?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type CostType = {
  __typename?: 'CostType';
  archived: Scalars['Boolean']['output'];
  business?: Maybe<BusinessType>;
  cost?: Maybe<Scalars['Float']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  deleted: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  draft: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Float']['output'];
  tax: Array<TaxType>;
  unit?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
export enum CurrencyEnum {
  Cad = 'cad',
  Eur = 'eur',
  Usd = 'usd'
}

export type CustomerInputType = {
  address?: InputMaybe<Array<InputMaybe<AddressInputType>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pk?: InputMaybe<Scalars['ID']['input']>;
  relatedEnduser?: InputMaybe<Scalars['ID']['input']>;
};

/** An enumeration. */
export enum DateFormatEnum {
  DdMmYyyy = 'dd_mm_yyyy',
  MmDdYyyy = 'mm_dd_yyyy'
}

export type EventFilterType = {
  dateFrom: Scalars['String']['input'];
  dateTo: Scalars['String']['input'];
};

export type EventInputType = {
  datetime?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type EventType = {
  __typename?: 'EventType';
  archived: Scalars['Boolean']['output'];
  datetime?: Maybe<Scalars['DateTime']['output']>;
  deleted: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  draft: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<ClientType>;
};

export type FilterFieldInputType = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  fieldValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type FilterType = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  filterFields?: InputMaybe<Array<InputMaybe<FilterFieldInputType>>>;
  ordering?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type InstallmentInputType = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  paymentType?: InputMaybe<PaymentTypeEnum>;
};

/** An enumeration. */
export enum InstallmentPaymentType {
  /** bank_account */
  BankAccount = 'BANK_ACCOUNT',
  /** cash */
  Cash = 'CASH',
  /** paypal */
  Paypal = 'PAYPAL',
  /** web3 */
  Web3 = 'WEB3'
}

export type InstallmentType = {
  __typename?: 'InstallmentType';
  amount?: Maybe<Scalars['Decimal']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  invoice?: Maybe<InvoiceType>;
  isPaid: Scalars['Boolean']['output'];
  paymentType: InstallmentPaymentType;
};

export type InvoiceAndCostType = {
  __typename?: 'InvoiceAndCostType';
  Id?: Maybe<Scalars['String']['output']>;
  client?: Maybe<ClientType>;
  cost?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  draft?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
export enum InvoiceDiscountType {
  /** amount */
  Amount = 'AMOUNT',
  /** percent */
  Percent = 'PERCENT'
}

/** Enums for Invoice `discount_type` based on `Invoice.DISCOUNT_TYPE` choices */
export enum InvoiceDiscountTypeEnum {
  Amount = 'AMOUNT',
  Percent = 'PERCENT'
}

export type InvoiceFilterType = {
  clientList?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  dueDateFrom?: InputMaybe<Scalars['String']['input']>;
  dueDateTo?: InputMaybe<Scalars['String']['input']>;
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<InvoiceKindEnum>;
  status?: InputMaybe<InvoiceStatusEnum>;
};

export type InvoiceInputType = {
  client?: InputMaybe<Scalars['ID']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  discount?: InputMaybe<Scalars['Int']['input']>;
  discountType?: InputMaybe<InvoiceDiscountTypeEnum>;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  installmentSet: Array<InputMaybe<InstallmentInputType>>;
  kind?: InputMaybe<InvoiceKindEnum>;
  lineItems: Array<InputMaybe<LineItemInputType>>;
  taxList?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  transactionType?: InputMaybe<TransactionTypeEnum>;
};

/** An enumeration. */
export enum InvoiceKind {
  /** invoice */
  Invoice = 'INVOICE',
  /** quotation */
  Quotation = 'QUOTATION'
}

/** Enums for Invoice `kind` based on `Invoice.INVOICE_TYPES` choices */
export enum InvoiceKindEnum {
  Invoice = 'INVOICE',
  Quotation = 'QUOTATION'
}

export enum InvoiceStatusEnum {
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Upcoming = 'UPCOMING'
}

export type InvoiceTemplateType = {
  __typename?: 'InvoiceTemplateType';
  archived: Scalars['Boolean']['output'];
  deleted: Scalars['Boolean']['output'];
  draft: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  template?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
export enum InvoiceTransactionType {
  /** buy */
  Buy = 'BUY',
  /** sell */
  Sell = 'SELL'
}

export type InvoiceType = {
  __typename?: 'InvoiceType';
  client?: Maybe<ClientType>;
  date?: Maybe<Scalars['Date']['output']>;
  discount: Scalars['Float']['output'];
  discountType?: Maybe<InvoiceDiscountType>;
  draft: Scalars['Boolean']['output'];
  dueDate?: Maybe<Scalars['Date']['output']>;
  enduser?: Maybe<ClientType>;
  id: Scalars['ID']['output'];
  installmentSet: Array<InstallmentType>;
  isPaid: Scalars['Boolean']['output'];
  kind: InvoiceKind;
  lineitemSet: Array<LineItemType>;
  paidAmount?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  taxList: Array<TaxType>;
  title?: Maybe<Scalars['String']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  transactionType?: Maybe<InvoiceTransactionType>;
};

export type LineItemInputType = {
  description?: InputMaybe<Scalars['String']['input']>;
  productService: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  taxable?: InputMaybe<Scalars['Boolean']['input']>;
  unitPrice: Scalars['Float']['input'];
};

export type LineItemType = {
  __typename?: 'LineItemType';
  archived: Scalars['Boolean']['output'];
  deleted: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  draft: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  invoice?: Maybe<InvoiceType>;
  kind?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  productService?: Maybe<ProductServiceType>;
  quantity: Scalars['Float']['output'];
  taxable: Scalars['Boolean']['output'];
  unit?: Maybe<Scalars['String']['output']>;
  unitPrice?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  businessProfile?: Maybe<ResponseType>;
  businessSettings?: Maybe<ResponseType>;
  client?: Maybe<ResponseType>;
  cost?: Maybe<ResponseType>;
  /**
   * Add customer mutation:
   *
   * :param customers: customers you want to delete
   * :returns: Http 201
   */
  customer?: Maybe<ResponseType>;
  delete?: Maybe<ResponseType>;
  eventAdd?: Maybe<ResponseType>;
  eventDelete?: Maybe<ResponseType>;
  eventEdit?: Maybe<ResponseType>;
  invoice?: Maybe<ResponseType>;
  passwordReset?: Maybe<ResponseType>;
  productService?: Maybe<ProductServiceResponseSuccessType>;
  refreshToken?: Maybe<Refresh>;
  revokeToken?: Maybe<Revoke>;
  sendPasswordResetCode?: Maybe<ResponseType>;
  smsLogin?: Maybe<ResponseType>;
  smsLoginVerification?: Maybe<SmsLoginVerification>;
  tax?: Maybe<ResponseType>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  transaction?: Maybe<ResponseType>;
  userProfile?: Maybe<ResponseType>;
  /**
   * Add vendor mutation:
   *
   * :param customers: vendors you want to delete
   * :returns: Http 201
   */
  vendor?: Maybe<ResponseType>;
  verifyToken?: Maybe<Verify>;
};


export type MutationBusinessProfileArgs = {
  input: CompanyProfileInputType;
};


export type MutationBusinessSettingsArgs = {
  businessSettings?: InputMaybe<BusinessSettingsInputType>;
};


export type MutationClientArgs = {
  input?: InputMaybe<ClientInputType>;
};


export type MutationCostArgs = {
  input: CostInputType;
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCustomerArgs = {
  customers?: InputMaybe<Array<InputMaybe<CustomerInputType>>>;
};


export type MutationDeleteArgs = {
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  objectType?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEventAddArgs = {
  input?: InputMaybe<EventInputType>;
};


export type MutationEventDeleteArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationEventEditArgs = {
  input?: InputMaybe<EventInputType>;
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationInvoiceArgs = {
  input: InvoiceInputType;
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationPasswordResetArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationProductServiceArgs = {
  amount?: InputMaybe<Scalars['String']['input']>;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<ProductServiceKindEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  pk?: InputMaybe<Scalars['ID']['input']>;
  priceLast?: InputMaybe<Scalars['String']['input']>;
  priceTotalBuy?: InputMaybe<Scalars['String']['input']>;
  priceTotalSell?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRevokeTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendPasswordResetCodeArgs = {
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSmsLoginArgs = {
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSmsLoginVerificationArgs = {
  activeCode?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTaxArgs = {
  input: TaxInputType;
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationTokenAuthArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationTransactionArgs = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  input: TransactionInputType;
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUserProfileArgs = {
  input: UserProfileInputType;
};


export type MutationVendorArgs = {
  vendors?: InputMaybe<Array<InputMaybe<VendorInputType>>>;
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type NotificationType = {
  __typename?: 'NotificationType';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  seen: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export enum PaymentTypeEnum {
  BankAccount = 'BANK_ACCOUNT',
  Cash = 'CASH',
  Paypal = 'PAYPAL',
  Web3 = 'WEB3'
}

export enum PeriadicallyCashflowTypeEnum {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type PeriodicallyCashflowReportFilterType = {
  includeOutstanding: Scalars['Boolean']['input'];
  periodType?: InputMaybe<PeriadicallyCashflowTypeEnum>;
};

/** An enumeration. */
export enum ProductServiceKind {
  /** product */
  Product = 'PRODUCT',
  /** service */
  Service = 'SERVICE'
}

export enum ProductServiceKindEnum {
  Product = 'PRODUCT',
  Service = 'SERVICE'
}

export type ProductServiceResponseSuccessType = {
  __typename?: 'ProductServiceResponseSuccessType';
  message?: Maybe<Scalars['String']['output']>;
  object?: Maybe<ProductServiceType>;
  status?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ProductServiceType = {
  __typename?: 'ProductServiceType';
  /**
   *
   *         Product: Number of units</br>
   *         Services: How many times the service was rendered
   *
   */
  amount?: Maybe<Scalars['Float']['output']>;
  archived: Scalars['Boolean']['output'];
  available?: Maybe<Scalars['Boolean']['output']>;
  canEdit?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted: Scalars['Boolean']['output'];
  draft: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  kind: ProductServiceKind;
  lineitemSet: Array<LineItemType>;
  name?: Maybe<Scalars['String']['output']>;
  /**
   *
   *         Product: Last Unit Price</br>
   *         Service: Last Total Price
   */
  priceLast?: Maybe<Scalars['Float']['output']>;
  /** Total money paid */
  priceTotalBuy?: Maybe<Scalars['Float']['output']>;
  /** Total money received */
  priceTotalSell?: Maybe<Scalars['Float']['output']>;
  topImage?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProfitAndLossReportFilterType = {
  dateEnd: Scalars['String']['input'];
  dateStart: Scalars['String']['input'];
  includeOutstanding: Scalars['Boolean']['input'];
  type?: InputMaybe<ProfitAndLossTypeEnum>;
};

export enum ProfitAndLossTypeEnum {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type Query = {
  __typename?: 'Query';
  addressList?: Maybe<AddresListsType>;
  business?: Maybe<BusinessType>;
  businessSetting?: Maybe<BusinessSettingType>;
  cost?: Maybe<CostType>;
  costList?: Maybe<Array<Maybe<CostType>>>;
  currencyList?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  customer?: Maybe<UserType>;
  customerList?: Maybe<Array<Maybe<UserType>>>;
  daysWithEvent?: Maybe<Scalars['GenericScalar']['output']>;
  event?: Maybe<EventType>;
  eventList?: Maybe<Scalars['GenericScalar']['output']>;
  installment?: Maybe<InstallmentType>;
  invoice?: Maybe<InvoiceType>;
  invoiceAndCostList?: Maybe<Array<Maybe<InvoiceAndCostType>>>;
  invoiceList?: Maybe<Array<Maybe<InvoiceType>>>;
  invoiceRecommendedId?: Maybe<Scalars['ID']['output']>;
  invoiceTemplateList?: Maybe<Array<Maybe<InvoiceTemplateType>>>;
  notificationList?: Maybe<Array<Maybe<NotificationType>>>;
  productServic?: Maybe<ProductServiceType>;
  productServiceDelete?: Maybe<ResponseType>;
  productServiceList?: Maybe<Array<Maybe<ProductServiceType>>>;
  reportCashflow?: Maybe<CashflowReportType>;
  reportProfitAndLoss?: Maybe<Scalars['GenericScalar']['output']>;
  tax?: Maybe<TaxType>;
  taxList?: Maybe<Array<Maybe<TaxType>>>;
  transaction?: Maybe<TransactionType>;
  transactionList?: Maybe<Array<Maybe<TransactionType>>>;
  userList?: Maybe<Array<Maybe<UserType>>>;
  userProfile?: Maybe<UserProfileType>;
  vendor?: Maybe<UserType>;
  vendorList?: Maybe<Array<Maybe<UserType>>>;
};


export type QueryAddressListArgs = {
  ownerType?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  q?: InputMaybe<Scalars['String']['input']>;
  relatedEnduser?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCostArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCostListArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCustomerArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
  relatedEnduser?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCustomerListArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
  relatedEnduser?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEventArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEventListArgs = {
  filter: EventFilterType;
};


export type QueryInstallmentArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryInvoiceArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryInvoiceAndCostListArgs = {
  filter?: InputMaybe<FilterType>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  resetCache?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInvoiceListArgs = {
  filter?: InputMaybe<InvoiceFilterType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductServicArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryProductServiceDeleteArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryProductServiceListArgs = {
  filter?: InputMaybe<FilterType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReportCashflowArgs = {
  filter?: InputMaybe<PeriodicallyCashflowReportFilterType>;
};


export type QueryReportProfitAndLossArgs = {
  filter?: InputMaybe<ProfitAndLossReportFilterType>;
};


export type QueryTaxArgs = {
  enduserId?: InputMaybe<Scalars['ID']['input']>;
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTaxListArgs = {
  enduserId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTransactionArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserListArgs = {
  filter?: InputMaybe<FilterType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVendorArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
  relatedEnduser?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryVendorListArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
  relatedEnduser?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

/** An enumeration. */
export enum ReportPeriodType {
  /** Daily */
  Daily = 'DAILY',
  /** Monthly */
  Monthly = 'MONTHLY',
  /** Quarterly */
  Quarterly = 'QUARTERLY',
  /** Weekly */
  Weekly = 'WEEKLY',
  /** Yearly */
  Yearly = 'YEARLY'
}

export type ResponseSuccessType = {
  __typename?: 'ResponseSuccessType';
  message?: Maybe<Scalars['String']['output']>;
  object?: Maybe<Scalars['GenericScalar']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseType = BaseExceptionType | ResponseSuccessType;

export type Revoke = {
  __typename?: 'Revoke';
  revoked: Scalars['Int']['output'];
};

export type SmsLoginVerification = {
  __typename?: 'SMSLoginVerification';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type TaxInputType = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TaxType = {
  __typename?: 'TaxType';
  amount: Scalars['Float']['output'];
  archived: Scalars['Boolean']['output'];
  costSet: Array<CostType>;
  deleted: Scalars['Boolean']['output'];
  draft: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type TransactionInputType = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  invoice?: InputMaybe<Scalars['ID']['input']>;
};

export type TransactionType = {
  __typename?: 'TransactionType';
  amount?: Maybe<Scalars['Int']['output']>;
  archived: Scalars['Boolean']['output'];
  datetime?: Maybe<Scalars['Date']['output']>;
  deleted: Scalars['Boolean']['output'];
  draft: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  invoice: InvoiceType;
};

export enum TransactionTypeEnum {
  Buy = 'BUY',
  Sell = 'SELL'
}

export type UserProfileInputType = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  preferredName?: InputMaybe<Scalars['String']['input']>;
};

export type UserProfileType = {
  __typename?: 'UserProfileType';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  avatarBase64?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  preferredName?: Maybe<Scalars['String']['output']>;
};

/**
 * Customized implemented fields:
 * - ``full_name``
 * - ``is_customer``
 * - ``is_vendor``
 *
 * Native fields from model:
 *
 * - ``id``
 * - ``deleted``
 * - ``archived``
 * - ``username``
 * - ``first_name``
 * - ``last_name``
 * - ``email``
 * - ``avatar``
 * - ``fullName``
 * - ``is_customer``
 * - ``is_vendor``
 */
export type UserType = {
  __typename?: 'UserType';
  address?: Maybe<Scalars['String']['output']>;
  archived: Scalars['Boolean']['output'];
  avatar?: Maybe<Scalars['String']['output']>;
  deleted: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isCustomer?: Maybe<Scalars['Boolean']['output']>;
  isVendor?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String']['output'];
};

export type VendorInputType = {
  address?: InputMaybe<Array<InputMaybe<AddressInputType>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pk?: InputMaybe<Scalars['ID']['input']>;
  relatedEnduser?: InputMaybe<Scalars['ID']['input']>;
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar']['output'];
};
