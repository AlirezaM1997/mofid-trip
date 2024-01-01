import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  GenericScalar: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Input type for adding accommodation for the tour. */
export type AccommodationAddInputType = {
  /** Address of the accommodation. */
  address: Scalars['String']['input'];
  /** List of base64-encoded images. */
  base64Images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The city of the accommodation. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** Latitude of the accommodation. */
  lat: Scalars['Float']['input'];
  /** Longitude of the accommodation. */
  lng: Scalars['Float']['input'];
  /** The province of the accommodation. */
  province?: InputMaybe<Scalars['String']['input']>;
};

/** Input type for editing an existing accommodation. */
export type AccommodationEditInputType = {
  /** New address of the accommodation. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** List of new base64-encoded images. */
  base64Images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** New description of the accommodation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** New latitude of the accommodation. */
  lat?: InputMaybe<Scalars['Float']['input']>;
  /** New longitude of the accommodation. */
  lng?: InputMaybe<Scalars['Float']['input']>;
  /** New name of the accommodation. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** ID of the accommodation to edit. */
  pk: Scalars['ID']['input'];
};

/** Input type for filtering accommodations based on 'mine' field. */
export type AccommodationFilterType = {
  /** Filter by 'mine' value. */
  mine?: InputMaybe<TripleChoiceEnum>;
};

/** Type representing an accommodation image with different sizes. */
export type AccommodationImageType = {
  __typename?: 'AccommodationImageType';
  /** URL of the large image. */
  large?: Maybe<Scalars['String']['output']>;
  /** URL of the medium image. */
  medium?: Maybe<Scalars['String']['output']>;
  /** URL of the small image. */
  small?: Maybe<Scalars['String']['output']>;
};

/** Type representing a page of AccommodationQueryType objects. */
export type AccommodationListType = {
  __typename?: 'AccommodationListType';
  /** Total count of accommodations. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of accommodation data. */
  data?: Maybe<Array<Maybe<AccommodationQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** An enumeration. */
export enum AccommodationProjectGenderChoices {
  /** BOTH */
  Both = 'BOTH',
  /** FEMALE */
  Female = 'FEMALE',
  /** MALE */
  Male = 'MALE'
}

/** An enumeration. */
export enum AccommodationProjectRequestFromChoices {
  /** BOTH */
  Both = 'BOTH',
  /** NGO */
  Ngo = 'NGO',
  /** USER */
  User = 'USER'
}

/** Type representing an Accommodation model with additional fields. */
export type AccommodationQueryType = {
  __typename?: 'AccommodationQueryType';
  address?: Maybe<Scalars['String']['output']>;
  /** List of accommodation avatar images. */
  avatarS3?: Maybe<Array<Maybe<AccommodationImageType>>>;
  city?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  projectSet: Array<ProjectQueryType>;
  province?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserQueryType>;
};

/** An enumeration. */
export enum AccountSettingLanguageChoices {
  /** AR */
  Ar = 'AR',
  /** EN_US */
  EnUs = 'EN_US',
  /** FA_IR */
  FaIr = 'FA_IR'
}

/** Input type for adding a new bank card. */
export type AddCardType = {
  /** The Primary Account Number (PAN) of the card. */
  cardPan: Scalars['String']['input'];
  /** The International Bank Account Number (IBAN) associated with the card. */
  iban?: InputMaybe<Scalars['String']['input']>;
  /** The title or name associated with the bank card. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Represents a geographic bounding box range type.
 *
 * Attributes:
 *     lat_low (graphene.Float): The lower latitude boundary.
 *     lat_high (graphene.Float): The upper latitude boundary.
 *     lng_low (graphene.Float): The lower longitude boundary.
 *     lng_high (graphene.Float): The upper longitude boundary.
 */
export type BBoxRangeType = {
  /** The upper latitude boundary. */
  latHigh?: InputMaybe<Scalars['Float']['input']>;
  /** The lower latitude boundary. */
  latLow?: InputMaybe<Scalars['Float']['input']>;
  /** The upper longitude boundary. */
  lngHigh?: InputMaybe<Scalars['Float']['input']>;
  /** The lower longitude boundary. */
  lngLow?: InputMaybe<Scalars['Float']['input']>;
};

export type BackCardQueryType = {
  __typename?: 'BackCardQueryType';
  cardPan?: Maybe<Scalars['String']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  wallet: UserWalletType;
};

/** Represents the backend version information. */
export type BackendVersion = {
  __typename?: 'BackendVersion';
  /** The build number of the backend. */
  buildNumber?: Maybe<Scalars['String']['output']>;
  /** The current version of the backend. */
  currentVersion?: Maybe<Scalars['String']['output']>;
  /** A generic scalar field to store additional features. */
  features?: Maybe<Scalars['GenericScalar']['output']>;
};

export type BankCardListType = {
  __typename?: 'BankCardListType';
  /** Total count of bank cards. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of bank cards. */
  data?: Maybe<Array<Maybe<BackCardQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing banner images in different sizes. */
export type BannerImageType = {
  __typename?: 'BannerImageType';
  /** URL of the large image. */
  large?: Maybe<Scalars['String']['output']>;
  /** URL of the medium image. */
  medium?: Maybe<Scalars['String']['output']>;
  /** URL of the small image. */
  small?: Maybe<Scalars['String']['output']>;
};

/** Type representing a page of BannerQueryType objects. */
export type BannerListType = {
  __typename?: 'BannerListType';
  /** Total count of banners. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of banners data. */
  data?: Maybe<Array<Maybe<BannerQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing a banner with additional fields. */
export type BannerQueryType = {
  __typename?: 'BannerQueryType';
  /** Banner image in different sizes. */
  avatarS3?: Maybe<BannerImageType>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

/** Type representing Capacity information. */
export type CapacityQueryType = {
  __typename?: 'CapacityQueryType';
  both: Scalars['Int']['output'];
  child: Scalars['Boolean']['output'];
  female: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  male: Scalars['Int']['output'];
};

/** Type representing reserved capacity. */
export type CapacityReserveType = {
  __typename?: 'CapacityReserveType';
  allCap?: Maybe<Scalars['Int']['output']>;
  female?: Maybe<Scalars['Int']['output']>;
  male?: Maybe<Scalars['Int']['output']>;
};

/**
 * Represents a Capacity type for a object.
 *
 * Attributes:
 *     male (graphene.Int): The capacity for males.
 *     female (graphene.Int): The capacity for females.
 */
export type CapacityType = {
  female?: InputMaybe<Scalars['Int']['input']>;
  male?: InputMaybe<Scalars['Int']['input']>;
};

export enum CategoryFilterEnum {
  Apartment = 'Apartment',
  Beachfront = 'Beachfront',
  Hussainiyah = 'Hussainiyah',
  Moukeb = 'Moukeb',
  Room = 'Room'
}

/** Input type for filtering project categories. */
export type CategoryFilterType = {
  /** Filter project categories by name. */
  categoriesName?: InputMaybe<Array<InputMaybe<CategoryFilterEnum>>>;
};

/** Type representing a category image with different sizes. */
export type CategoryImageType = {
  __typename?: 'CategoryImageType';
  /** URL of the large image. */
  large?: Maybe<Scalars['String']['output']>;
  /** URL of the medium image. */
  medium?: Maybe<Scalars['String']['output']>;
  /** URL of the small image. */
  small?: Maybe<Scalars['String']['output']>;
};

/** Type representing a page of CategoryQueryType objects. */
export type CategoryListType = {
  __typename?: 'CategoryListType';
  /** Total count of categories. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of category data. */
  data?: Maybe<Array<Maybe<CategoryQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing a Category model with additional fields. */
export type CategoryQueryType = {
  __typename?: 'CategoryQueryType';
  /** Category avatar image. */
  avatarS3?: Maybe<CategoryImageType>;
  /** Display name of the category. */
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Name of the category. */
  name?: Maybe<Scalars['String']['output']>;
  projectSet: Array<ProjectQueryType>;
};

/** An InputObjectType for adding a new comment. */
export type CommentAddInputType = {
  /** The unique identifier of the object the comment is associated with. */
  objectId: Scalars['ID']['input'];
  /** The type of object the comment is associated with. */
  objectType: CommentObjectEnum;
  /** The text content of the comment. */
  text: Scalars['String']['input'];
};

export enum CommentObjectEnum {
  Comment = 'COMMENT',
  Project = 'PROJECT',
  Tour = 'TOUR'
}

/** A DjangoObjectType representing the Comment model. */
export type CommentType = {
  __typename?: 'CommentType';
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  /** The number of dislikes this comment has received. */
  dislikeCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  /** The number of likes this comment has received. */
  likeCount?: Maybe<Scalars['Int']['output']>;
  /** List of nested comments under this comment. */
  nestedComment?: Maybe<Array<Maybe<CommentType>>>;
  text: Scalars['String']['output'];
  user?: Maybe<UserQueryType>;
};

/**
 * Represents date range for specific input type (from `start` to `end` date).
 *
 * Attributes:
 *     start (graphene.String): The start date.
 *     end (graphene.String): The end date.
 */
export type DateRangeType = {
  /** The end date of the range. */
  end?: InputMaybe<Scalars['String']['input']>;
  /** The start date of the range. */
  start?: InputMaybe<Scalars['String']['input']>;
};

/** Input object type for deposit the user wallet. */
export type DepositWalletInputType = {
  /** Price/Amount of the purchase in TOMAN currency. */
  amount: Scalars['Float']['input'];
  /** URL for further information or following after purchase procedure */
  appLink: Scalars['String']['input'];
  /** Details related to the purchase */
  description: Scalars['String']['input'];
  /** IP address associated with the user's purchase */
  ip: Scalars['String']['input'];
};

/** Input type for editing the bank card. */
export type EditCardType = {
  /** The Primary Account Number (PAN) of the card. */
  cardPan?: InputMaybe<Scalars['String']['input']>;
  /** The International Bank Account Number (IBAN) associated with the card. */
  iban?: InputMaybe<Scalars['String']['input']>;
  /** The id of bank card */
  id: Scalars['ID']['input'];
  /** The title or name associated with the bank card. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** An enumeration. */
export enum ExtensionReportCategoryNameChoices {
  /** هرزنامه */
  Hrznmh = 'HRZNMH',
  /** حساب جعلی */
  HsbJLy = 'HSB_J_LY',
  /** محتوای غیراخلاقی */
  MhtwyGyrkhlqy = 'MHTWY_GYRKHLQY',
  /** محتوای خشونت آمیز */
  MhtwyKhshwntAmyz = 'MHTWY_KHSHWNT_AMYZ',
  /** سرقت اطلاعات خصوصی اشخاص */
  SrqtTlTKhswsyShkhs = 'SRQT_TL_T_KHSWSY_SHKHS',
  /** سایر */
  Syr = 'SYR'
}

/** Represents the frontend version information. */
export type FrontendVersion = {
  __typename?: 'FrontendVersion';
  /** The build number of the frontend. */
  buildNumber?: Maybe<Scalars['String']['output']>;
  /** The current version of the frontend. */
  currentVersion?: Maybe<Scalars['String']['output']>;
  /** A generic scalar field to store additional features. */
  features?: Maybe<Scalars['GenericScalar']['output']>;
};

export enum GuestGenderEnum {
  Child = 'CHILD',
  Female = 'FEMALE',
  Male = 'MALE'
}

/**
 * Represents int range for specific input type (from `low` to `high`).
 *
 * Attributes:
 *     low (graphene.Int): The lower boundary for the range.
 *     high (graphene.Int): The upper boundary int for the range.
 */
export type IntRangeType = {
  /** The upper boundary of the integer range. */
  high?: InputMaybe<Scalars['Int']['input']>;
  /** The lower boundary of the integer range. */
  low?: InputMaybe<Scalars['Int']['input']>;
};

export enum LanguageChoiceEnum {
  Ar = 'AR',
  EnUs = 'EN_US',
  FaIr = 'FA_IR'
}

/**
 * A Graphene InputObjectType for representing the input data required for a like or dislike action.
 *
 * This type defines the structure of the input necessary to perform a like or dislike on an object
 * within the system. It includes the ID of the object, the type of the object, and the status
 * indicating whether the action is a 'Like' or 'Dislike'.
 */
export type LikeInputType = {
  /** The ID of the object to which the like or dislike is being applied. */
  objectId: Scalars['Int']['input'];
  /** The type of object being liked or disliked. */
  objectType: LikeObjectEnum;
  /** The status of the action, indicating whether it is a 'LIKE' or 'DISLIKE'. */
  status: LikeStatusEnum;
};

export enum LikeObjectEnum {
  Comment = 'COMMENT'
}

export enum LikeStatusEnum {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

/**
 * Represents a Location type for a object.
 *
 * Attributes:
 *     province (graphene.String): The province part of the location.
 *     city (graphene.String): The city part of the location.
 */
export type LocationType = {
  city?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutation for adding a new accommodation. */
  accommodationAdd?: Maybe<ResponseBase>;
  /** Mutation for editing an existing accommodation. */
  accommodationEdit?: Maybe<ResponseBase>;
  /** Mutation for adding a bank card to a user's wallet. */
  bankCardAdd?: Maybe<ResponseBase>;
  /** Mutation for deleting a bank card to a user's wallet. */
  bankCardDelete?: Maybe<ResponseBase>;
  /** Mutation for editing the bank card to a user's wallet. */
  bankCardEdit?: Maybe<ResponseBase>;
  /** A Graphene mutation for adding comments to different types of objects like Projects, Tours, or other Comments. */
  commentAdd?: Maybe<ResponseBase>;
  /**
   * CreateLogin Mutation
   * This mutation is used to create a new user or NGO account and send an SMS activation code.
   */
  createLogin?: Maybe<ResponseBase>;
  /** Mutation for depositing money into the user's wallet and generating a payment request. */
  depositWallet?: Maybe<ResponseBase>;
  /** Mutation for editing a wallet transaction by a superuser. */
  editWalletTransaction?: Maybe<ResponseBase>;
  /** A Graphene mutation for adding or updating a 'Like' on a Comment object. */
  likeAdd?: Maybe<ResponseBase>;
  /**
   * NGOEdit Mutation
   * This mutation is used to edit an NGO's information, including their avatar image.
   */
  ngoEdit?: Maybe<ResponseBase>;
  /** Mutation for adding a new accommodation project. */
  projectAdd?: Maybe<ResponseBase>;
  /** Mutation for editing an existing accommodation project. */
  projectEdit?: Maybe<ResponseBase>;
  /** Mutation for adding purchase to project transaction. */
  projectPurchaseAdd?: Maybe<ResponseBase>;
  /**
   * ProjectTransactionAdd Mutation
   * This mutation is used to create a new project transaction.
   */
  projectTransactionAdd?: Maybe<ResponseBase>;
  /**
   * ProjectTransactionEdit Mutation
   * This mutation is used to edit the details of a project transaction.
   */
  projectTransactionEdit?: Maybe<ResponseBase>;
  /** A Graphene mutation for adding or updating a 'rating' on a Project or Tour object. */
  rateAdd?: Maybe<ResponseBase>;
  refreshToken?: Maybe<Refresh>;
  /** A Graphene mutation for adding report to different types of objects like Projects, Tours, or Comments. */
  reportAdd?: Maybe<ResponseBase>;
  /**
   * SettingEdit Mutation
   * This mutation is used to edit user settings, including the selected language.
   */
  settingEdit?: Maybe<ResponseBase>;
  tourAdd?: Maybe<ResponseBase>;
  /** Mutation to edit an existing tour. */
  tourEdit?: Maybe<ResponseBase>;
  /** Mutation for adding purchase to tour transaction. */
  tourPurchaseAdd?: Maybe<ResponseBase>;
  /**
   * TourTransactionAdd Mutation
   * This mutation is used to add a new tour transaction, including details of the tour, guest information, and transaction data.
   */
  tourTransactionAdd?: Maybe<ResponseBase>;
  /**
   * TourTransactionEdit Mutation
   * This mutation is used to edit an existing tour transaction, including updating its status and activation.
   */
  tourTransactionEdit?: Maybe<ResponseBase>;
  /**
   * UserEdit Mutation
   * This mutation is used to edit user information, including the user's avatar image.
   */
  userEdit?: Maybe<ResponseBase>;
  /**
   * UserGetToken Mutation
   * This mutation is used to retrieve an authentication token for a user.
   */
  userGetToken?: Maybe<ResponseUnion>;
  /**
   * UserLogout Mutation
   * This mutation is used to log out a user by deleting their refresh tokens.
   */
  userLogout?: Maybe<ResponseBase>;
  verifyToken?: Maybe<Verify>;
  /** Mutation for adding a request for a wallet transaction for withdrawal. */
  walletWithdraw?: Maybe<ResponseBase>;
};


export type MutationAccommodationAddArgs = {
  data: AccommodationAddInputType;
};


export type MutationAccommodationEditArgs = {
  data: AccommodationEditInputType;
};


export type MutationBankCardAddArgs = {
  data: AddCardType;
};


export type MutationBankCardDeleteArgs = {
  pk: Scalars['Int']['input'];
};


export type MutationBankCardEditArgs = {
  data: EditCardType;
};


export type MutationCommentAddArgs = {
  data: CommentAddInputType;
};


export type MutationCreateLoginArgs = {
  dataNgo?: InputMaybe<NgoInputType>;
  dataUser?: InputMaybe<UserInputType>;
};


export type MutationDepositWalletArgs = {
  data: DepositWalletInputType;
};


export type MutationEditWalletTransactionArgs = {
  data: WalletTransactionEditInputType;
};


export type MutationLikeAddArgs = {
  data: LikeInputType;
};


export type MutationNgoEditArgs = {
  data?: InputMaybe<NgoEditInputType>;
};


export type MutationProjectAddArgs = {
  data: ProjectAddInputType;
};


export type MutationProjectEditArgs = {
  data: ProjectEditInputType;
};


export type MutationProjectPurchaseAddArgs = {
  data: ProjectPurchaseAddInputData;
};


export type MutationProjectTransactionAddArgs = {
  data: ProjectTransactionAddInputType;
};


export type MutationProjectTransactionEditArgs = {
  data: ProjectTransactionEditInputType;
};


export type MutationRateAddArgs = {
  data: RateInputType;
};


export type MutationRefreshTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationReportAddArgs = {
  data: ReportInputType;
};


export type MutationSettingEditArgs = {
  data?: InputMaybe<SettingEditInputType>;
};


export type MutationTourAddArgs = {
  data: TourAddInputType;
};


export type MutationTourEditArgs = {
  data: TourEditInputType;
};


export type MutationTourPurchaseAddArgs = {
  data: TourPurchaseAddInputData;
};


export type MutationTourTransactionAddArgs = {
  data: TourTransactionAddInputType;
};


export type MutationTourTransactionEditArgs = {
  data: TourTransactionEditInputType;
};


export type MutationUserEditArgs = {
  data?: InputMaybe<UserEditInputType>;
};


export type MutationUserGetTokenArgs = {
  code: Scalars['Int']['input'];
  phoneNumber: Scalars['String']['input'];
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationWalletWithdrawArgs = {
  data: WalletWithdrawInputType;
};

/** Input type for editing an NGO. */
export type NgoEditInputType = {
  /** Address of the NGO. */
  address: Scalars['String']['input'];
  /** Base64-encoded image. */
  base64Image?: InputMaybe<Scalars['String']['input']>;
  /** contact number of the NGO. */
  contactNumber?: InputMaybe<Scalars['String']['input']>;
  /** Description of the NGO. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Email address of the NGO. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Type of the NGO. */
  kind?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the NGO. */
  phoneNumber: Scalars['String']['input'];
  /** Title of the NGO. */
  title: Scalars['String']['input'];
};

/** Type representing an image with different sizes for an NGO. */
export type NgoImageType = {
  __typename?: 'NGOImageType';
  /** URL of the large image. */
  large?: Maybe<Scalars['String']['output']>;
  /** URL of the medium image. */
  medium?: Maybe<Scalars['String']['output']>;
  /** URL of the small image. */
  small?: Maybe<Scalars['String']['output']>;
};

/** Input type for NGO (Non-Governmental Organization) information. */
export type NgoInputType = {
  /** Address of the NGO. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Description of the NGO. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Latitude coordinate of the NGO location. */
  lat?: InputMaybe<Scalars['Float']['input']>;
  /** Longitude coordinate of the NGO location. */
  lng?: InputMaybe<Scalars['Float']['input']>;
  /** Phone number of the NGO. */
  phoneNumber: Scalars['String']['input'];
  /** Title of the NGO. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Type representing a page of NGOQueryType objects. */
export type NgoListType = {
  __typename?: 'NGOListType';
  /** Total count of NGO. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of NGO data. */
  data?: Maybe<Array<Maybe<NgoQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing an NGO with additional fields. */
export type NgoQueryType = {
  __typename?: 'NGOQueryType';
  address?: Maybe<Scalars['String']['output']>;
  /** NGO avatar image. */
  avatarS3?: Maybe<NgoImageType>;
  /** NGO banner image. */
  bannerS3?: Maybe<NgoImageType>;
  contactNumber?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isVerify?: Maybe<Scalars['Boolean']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  /** List of projects associated with the NGO. */
  projectSet?: Maybe<Array<Maybe<ProjectQueryType>>>;
  /** List of transactions associated with the project. */
  projectTransactionSet?: Maybe<Array<Maybe<ProjectTransactionQueryType>>>;
  title: Scalars['String']['output'];
  /** List of tours associated with the NGO. */
  tourSet?: Maybe<Array<Maybe<TourQueryType>>>;
  /** List of tour transactions associated with the NGO. */
  tourTransactionSet?: Maybe<Array<Maybe<TourTransactionQueryType>>>;
  user?: Maybe<UserQueryType>;
  /** Wallet field related to the NGO */
  wallet?: Maybe<UserWalletType>;
};

/**
 * Represents an input object for specifying pagination parameters.
 *
 * Attributes:
 *     page_size (graphene.Int): The number of items per page.
 *     page_number (graphene.Int): The page number.
 */
export type PageType = {
  /** The page number. */
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  /** The number of items per page. */
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Input type for adding a new project. */
export type ProjectAddInputType = {
  /** Address of the Project. */
  accommodation: AccommodationAddInputType;
  /** Details regarding the project capacity. */
  capacity: ProjectCapacityAddType;
  /** List of project categories id. */
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** End date of the project. */
  dateEnd: Scalars['String']['input'];
  /** Start date of the project. */
  dateStart: Scalars['String']['input'];
  /** Description of the project. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Discount applied to the project. */
  discount?: InputMaybe<Scalars['Int']['input']>;
  /** List of associated facility names for the project. */
  facilities: Array<InputMaybe<Scalars['String']['input']>>;
  /** Name of the project. */
  name: Scalars['String']['input'];
  /** Price of the project. */
  price: Scalars['Int']['input'];
};

/** Input type for adding a tour capacity for the project. */
export type ProjectCapacityAddType = {
  /** Number representing the capacity information. */
  capacityNumber: Scalars['Int']['input'];
  /** Boolean indicating if children are accepted for the tour. */
  childAccept?: InputMaybe<Scalars['Boolean']['input']>;
  /** Gender for the tour capacity. */
  gender: ProjectGenderEnum;
};

export enum ProjectCategoryEnum {
  Apartment = 'Apartment',
  Beachfront = 'Beachfront',
  Hussainiyah = 'Hussainiyah',
  Moukeb = 'Moukeb',
  Room = 'Room'
}

export enum ProjectCreatorEnum {
  Me = 'ME',
  Others = 'OTHERS'
}

/** Input type for editing an existing project. */
export type ProjectEditInputType = {
  /** New capacity information. */
  capacity?: InputMaybe<CapacityType>;
  /** New name of the project. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** ID of the project to edit. */
  pk: Scalars['ID']['input'];
  /** New status of the project. */
  status?: InputMaybe<ProjectStatusEnum>;
};

/** Type representing a page of ProjectFacilityQueryType objects. */
export type ProjectFacilityListType = {
  __typename?: 'ProjectFacilityListType';
  /** Total count of project facilities. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of project facilities data. */
  data?: Maybe<Array<Maybe<ProjectFacilityQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing a Project Facility model. */
export type ProjectFacilityQueryType = {
  __typename?: 'ProjectFacilityQueryType';
  arName?: Maybe<Scalars['String']['output']>;
  enName?: Maybe<Scalars['String']['output']>;
  faName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  projectSet: Array<ProjectQueryType>;
};

/** Input type for filtering projects. */
export type ProjectFilterType = {
  /** Filter by number of capacity. */
  capacity?: InputMaybe<CapacityType>;
  /** Filter by project categories. */
  categories?: InputMaybe<Array<InputMaybe<ProjectCategoryEnum>>>;
  /** Filter by project creator. */
  creator?: InputMaybe<Array<InputMaybe<ProjectCreatorEnum>>>;
  /** Date range. */
  dateRange?: InputMaybe<DateRangeType>;
  /** Filter by project gender. */
  gender?: InputMaybe<Array<InputMaybe<ProjectGenderEnum>>>;
  /** filter by max and min lat lng. */
  geoLimit?: InputMaybe<BBoxRangeType>;
  /** Filter project by provice and city. */
  location?: InputMaybe<LocationType>;
  /** Price range. */
  price?: InputMaybe<IntRangeType>;
  /** Filter by project status. */
  status?: InputMaybe<Array<InputMaybe<ProjectStatusEnum>>>;
  /** Filter by project tags. */
  tags?: InputMaybe<Array<InputMaybe<ProjectTagEnum>>>;
};

export enum ProjectGenderEnum {
  Both = 'BOTH',
  Child = 'CHILD',
  Female = 'FEMALE',
  Male = 'MALE'
}

/** Type representing Project Guest information. */
export type ProjectGuestQueryType = {
  __typename?: 'ProjectGuestQueryType';
  /** Boolean indicating if children are accepted for the tour. */
  childAccept?: Maybe<Scalars['Boolean']['output']>;
  /** Gender of the guests in a transaction. */
  gender?: Maybe<Scalars['String']['output']>;
  /** Number of the guests */
  guestNumber?: Maybe<Scalars['Int']['output']>;
};

/** Type representing a page of ProjectQueryType objects. */
export type ProjectListType = {
  __typename?: 'ProjectListType';
  /** Total number of projects. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of projects on the page. */
  data?: Maybe<Array<Maybe<ProjectQueryType>>>;
  /** Total number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Input object type for purchase related to tour transaction. */
export type ProjectPurchaseAddInputData = {
  /** URL for further information or following after purchase procedure */
  appLink: Scalars['String']['input'];
  /** Details related to the purchase */
  description: Scalars['String']['input'];
  /** IP address associated with the user's purchase */
  ip: Scalars['String']['input'];
  /** Price/Amount of the purchase in TOMAN currency. */
  price: Scalars['String']['input'];
  /** ID of the project transaction associated with the purchase */
  projectTransactionId: Scalars['ID']['input'];
};

/** Type representing a Project model with additional fields. */
export type ProjectQueryType = {
  __typename?: 'ProjectQueryType';
  /** Associated accommodation information. */
  accommodation?: Maybe<AccommodationQueryType>;
  /** Capacity information associated with the project. */
  capacity?: Maybe<CapacityQueryType>;
  /** Reserved capacity information associated with the project. */
  capacityReserved?: Maybe<CapacityReserveType>;
  /** List of categories associated with the project. */
  categories?: Maybe<Array<Maybe<CategoryQueryType>>>;
  /** List of comments associated with the project. */
  commentSet?: Maybe<Array<Maybe<CommentType>>>;
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<UserQueryType>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Int']['output']>;
  /** List of facilities associated with the project. */
  facilities?: Maybe<Array<Maybe<ProjectFacilityQueryType>>>;
  /** Free capacity information associated with the project. */
  freeCapacity?: Maybe<CapacityReserveType>;
  gender?: Maybe<AccommodationProjectGenderChoices>;
  id: Scalars['ID']['output'];
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  /** The rate of project have minimom and maximom and average rate */
  rate?: Maybe<RateType>;
  requestFrom?: Maybe<AccommodationProjectRequestFromChoices>;
  /** Status activation information associated with the project. */
  statusActivation?: Maybe<Scalars['Boolean']['output']>;
  /** Status step information associated with the project. */
  statusStep?: Maybe<ProjectStatusEnum>;
  tags: Array<TagQueryType>;
  tax?: Maybe<Scalars['Int']['output']>;
  /** List of transactions associated with the project. */
  transactionSet?: Maybe<Array<Maybe<ProjectTransactionQueryType>>>;
};

export enum ProjectStatusEnum {
  Accept = 'ACCEPT',
  End = 'END',
  Request = 'REQUEST'
}

export enum ProjectTagEnum {
  Discount = 'DISCOUNT',
  Economy = 'ECONOMY',
  Free = 'FREE',
  Luxe = 'LUXE',
  New = 'NEW',
  Trend = 'TREND'
}

/** Input type for adding a new project transaction. */
export type ProjectTransactionAddInputType = {
  /** End date of the transaction. */
  dateEnd: Scalars['String']['input'];
  /** Start date of the transaction. */
  dateStart: Scalars['String']['input'];
  /** Description of the transaction. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** List of guest information. */
  guests: ProjectTransactionGuestInputType;
  /** ID of the associated project. */
  projectId: Scalars['ID']['input'];
};

/** Input type for editing a project transaction. */
export type ProjectTransactionEditInputType = {
  /** End date of the transaction. */
  dateEnd?: InputMaybe<Scalars['String']['input']>;
  /** Start date of the transaction. */
  dateStart?: InputMaybe<Scalars['String']['input']>;
  /** Description of the transaction. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** List of guest information. */
  guests?: InputMaybe<ProjectTransactionGuestInputType>;
  /** Reference ID of the transaction purchase. */
  purchaseRefId?: InputMaybe<Scalars['Int']['input']>;
  /** Updated status information. */
  status?: InputMaybe<StatusInputType>;
  /** ID of the transaction to edit. */
  transactionId: Scalars['ID']['input'];
};

/** Input type for filtering project transactions by status step. */
export type ProjectTransactionFilterType = {
  /** Filter by transaction status step. */
  statusStep?: InputMaybe<TransactionStatusEnum>;
};

export type ProjectTransactionGuestInputType = {
  /** Boolean indicating if children are accepted for the tour. */
  childAccept?: InputMaybe<Scalars['Boolean']['input']>;
  /** Gender of the guests in a transaction. */
  gender: TransactionGuestGenderEnum;
  /** Number of the guests */
  guestNumber: Scalars['Int']['input'];
};

/** Type representing a page of ProjectTransactionQueryType objects. */
export type ProjectTransactionListType = {
  __typename?: 'ProjectTransactionListType';
  /** Total count of project transaction. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of project transaction data. */
  data?: Maybe<Array<Maybe<ProjectTransactionQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing a Project Transaction model with additional fields. */
export type ProjectTransactionQueryType = {
  __typename?: 'ProjectTransactionQueryType';
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Project guests information associated with the transaction. */
  guest?: Maybe<ProjectGuestQueryType>;
  id: Scalars['ID']['output'];
  invoiceNumber?: Maybe<Scalars['UUID']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  owner?: Maybe<UserQueryType>;
  project?: Maybe<ProjectQueryType>;
  purchaseRefId?: Maybe<Scalars['Int']['output']>;
  /** Transaction status information. */
  status?: Maybe<StatusQueryType>;
};

export type Query = {
  __typename?: 'Query';
  NGODetail?: Maybe<NgoQueryType>;
  NGOList?: Maybe<NgoListType>;
  accommodationDetail?: Maybe<AccommodationQueryType>;
  accommodationList?: Maybe<AccommodationListType>;
  bankCardDetail?: Maybe<BackCardQueryType>;
  bankCardList?: Maybe<BankCardListType>;
  bannerDetail?: Maybe<BannerQueryType>;
  bannerList?: Maybe<BannerListType>;
  categoryList?: Maybe<CategoryListType>;
  projectDetail?: Maybe<ProjectQueryType>;
  projectFacilityList?: Maybe<ProjectFacilityListType>;
  projectList?: Maybe<ProjectListType>;
  projectTransactionDetail?: Maybe<ProjectTransactionQueryType>;
  projectTransactionList?: Maybe<ProjectTransactionListType>;
  reportCategoryList?: Maybe<ReportCategoryListType>;
  settingDetail?: Maybe<SettingDetailType>;
  tagList?: Maybe<TagListType>;
  tourDetail?: Maybe<TourQueryType>;
  tourFacilityList?: Maybe<TourFacilityListType>;
  tourList?: Maybe<TourListType>;
  tourTransactionDetail?: Maybe<TourTransactionQueryType>;
  tourTransactionList?: Maybe<TourTransactionListType>;
  userDetail?: Maybe<UserQueryType>;
  userList?: Maybe<UserListType>;
  /** A GraphQL field containing version information. */
  version?: Maybe<VersionType>;
  walletTransactionDetail?: Maybe<WalletTransactionQueryType>;
  walletTransactionList?: Maybe<WalletTransactionListType>;
};


export type QueryNgoDetailArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNgoListArgs = {
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAccommodationDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryAccommodationListArgs = {
  filter?: InputMaybe<AccommodationFilterType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBankCardDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryBankCardListArgs = {
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBannerDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryBannerListArgs = {
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoryListArgs = {
  filter?: InputMaybe<CategoryFilterType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProjectDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryProjectFacilityListArgs = {
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProjectListArgs = {
  filter?: InputMaybe<ProjectFilterType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortType>;
};


export type QueryProjectTransactionDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryProjectTransactionListArgs = {
  filter?: InputMaybe<ProjectTransactionFilterType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReportCategoryListArgs = {
  filter?: InputMaybe<ReportCategoryFilterType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySettingDetailArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTagListArgs = {
  filter?: InputMaybe<TagFilterType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTourDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryTourFacilityListArgs = {
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTourListArgs = {
  filter?: InputMaybe<TourFilterType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortType>;
};


export type QueryTourTransactionDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryTourTransactionListArgs = {
  filter?: InputMaybe<TourTransactionFilterType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserDetailArgs = {
  dimension?: InputMaybe<Scalars['String']['input']>;
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserListArgs = {
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWalletTransactionDetailArgs = {
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWalletTransactionListArgs = {
  filter?: InputMaybe<WalletTransactionFilterInputType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A GraphQL Input Object Type for creating a rating.
 *
 * This input object is used to specify the details of a rating for a specific object type and id,
 * along with the rating value.
 */
export type RateInputType = {
  objectId: Scalars['Int']['input'];
  objectType: RateObjectTypeEnum;
  value: Scalars['Int']['input'];
};

export enum RateObjectTypeEnum {
  Project = 'PROJECT',
  Tour = 'TOUR'
}

/**
 * Represents a rating type for object.
 *
 * Attributes:
 *     min_rate (graphene.String): The minimum rate in a set of ratings.
 *     max_rate (graphene.String): The maximum rate in a set of ratings.
 *     avg_rate (graphene.String): The average rate across a set of ratings.
 */
export type RateType = {
  __typename?: 'RateType';
  avgRate?: Maybe<Scalars['String']['output']>;
  maxRate?: Maybe<Scalars['String']['output']>;
  minRate?: Maybe<Scalars['String']['output']>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

/** Input type for filtering report categories. */
export type ReportCategoryFilterType = {
  /** List of names to filter the report types by. */
  names?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Type representing a page of ReportQueryType objects. */
export type ReportCategoryListType = {
  __typename?: 'ReportCategoryListType';
  /** Total number of projects. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of ReportCategory on the page. */
  data?: Maybe<Array<Maybe<ReportCategoryQueryType>>>;
  /** Total number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Graphene DjangoObjectType for ReportCategory model. */
export type ReportCategoryQueryType = {
  __typename?: 'ReportCategoryQueryType';
  id: Scalars['ID']['output'];
  name: ExtensionReportCategoryNameChoices;
};

/** Input type for creating reports on a objects (comments , project , tour). */
export type ReportInputType = {
  /** Description of the report. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** ID of the object being reported. */
  objectId: Scalars['Int']['input'];
  /** Type of the object being reported. */
  objectType: ReportTypeEnum;
  /** List of IDs of the report types. */
  types: Array<InputMaybe<Scalars['ID']['input']>>;
};

export enum ReportTypeEnum {
  Comment = 'COMMENT',
  Project = 'PROJECT',
  Tour = 'TOUR'
}

/**
 * Represents a basic response object.
 *
 * Attributes:
 *     status (graphene.String): The status of the response.
 *     status_code (graphene.Int): The HTTP status code of the response.
 *     message (graphene.String): A message associated with the response.
 *     metadata (generic.GenericScalar): Additional metadata associated with the response.
 */
export type ResponseBase = {
  __typename?: 'ResponseBase';
  /** A message associated with the response. */
  message?: Maybe<Scalars['String']['output']>;
  /** Additional metadata associated with the response. */
  metadata?: Maybe<Scalars['GenericScalar']['output']>;
  /** The status of the response. */
  status?: Maybe<Scalars['String']['output']>;
  /** The HTTP status code of the response. */
  statusCode?: Maybe<Scalars['Int']['output']>;
};

/**
 * Represents a union of response types for dynamic outputs in mutations.
 *
 * Types:
 *     - ResponseWithToken: A response with authentication tokens.
 *     - ResponseBase: A basic response.
 *
 * Usage:
 *     Use this union for dynamic outputs in mutations.
 */
export type ResponseUnion = ResponseBase | ResponseWithToken;

/**
 * Represents a response object with authentication tokens.
 *
 * Attributes:
 *     status (graphene.String): The status of the response.
 *     status_code (graphene.Int): The HTTP status code of the response.
 *     message (graphene.String): A message associated with the response.
 *     token (graphene.String): An authentication token.
 *     refresh_token (graphene.String): A refresh token.
 *     metadata (generic.GenericScalar): Additional metadata associated with the response.
 */
export type ResponseWithToken = {
  __typename?: 'ResponseWithToken';
  /** A message associated with the response. */
  message?: Maybe<Scalars['String']['output']>;
  /** Additional metadata associated with the response. */
  metadata?: Maybe<Scalars['GenericScalar']['output']>;
  /** A refresh token. */
  refreshToken?: Maybe<Scalars['String']['output']>;
  /** The status of the response. */
  status?: Maybe<Scalars['String']['output']>;
  /** The HTTP status code of the response. */
  statusCode?: Maybe<Scalars['Int']['output']>;
  /** An authentication token. */
  token?: Maybe<Scalars['String']['output']>;
};

/** Type representing the details of user settings. */
export type SettingDetailType = {
  __typename?: 'SettingDetailType';
  language: AccountSettingLanguageChoices;
};

/** Input type for editing user settings. */
export type SettingEditInputType = {
  /** Language preference for the user. */
  language?: InputMaybe<LanguageChoiceEnum>;
};

/**
 * Represents a sorting type for ordering data.
 *
 * Attributes:
 *     descending (graphene.Bool): A flag indicating if the sorting should be in descending order.
 */
export type SortType = {
  /** A flag indicating if the sorting should be in descending order. Default is False */
  descending?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Input type for specifying status information. */
export type StatusInputType = {
  /** Whether the status is active. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Transaction status step. */
  step?: InputMaybe<TransactionStatusEnum>;
};

/** Type representing status information. */
export type StatusQueryType = {
  __typename?: 'StatusQueryType';
  /** Whether the status is active. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** Transaction status step. */
  step?: Maybe<Scalars['String']['output']>;
};

export enum TagFilterEnum {
  Discount = 'DISCOUNT',
  Economy = 'ECONOMY',
  Free = 'FREE',
  Luxe = 'LUXE',
  New = 'NEW',
  Trend = 'TREND'
}

/** Input type for filtering project tags. */
export type TagFilterType = {
  /** Filter project tag by name. */
  tagsName?: InputMaybe<Array<InputMaybe<TagFilterEnum>>>;
};

/** Type representing a page of TagQueryType objects. */
export type TagListType = {
  __typename?: 'TagListType';
  /** Total count of tags. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of tags data. */
  data?: Maybe<Array<Maybe<TagQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing a list of tags with additional fields. */
export type TagQueryType = {
  __typename?: 'TagQueryType';
  /** Display name of the tag. */
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Name of the tag. */
  name?: Maybe<Scalars['String']['output']>;
  projectSet: Array<ProjectQueryType>;
};

/** Input type for adding a new tour. */
export type TourAddInputType = {
  /** List of base64-encoded images associated with the tour. */
  base64Images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Details regarding the tour capacity. */
  capacity: TourCapacityAddType;
  /** Description of the tour. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Details of the destination for the tour. */
  destination: AccommodationAddInputType;
  /** Discount applied to the tour. */
  discount?: InputMaybe<Scalars['Int']['input']>;
  /** End date and time of the tour. */
  endTime: Scalars['String']['input'];
  /** List of associated facility names for the tour. */
  facilities: Array<InputMaybe<Scalars['String']['input']>>;
  /** Details of the origin for the tour. */
  origin: AccommodationAddInputType;
  /** Price of the tour. */
  price: Scalars['Int']['input'];
  /** Start date and time of the tour. */
  startTime: Scalars['String']['input'];
  /** Title of the tour. */
  title: Scalars['String']['input'];
};

/** Input type for adding a tour capacity for the tour. */
export type TourCapacityAddType = {
  /** Number representing the capacity information. */
  capacityNumber: Scalars['Int']['input'];
  /** Boolean indicating if children are accepted for the tour. */
  childAccept?: InputMaybe<Scalars['Boolean']['input']>;
  /** Gender for the tour capacity. */
  gender: TourGenderEnum;
};

/** Type representing tour capacity with additional fields. */
export type TourCapacityType = {
  __typename?: 'TourCapacityType';
  both: Scalars['Int']['output'];
  child: Scalars['Boolean']['output'];
  female: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  male: Scalars['Int']['output'];
};

/**
 * Represents a union of response types for dynamic outputs in query.
 *
 * Types:
 *     - AccommodationQueryType: Accommodation Query Type.
 *     - ProjectQueryType: Project Query type.
 *
 * Usage:
 *     Use this union for dynamic outputs in query.
 */
export type TourDestOrigUnion = AccommodationQueryType | ProjectQueryType;

/** Input type for editing the tour. */
export type TourEditInputType = {
  /** List of New base64-encoded images associated with the tour. */
  base64Images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** New Details regarding the tour capacity. */
  capacity: TourCapacityAddType;
  /** New Description of the tour. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** New Details of the destination for the tour. */
  destination: AccommodationAddInputType;
  /** New Discount applied to the tour. */
  discount: Scalars['Int']['input'];
  /** New End date and time of the tour. */
  endTime: Scalars['String']['input'];
  /** List of New associated facility names for the tour. */
  facilities: Array<InputMaybe<Scalars['String']['input']>>;
  /** New Details of the origin for the tour. */
  origin: AccommodationAddInputType;
  /** ID of the tour to edit. */
  pk: Scalars['ID']['input'];
  /** New Price of the tour. */
  price: Scalars['Int']['input'];
  /** New Start date and time of the tour. */
  startTime: Scalars['String']['input'];
  /** New status information for the tour. */
  status?: InputMaybe<TourStatusInputType>;
  /** New Title of the tour. */
  title: Scalars['String']['input'];
};

/** Type representing a page of TourFacilityQueryType objects. */
export type TourFacilityListType = {
  __typename?: 'TourFacilityListType';
  /** Total count of tour facilities. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of tour facilities data. */
  data?: Maybe<Array<Maybe<TourFacilityQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing tour facilities with additional fields. */
export type TourFacilityQueryType = {
  __typename?: 'TourFacilityQueryType';
  arName?: Maybe<Scalars['String']['output']>;
  enName?: Maybe<Scalars['String']['output']>;
  faName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

/** Input type for filtering tours by date range and price range. */
export type TourFilterType = {
  /** Filter by number of capacity. */
  capacity?: InputMaybe<CapacityType>;
  /** Filter by date range. */
  dateRange?: InputMaybe<DateRangeType>;
  /** filter by lat lng BBox. */
  destinationGeoLimit?: InputMaybe<BBoxRangeType>;
  /** Filter project by provice and city. */
  destinationLocation?: InputMaybe<LocationType>;
  /** filter by lat lng BBox. */
  originGeoLimit?: InputMaybe<BBoxRangeType>;
  /** Filter project by provice and city. */
  originLocation?: InputMaybe<LocationType>;
  /** Filter by price range. */
  price?: InputMaybe<IntRangeType>;
};

export enum TourGenderEnum {
  Both = 'BOTH',
  Female = 'FEMALE',
  Male = 'MALE'
}

/** Type representing tour guest images in different sizes. */
export type TourGuestImageType = {
  __typename?: 'TourGuestImageType';
  /** URL of the large image. */
  large?: Maybe<Scalars['String']['output']>;
  /** URL of the medium image. */
  medium?: Maybe<Scalars['String']['output']>;
  /** URL of the small image. */
  small?: Maybe<Scalars['String']['output']>;
};

/** Input type for providing guest information in a tour transaction. */
export type TourGuestInputType = {
  /** Birthday of the guest. */
  birthday: Scalars['String']['input'];
  /** Firstname of the guest. */
  firstname: Scalars['String']['input'];
  /** Gender of the guest. */
  gender: GuestGenderEnum;
  /** Identification number of the guest. */
  identifyNumber: Scalars['String']['input'];
  /** Base64-encoded image of the guest's identification. */
  identifyPicture?: InputMaybe<Scalars['String']['input']>;
  /** Lastname of the guest. */
  lastname: Scalars['String']['input'];
  /** Phone number of the guest. */
  phoneNumber: Scalars['String']['input'];
};

/** Type representing a tour guests with additional fields. */
export type TourGuestQueryType = {
  __typename?: 'TourGuestQueryType';
  /** Tour guest images in different sizes. */
  avatarS3?: Maybe<Array<Maybe<TourGuestImageType>>>;
  birthday?: Maybe<Scalars['Date']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  gender: TourTourGuestGenderChoices;
  id: Scalars['ID']['output'];
  identifyNumber?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  transaction?: Maybe<TourTransactionQueryType>;
};

/** Type representing tour images in different sizes. */
export type TourImageType = {
  __typename?: 'TourImageType';
  /** URL of the large image. */
  large?: Maybe<Scalars['String']['output']>;
  /** URL of the medium image. */
  medium?: Maybe<Scalars['String']['output']>;
  /** URL of the small image. */
  small?: Maybe<Scalars['String']['output']>;
};

/** Type representing a page of tour data. */
export type TourListType = {
  __typename?: 'TourListType';
  /** Total count of tours. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of tour data. */
  data?: Maybe<Array<Maybe<TourQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing tour packages with additional fields. */
export type TourPackageType = {
  __typename?: 'TourPackageType';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  title?: Maybe<Scalars['String']['output']>;
  tour?: Maybe<TourQueryType>;
  /** Tour transactions information. */
  transactionSet?: Maybe<Array<Maybe<TourTransactionQueryType>>>;
};

/** Input object type for purchase related to tour transaction. */
export type TourPurchaseAddInputData = {
  /** URL for further information or following after purchase procedure */
  appLink: Scalars['String']['input'];
  /** Details related to the purchase */
  description: Scalars['String']['input'];
  /** IP address associated with the user's purchase */
  ip: Scalars['String']['input'];
  /** Price/Amount of the purchase in TOMAN currency. */
  price: Scalars['String']['input'];
  /** ID of the tour transaction associated with the purchase */
  tourTransactionId: Scalars['ID']['input'];
};

/** Type representing a tour with additional fields. */
export type TourQueryType = {
  __typename?: 'TourQueryType';
  NGO: NgoQueryType;
  /** Tour avatar images in different sizes. */
  avatarS3?: Maybe<Array<Maybe<TourImageType>>>;
  /** Tour capacity information. */
  capacity?: Maybe<TourCapacityType>;
  /** List of comments associated with the tour. */
  commentSet?: Maybe<Array<Maybe<CommentType>>>;
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Tour destination information. */
  destination?: Maybe<TourDestOrigUnion>;
  endTime: Scalars['DateTime']['output'];
  /** List of tour facilities. */
  facilities?: Maybe<Array<Maybe<TourFacilityQueryType>>>;
  id: Scalars['ID']['output'];
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** Tour origin information. */
  origin?: Maybe<TourDestOrigUnion>;
  packages: Array<TourPackageType>;
  /** The rate of project with minimom, maximom and average value */
  rate?: Maybe<RateType>;
  startTime: Scalars['DateTime']['output'];
  statusActivation: Scalars['Boolean']['output'];
  statusStep?: Maybe<TourTourStatusStepChoices>;
  title: Scalars['String']['output'];
};

export enum TourStatusEnum {
  Accept = 'ACCEPT',
  End = 'END',
  Request = 'REQUEST'
}

/** Input type for updating the status of a tour. */
export type TourStatusInputType = {
  /** New active status for the tour. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** New step/status for the tour. */
  step?: InputMaybe<TourStatusEnum>;
};

/** Type representing the status of a tour transaction. */
export type TourStatusQueryType = {
  __typename?: 'TourStatusQueryType';
  /** Indicates if the transaction is active. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** Current step/status of the transaction. */
  step?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
export enum TourTourGuestGenderChoices {
  /** CHILD */
  Child = 'CHILD',
  /** FEMALE */
  Female = 'FEMALE',
  /** MALE */
  Male = 'MALE'
}

/** An enumeration. */
export enum TourTourStatusStepChoices {
  /** ACCEPT */
  Accept = 'ACCEPT',
  /** END */
  End = 'END',
  /** REQUEST */
  Request = 'REQUEST'
}

/** Input type for adding a new tour transaction. */
export type TourTransactionAddInputType = {
  /** Description of the transaction. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** List of guests in the transaction. */
  guests: Array<InputMaybe<TourGuestInputType>>;
  /** ID of the associated tour package. */
  tourPackageId: Scalars['ID']['input'];
};

/** Input type for editing a tour transaction. */
export type TourTransactionEditInputType = {
  /** Description of the transaction. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** List of guests in the transaction. */
  guests?: InputMaybe<Array<InputMaybe<TourGuestInputType>>>;
  /** Reference ID of the transaction purchase. */
  purchaseRefId?: InputMaybe<Scalars['ID']['input']>;
  /** New status information for the transaction. */
  status?: InputMaybe<TourTransactionStatusInputType>;
  /** ID of the transaction to edit. */
  transactionId: Scalars['ID']['input'];
};

/** Input type for filtering tour transactions by status step. */
export type TourTransactionFilterType = {
  /** Filter by status step. */
  statusStep?: InputMaybe<TransactionStatusEnum>;
};

/** Type representing a page of TourTransactionQueryType objects. */
export type TourTransactionListType = {
  __typename?: 'TourTransactionListType';
  /** Total count of tour transaction. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of tour transaction data. */
  data?: Maybe<Array<Maybe<TourTransactionQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing a tour transaction with additional fields. */
export type TourTransactionQueryType = {
  __typename?: 'TourTransactionQueryType';
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoiceNumber?: Maybe<Scalars['UUID']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  owner?: Maybe<UserQueryType>;
  purchaseRefId?: Maybe<Scalars['Int']['output']>;
  /** Status information for the transaction. */
  status?: Maybe<TourStatusQueryType>;
  /** Guest information for the transaction. */
  tourGuests?: Maybe<Array<Maybe<TourGuestQueryType>>>;
  /** Tour Package associated with the transaction. */
  tourPackage?: Maybe<TourPackageType>;
  tourguestSet: Array<TourGuestQueryType>;
};

/** Input type for updating the status of a tour transaction. */
export type TourTransactionStatusInputType = {
  /** New active status for the transaction. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** New step/status for the transaction. */
  step?: InputMaybe<TransactionStatusEnum>;
};

export enum TransactionGuestGenderEnum {
  Both = 'BOTH',
  Child = 'CHILD',
  Female = 'FEMALE',
  Male = 'MALE'
}

/**
 * Represents a union of response types for dynamic outputs in query.
 *
 * Types:
 *     - BackCardQueryType: bank card Query Type.
 *     - WalletQuryType: wallet Query type.
 *
 * Usage:
 *     Use this union for dynamic outputs in query.
 */
export type TransactionSourceUnion = BackCardQueryType | WalletQuryType;

export enum TransactionStatusEnum {
  Accept = 'ACCEPT',
  Payment = 'PAYMENT',
  Request = 'REQUEST',
  Successful = 'SUCCESSFUL'
}

export enum TripleChoiceEnum {
  False = 'FALSE',
  None = 'NONE',
  True = 'TRUE'
}

/** Input type for editing user information. */
export type UserEditInputType = {
  /** Base64-encoded image. */
  base64Image?: InputMaybe<Scalars['String']['input']>;
  /** User's biography. */
  bio?: InputMaybe<Scalars['String']['input']>;
  /** Display name of the user. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** First name of the user. */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Last name of the user. */
  lastname?: InputMaybe<Scalars['String']['input']>;
};

/** Type representing user avatar images in different sizes. */
export type UserImageType = {
  __typename?: 'UserImageType';
  /** URL of the large image. */
  large?: Maybe<Scalars['String']['output']>;
  /** URL of the medium image. */
  medium?: Maybe<Scalars['String']['output']>;
  /** URL of the small image. */
  small?: Maybe<Scalars['String']['output']>;
};

/** Input type for user information. */
export type UserInputType = {
  /** User's biography. */
  bio?: InputMaybe<Scalars['String']['input']>;
  /** First name of the user. */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** Last name of the user. */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the user. */
  phoneNumber: Scalars['String']['input'];
};

/** Type representing a page of UserQueryType objects. */
export type UserListType = {
  __typename?: 'UserListType';
  /** Total count of user. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of user data. */
  data?: Maybe<Array<Maybe<UserQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing a list of users with additional fields. */
export type UserQueryType = {
  __typename?: 'UserQueryType';
  accommodationSet: Array<AccommodationQueryType>;
  /** User avatar image in different sizes. */
  avatarS3?: Maybe<UserImageType>;
  bio?: Maybe<Scalars['String']['output']>;
  commentSet: Array<CommentType>;
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  /** User fullname. */
  fullname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isNgo?: Maybe<Scalars['Boolean']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  ngo?: Maybe<NgoQueryType>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** List of projects associated with the User. */
  projectSet?: Maybe<Array<Maybe<ProjectQueryType>>>;
  /** List of transactions associated with the project. */
  projectTransactionSet?: Maybe<Array<Maybe<ProjectTransactionQueryType>>>;
  setting?: Maybe<SettingDetailType>;
  smsActivationCode?: Maybe<Scalars['Int']['output']>;
  tourtransactionSet: Array<TourTransactionQueryType>;
  transactionSet: Array<ProjectTransactionQueryType>;
  /** الزامی. 150 کاراکتر یا کمتر. فقط شامل حروف، اعداد، و علامات @/./+/-/_ */
  username: Scalars['String']['output'];
  /** Wallet field related to the User */
  wallet?: Maybe<UserWalletType>;
};

/** DjangoObjectType representing a user's wallet. */
export type UserWalletType = {
  __typename?: 'UserWalletType';
  balance: Scalars['Float']['output'];
  createdTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  modifiedTime: Scalars['DateTime']['output'];
  walletCards: Array<BackCardQueryType>;
  walletTransactions: Array<WalletTransactionQueryType>;
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar']['output'];
};

/**
 * Represents a union type for dynamic outputs in mutations.
 * This union type can hold either BackendVersion or FrontendVersion objects.
 */
export type VersionType = BackendVersion | FrontendVersion;

export enum WalletActionTransactionEnum {
  Deposit = 'DEPOSIT',
  InAppPurchase = 'IN_APP_PURCHASE',
  Withdraw = 'WITHDRAW'
}

/** GraphQL type representing a user's wallet. */
export type WalletQuryType = {
  __typename?: 'WalletQuryType';
  balance: Scalars['Float']['output'];
  createdTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  modifiedTime: Scalars['DateTime']['output'];
  user: UserQueryType;
  walletCards: Array<BackCardQueryType>;
  walletTransactions: Array<WalletTransactionQueryType>;
};

export enum WalletStatusTransactionEnum {
  Payment = 'PAYMENT',
  Request = 'REQUEST',
  Successful = 'SUCCESSFUL'
}

/** Input object type for status wallet transaction. */
export type WalletTransactioStatusInputType = {
  /** active status for the wallet transaction. */
  statusActivation: Scalars['Boolean']['input'];
  /** step/status for the wallet transaction. */
  statusStep: WalletStatusTransactionEnum;
};

/** Input object type for deposit the user wallet. */
export type WalletTransactionEditInputType = {
  /** The Primary Account Number (PAN) of the card. */
  cardPan: Scalars['String']['input'];
  /** ID of wallet transaction */
  id: Scalars['ID']['input'];
  /** Reference ID of the wallet transaction purchase. */
  purchaseRefId?: InputMaybe<Scalars['ID']['input']>;
  /** status for the wallet transaction. */
  status: WalletTransactioStatusInputType;
};

/** Input type for updating the status of a tour transaction. */
export type WalletTransactionFilterInputType = {
  /** action for the wallet transaction. */
  action?: InputMaybe<WalletActionTransactionEnum>;
  /** active status for the wallet transaction. */
  statusActivation?: InputMaybe<Scalars['Boolean']['input']>;
  /** step/status for the wallet transaction. */
  statusStep?: InputMaybe<WalletStatusTransactionEnum>;
};

/** GraphQL type representing a list of wallet transactions. */
export type WalletTransactionListType = {
  __typename?: 'WalletTransactionListType';
  /** Total count of wallet transactions. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of wallet transactions. */
  data?: Maybe<Array<Maybe<WalletTransactionQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** GraphQL type representing a wallet transaction. */
export type WalletTransactionQueryType = {
  __typename?: 'WalletTransactionQueryType';
  action: WalletWalletTransactionActionChoices;
  amount: Scalars['Float']['output'];
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoiceNumber: Scalars['String']['output'];
  modifiedTime?: Maybe<Scalars['DateTime']['output']>;
  purchaseRefId?: Maybe<Scalars['Int']['output']>;
  /** The source of the transaction. */
  reference?: Maybe<TransactionSourceUnion>;
  /** The source of the transaction. */
  source?: Maybe<TransactionSourceUnion>;
  statusActivation: Scalars['Boolean']['output'];
  statusStep?: Maybe<WalletWalletTransactionStatusStepChoices>;
  wallet: UserWalletType;
};

/** An enumeration. */
export enum WalletWalletTransactionActionChoices {
  /** DEPOSIT */
  Deposit = 'DEPOSIT',
  /** IN_APP_PURCHASE */
  InAppPurchase = 'IN_APP_PURCHASE',
  /** WITHDRAW */
  Withdraw = 'WITHDRAW'
}

/** An enumeration. */
export enum WalletWalletTransactionStatusStepChoices {
  /** PAYMENT */
  Payment = 'PAYMENT',
  /** REQUEST */
  Request = 'REQUEST',
  /** SUCCESSFUL */
  Successful = 'SUCCESSFUL'
}

/** Input type for the  WalletWithdraw mutation. */
export type WalletWithdrawInputType = {
  /** The amount to be withdrawn from the wallet. */
  amount: Scalars['Float']['input'];
  /** The ID of the bank card to which the withdrawal is associated. */
  bankCardId: Scalars['ID']['input'];
};

export type BankCardAddMutationVariables = Exact<{
  data: AddCardType;
}>;


export type BankCardAddMutation = { __typename?: 'Mutation', bankCardAdd?: { __typename?: 'ResponseBase', message?: string | null, metadata?: any | null, status?: string | null, statusCode?: number | null } | null };

export type DepositWalletMutationVariables = Exact<{
  data: DepositWalletInputType;
}>;


export type DepositWalletMutation = { __typename?: 'Mutation', depositWallet?: { __typename?: 'ResponseBase', message?: string | null, status?: string | null, statusCode?: number | null, metadata?: any | null } | null };

export type CreateLoginMutationVariables = Exact<{
  dataUser?: InputMaybe<UserInputType>;
  dataNgo?: InputMaybe<NgoInputType>;
}>;


export type CreateLoginMutation = { __typename?: 'Mutation', createLogin?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type NgoEditMutationVariables = Exact<{
  data?: InputMaybe<NgoEditInputType>;
}>;


export type NgoEditMutation = { __typename?: 'Mutation', ngoEdit?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type ProjectAddMutationVariables = Exact<{
  data: ProjectAddInputType;
}>;


export type ProjectAddMutation = { __typename?: 'Mutation', projectAdd?: { __typename?: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type ProjectTransactionAddMutationVariables = Exact<{
  data: ProjectTransactionAddInputType;
}>;


export type ProjectTransactionAddMutation = { __typename?: 'Mutation', projectTransactionAdd?: { __typename?: 'ResponseBase', message?: string | null, status?: string | null, metadata?: any | null, statusCode?: number | null } | null };

export type ProjectTransactionEditMutationVariables = Exact<{
  data: ProjectTransactionEditInputType;
}>;


export type ProjectTransactionEditMutation = { __typename?: 'Mutation', projectTransactionEdit?: { __typename: 'ResponseBase', message?: string | null, status?: string | null, statusCode?: number | null } | null };

export type ProjectPurchaseAddMutationVariables = Exact<{
  data: ProjectPurchaseAddInputData;
}>;


export type ProjectPurchaseAddMutation = { __typename?: 'Mutation', projectPurchaseAdd?: { __typename?: 'ResponseBase', message?: string | null, metadata?: any | null, status?: string | null, statusCode?: number | null } | null };

export type ReportAddMutationVariables = Exact<{
  data: ReportInputType;
}>;


export type ReportAddMutation = { __typename?: 'Mutation', reportAdd?: { __typename?: 'ResponseBase', message?: string | null, metadata?: any | null, status?: string | null, statusCode?: number | null } | null };

export type SettingEditMutationVariables = Exact<{
  data?: InputMaybe<SettingEditInputType>;
}>;


export type SettingEditMutation = { __typename?: 'Mutation', settingEdit?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type TourAddMutationVariables = Exact<{
  data: TourAddInputType;
}>;


export type TourAddMutation = { __typename?: 'Mutation', tourAdd?: { __typename?: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type TourTransactionAddMutationVariables = Exact<{
  data: TourTransactionAddInputType;
}>;


export type TourTransactionAddMutation = { __typename?: 'Mutation', tourTransactionAdd?: { __typename?: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type TourPurchaseAddMutationVariables = Exact<{
  data: TourPurchaseAddInputData;
}>;


export type TourPurchaseAddMutation = { __typename?: 'Mutation', tourPurchaseAdd?: { __typename?: 'ResponseBase', message?: string | null, metadata?: any | null, status?: string | null, statusCode?: number | null } | null };

export type TourTransactionEditMutationVariables = Exact<{
  data: TourTransactionEditInputType;
}>;


export type TourTransactionEditMutation = { __typename?: 'Mutation', tourTransactionEdit?: { __typename: 'ResponseBase', message?: string | null, metadata?: any | null, status?: string | null, statusCode?: number | null } | null };

export type UserGetTokenMutationVariables = Exact<{
  code: Scalars['Int']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type UserGetTokenMutation = { __typename?: 'Mutation', userGetToken?: { __typename: 'ResponseBase', message?: string | null, metadata?: any | null, status?: string | null, statusCode?: number | null } | { __typename: 'ResponseWithToken', message?: string | null, metadata?: any | null, status?: string | null, statusCode?: number | null, token?: string | null, refreshToken?: string | null } | null };

export type UserEditMutationVariables = Exact<{
  data?: InputMaybe<UserEditInputType>;
}>;


export type UserEditMutation = { __typename?: 'Mutation', userEdit?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type BannerListQueryVariables = Exact<{
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type BannerListQuery = { __typename?: 'Query', bannerList?: { __typename?: 'BannerListType', pageCount?: number | null, count?: number | null, data?: Array<{ __typename?: 'BannerQueryType', id: string, url?: string | null, title: string, avatarS3?: { __typename?: 'BannerImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null> | null } | null };

export type CategoryListQueryVariables = Exact<{
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type CategoryListQuery = { __typename?: 'Query', categoryList?: { __typename?: 'CategoryListType', pageCount?: number | null, count?: number | null, data?: Array<{ __typename?: 'CategoryQueryType', id: string, name?: string | null, displayName?: string | null, avatarS3?: { __typename?: 'CategoryImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null> | null } | null };

export type MyNgoDetailProjectSetQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNgoDetailProjectSetQuery = { __typename?: 'Query', NGODetail?: { __typename?: 'NGOQueryType', id: string, projectSet?: Array<{ __typename: 'ProjectQueryType', id: string, name?: string | null, description?: string | null, modifiedDate?: any | null, dateStart?: any | null, dateEnd?: any | null, gender?: AccommodationProjectGenderChoices | null, requestFrom?: AccommodationProjectRequestFromChoices | null, price?: number | null, discount?: number | null, tax?: number | null, statusStep?: ProjectStatusEnum | null, statusActivation?: boolean | null, createdDate?: any | null, creator?: { __typename?: 'UserQueryType', id: string } | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, province?: string | null, city?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string } | null> | null, tags: Array<{ __typename?: 'TagQueryType', id: string }>, categories?: Array<{ __typename?: 'CategoryQueryType', id: string } | null> | null, capacity?: { __typename?: 'CapacityQueryType', id: string } | null, transactionSet?: Array<{ __typename?: 'ProjectTransactionQueryType', id: string } | null> | null, capacityReserved?: { __typename?: 'CapacityReserveType', male?: number | null, female?: number | null, allCap?: number | null } | null, freeCapacity?: { __typename?: 'CapacityReserveType', male?: number | null, female?: number | null, allCap?: number | null } | null } | null> | null } | null };

export type MyNgoDetailProjectTransactionSetQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNgoDetailProjectTransactionSetQuery = { __typename?: 'Query', NGODetail?: { __typename?: 'NGOQueryType', id: string, projectTransactionSet?: Array<{ __typename?: 'ProjectTransactionQueryType', dateEnd?: any | null, dateStart?: any | null, id: string, owner?: { __typename?: 'UserQueryType', phoneNumber?: string | null, fullname?: string | null, id: string, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null, guest?: { __typename?: 'ProjectGuestQueryType', guestNumber?: number | null, gender?: string | null, childAccept?: boolean | null } | null, project?: { __typename?: 'ProjectQueryType', name?: string | null, id: string } | null, status?: { __typename?: 'StatusQueryType', isActive?: boolean | null, step?: string | null } | null } | null> | null } | null };

export type MyNgoDetailTourSetQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNgoDetailTourSetQuery = { __typename?: 'Query', NGODetail?: { __typename?: 'NGOQueryType', id: string, tourSet?: Array<{ __typename?: 'TourQueryType', id: string, title: string, description?: string | null, startTime: any, endTime: any, statusStep?: TourTourStatusStepChoices | null, statusActivation: boolean, createdDate?: any | null, modifiedDate?: any | null, origin?: { __typename?: 'AccommodationQueryType', id: string, province?: string | null, city?: string | null, address?: string | null, lat?: number | null, lng?: number | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | { __typename?: 'ProjectQueryType', id: string } | null, destination?: { __typename: 'AccommodationQueryType', id: string, province?: string | null, city?: string | null, address?: string | null, lat?: number | null, lng?: number | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | { __typename: 'ProjectQueryType', id: string } | null, avatarS3?: Array<{ __typename?: 'TourImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null, packages: Array<{ __typename?: 'TourPackageType', id: string, title?: string | null, price: number }>, capacity?: { __typename?: 'TourCapacityType', id: string, male: number, female: number, child: boolean } | null, facilities?: Array<{ __typename?: 'TourFacilityQueryType', id: string, faName?: string | null, enName?: string | null, arName?: string | null } | null> | null } | null> | null } | null };

export type MyNgoDetailTourTransactionSetQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNgoDetailTourTransactionSetQuery = { __typename?: 'Query', NGODetail?: { __typename?: 'NGOQueryType', id: string, tourTransactionSet?: Array<{ __typename?: 'TourTransactionQueryType', id: string, status?: { __typename?: 'TourStatusQueryType', isActive?: boolean | null, step?: string | null } | null, owner?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, phoneNumber?: string | null, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null, tourPackage?: { __typename?: 'TourPackageType', tour?: { __typename?: 'TourQueryType', id: string, title: string } | null } | null, tourGuests?: Array<{ __typename?: 'TourGuestQueryType', id: string, firstname?: string | null, lastname?: string | null, phoneNumber?: string | null, avatarS3?: Array<{ __typename?: 'TourGuestImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null> | null } | null> | null } | null };

export type MyNgoDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNgoDetailQuery = { __typename?: 'Query', NGODetail?: { __typename?: 'NGOQueryType', id: string, projectSet?: Array<{ __typename: 'ProjectQueryType', id: string, name?: string | null, description?: string | null, modifiedDate?: any | null, dateStart?: any | null, dateEnd?: any | null, gender?: AccommodationProjectGenderChoices | null, requestFrom?: AccommodationProjectRequestFromChoices | null, price?: number | null, discount?: number | null, tax?: number | null, statusStep?: ProjectStatusEnum | null, statusActivation?: boolean | null, createdDate?: any | null, creator?: { __typename?: 'UserQueryType', id: string } | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, province?: string | null, city?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string } | null> | null, tags: Array<{ __typename?: 'TagQueryType', id: string }>, categories?: Array<{ __typename?: 'CategoryQueryType', id: string } | null> | null, capacity?: { __typename?: 'CapacityQueryType', id: string } | null, transactionSet?: Array<{ __typename?: 'ProjectTransactionQueryType', id: string } | null> | null, capacityReserved?: { __typename?: 'CapacityReserveType', male?: number | null, female?: number | null, allCap?: number | null } | null, freeCapacity?: { __typename?: 'CapacityReserveType', male?: number | null, female?: number | null, allCap?: number | null } | null } | null> | null, tourSet?: Array<{ __typename?: 'TourQueryType', id: string, title: string, description?: string | null, startTime: any, endTime: any, statusStep?: TourTourStatusStepChoices | null, statusActivation: boolean, createdDate?: any | null, modifiedDate?: any | null, origin?: { __typename?: 'AccommodationQueryType', id: string, province?: string | null, city?: string | null, address?: string | null, lat?: number | null, lng?: number | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | { __typename?: 'ProjectQueryType', id: string } | null, destination?: { __typename: 'AccommodationQueryType', id: string, province?: string | null, city?: string | null, address?: string | null, lat?: number | null, lng?: number | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | { __typename: 'ProjectQueryType', id: string } | null, avatarS3?: Array<{ __typename?: 'TourImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null, packages: Array<{ __typename?: 'TourPackageType', id: string, title?: string | null, price: number }>, capacity?: { __typename?: 'TourCapacityType', id: string, male: number, female: number, child: boolean } | null, facilities?: Array<{ __typename?: 'TourFacilityQueryType', id: string, faName?: string | null, enName?: string | null, arName?: string | null } | null> | null } | null> | null, tourTransactionSet?: Array<{ __typename?: 'TourTransactionQueryType', id: string, status?: { __typename?: 'TourStatusQueryType', isActive?: boolean | null, step?: string | null } | null, owner?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, phoneNumber?: string | null, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null, tourPackage?: { __typename?: 'TourPackageType', tour?: { __typename?: 'TourQueryType', id: string, title: string } | null } | null, tourGuests?: Array<{ __typename?: 'TourGuestQueryType', id: string, firstname?: string | null, lastname?: string | null, phoneNumber?: string | null, avatarS3?: Array<{ __typename?: 'TourGuestImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null> | null } | null> | null, projectTransactionSet?: Array<{ __typename?: 'ProjectTransactionQueryType', dateEnd?: any | null, dateStart?: any | null, id: string, owner?: { __typename?: 'UserQueryType', phoneNumber?: string | null, fullname?: string | null, id: string, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null, guest?: { __typename?: 'ProjectGuestQueryType', guestNumber?: number | null, gender?: string | null, childAccept?: boolean | null } | null, project?: { __typename?: 'ProjectQueryType', name?: string | null, id: string } | null, status?: { __typename?: 'StatusQueryType', isActive?: boolean | null, step?: string | null } | null } | null> | null } | null };

export type MyUserDetailProjectSetQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserDetailProjectSetQuery = { __typename?: 'Query', userDetail?: { __typename?: 'UserQueryType', id: string, projectSet?: Array<{ __typename: 'ProjectQueryType', id: string, name?: string | null, description?: string | null, modifiedDate?: any | null, dateStart?: any | null, dateEnd?: any | null, gender?: AccommodationProjectGenderChoices | null, requestFrom?: AccommodationProjectRequestFromChoices | null, price?: number | null, discount?: number | null, tax?: number | null, statusStep?: ProjectStatusEnum | null, statusActivation?: boolean | null, createdDate?: any | null, creator?: { __typename?: 'UserQueryType', id: string } | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, province?: string | null, city?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string } | null> | null, tags: Array<{ __typename?: 'TagQueryType', id: string }>, categories?: Array<{ __typename?: 'CategoryQueryType', id: string } | null> | null, capacity?: { __typename?: 'CapacityQueryType', id: string } | null, transactionSet?: Array<{ __typename?: 'ProjectTransactionQueryType', id: string } | null> | null, capacityReserved?: { __typename?: 'CapacityReserveType', male?: number | null, female?: number | null, allCap?: number | null } | null, freeCapacity?: { __typename?: 'CapacityReserveType', male?: number | null, female?: number | null, allCap?: number | null } | null } | null> | null } | null };

export type MyUserDetailProjectTransactionSetQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserDetailProjectTransactionSetQuery = { __typename?: 'Query', userDetail?: { __typename?: 'UserQueryType', id: string, projectTransactionSet?: Array<{ __typename?: 'ProjectTransactionQueryType', dateEnd?: any | null, dateStart?: any | null, id: string, owner?: { __typename?: 'UserQueryType', phoneNumber?: string | null, fullname?: string | null, id: string, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null, guest?: { __typename?: 'ProjectGuestQueryType', guestNumber?: number | null, gender?: string | null, childAccept?: boolean | null } | null, project?: { __typename?: 'ProjectQueryType', name?: string | null, id: string } | null, status?: { __typename?: 'StatusQueryType', isActive?: boolean | null, step?: string | null } | null } | null> | null } | null };

export type NgoDetailQueryVariables = Exact<{
  pk?: InputMaybe<Scalars['ID']['input']>;
}>;


export type NgoDetailQuery = { __typename?: 'Query', NGODetail?: { __typename?: 'NGOQueryType', id: string, title: string, address?: string | null, description?: string | null, avatarS3?: { __typename?: 'NGOImageType', large?: string | null, medium?: string | null, small?: string | null } | null, user?: { __typename?: 'UserQueryType', id: string, phoneNumber?: string | null, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null, projectSet?: Array<{ __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, dateStart?: any | null, dateEnd?: any | null, gender?: AccommodationProjectGenderChoices | null, requestFrom?: AccommodationProjectRequestFromChoices | null, tax?: number | null, description?: string | null, statusStep?: ProjectStatusEnum | null, createdDate?: any | null, capacity?: { __typename?: 'CapacityQueryType', id: string, male: number, female: number, child: boolean } | null, categories?: Array<{ __typename?: 'CategoryQueryType', id: string, name?: string | null, displayName?: string | null, avatarS3?: { __typename?: 'CategoryImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null> | null, tags: Array<{ __typename?: 'TagQueryType', id: string, name?: string | null, displayName?: string | null }>, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string, faName?: string | null, enName?: string | null, arName?: string | null } | null> | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null } | null> | null, tourTransactionSet?: Array<{ __typename?: 'TourTransactionQueryType', id: string, status?: { __typename?: 'TourStatusQueryType', isActive?: boolean | null, step?: string | null } | null, owner?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, phoneNumber?: string | null, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null, tourPackage?: { __typename?: 'TourPackageType', tour?: { __typename?: 'TourQueryType', title: string } | null } | null, tourGuests?: Array<{ __typename?: 'TourGuestQueryType', id: string, firstname?: string | null, lastname?: string | null, phoneNumber?: string | null, avatarS3?: Array<{ __typename?: 'TourGuestImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null> | null } | null> | null } | null };

export type ProjectDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type ProjectDetailQuery = { __typename?: 'Query', projectDetail?: { __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, gender?: AccommodationProjectGenderChoices | null, dateEnd?: any | null, dateStart?: any | null, description?: string | null, discount?: number | null, tags: Array<{ __typename?: 'TagQueryType', id: string, name?: string | null }>, capacity?: { __typename?: 'CapacityQueryType', id: string, male: number, child: boolean, both: number, female: number } | null, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string, enName?: string | null, faName?: string | null, arName?: string | null } | null> | null, categories?: Array<{ __typename?: 'CategoryQueryType', name?: string | null, id: string } | null> | null, creator?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, firstname?: string | null, phoneNumber?: string | null, ngo?: { __typename?: 'NGOQueryType', id: string } | null, avatarS3?: { __typename?: 'UserImageType', small?: string | null, medium?: string | null, large?: string | null } | null, projectSet?: Array<{ __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null } | null> | null } | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, lat?: number | null, lng?: number | null, address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null } | null };

export type ProjectListQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortType>;
  filter?: InputMaybe<ProjectFilterType>;
  page: PageType;
}>;


export type ProjectListQuery = { __typename?: 'Query', projectList?: { __typename?: 'ProjectListType', pageCount?: number | null, count?: number | null, data?: Array<{ __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, dateStart?: any | null, dateEnd?: any | null, discount?: number | null, capacity?: { __typename?: 'CapacityQueryType', id: string, male: number, female: number, child: boolean } | null, tags: Array<{ __typename?: 'TagQueryType', id: string, name?: string | null }>, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', small?: string | null } | null> | null } | null } | null> | null } | null };

export type ProjectTransactionDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type ProjectTransactionDetailQuery = { __typename?: 'Query', projectTransactionDetail?: { __typename?: 'ProjectTransactionQueryType', id: string, dateEnd?: any | null, dateStart?: any | null, description?: string | null, modifiedDate?: any | null, invoiceNumber?: any | null, purchaseRefId?: number | null, createdDate?: any | null, owner?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, firstname?: string | null } | null, status?: { __typename?: 'StatusQueryType', step?: string | null, isActive?: boolean | null } | null, guest?: { __typename?: 'ProjectGuestQueryType', guestNumber?: number | null, gender?: string | null, childAccept?: boolean | null } | null, project?: { __typename?: 'ProjectQueryType', id: string, name?: string | null, tax?: number | null, price?: number | null, description?: string | null, creator?: { __typename?: 'UserQueryType', id: string, firstname?: string | null, fullname?: string | null, phoneNumber?: string | null } | null, categories?: Array<{ __typename?: 'CategoryQueryType', name?: string | null } | null> | null, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string, enName?: string | null } | null> | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, lat?: number | null, lng?: number | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', small?: string | null, medium?: string | null, large?: string | null } | null> | null } | null } | null } | null };

export type ProjectTransactionListQueryVariables = Exact<{
  page?: InputMaybe<PageType>;
  filter?: InputMaybe<ProjectTransactionFilterType>;
}>;


export type ProjectTransactionListQuery = { __typename?: 'Query', projectTransactionList?: { __typename?: 'ProjectTransactionListType', count?: number | null, pageCount?: number | null, data?: Array<{ __typename?: 'ProjectTransactionQueryType', id: string, dateEnd?: any | null, dateStart?: any | null, description?: string | null, modifiedDate?: any | null, invoiceNumber?: any | null, createdDate?: any | null, owner?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, firstname?: string | null } | null, status?: { __typename?: 'StatusQueryType', step?: string | null, isActive?: boolean | null } | null, guest?: { __typename?: 'ProjectGuestQueryType', guestNumber?: number | null, gender?: string | null, childAccept?: boolean | null } | null, project?: { __typename?: 'ProjectQueryType', id: string, name?: string | null, tax?: number | null, price?: number | null, description?: string | null, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string, enName?: string | null } | null> | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, lat?: number | null, lng?: number | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', small?: string | null, medium?: string | null, large?: string | null } | null> | null } | null } | null } | null> | null } | null };

export type ReportCategoryListQueryVariables = Exact<{ [key: string]: never; }>;


export type ReportCategoryListQuery = { __typename?: 'Query', reportCategoryList?: { __typename?: 'ReportCategoryListType', data?: Array<{ __typename?: 'ReportCategoryQueryType', name: ExtensionReportCategoryNameChoices, id: string } | null> | null } | null };

export type SettingDetailQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SettingDetailQuery = { __typename?: 'Query', settingDetail?: { __typename?: 'SettingDetailType', language: AccountSettingLanguageChoices } | null };

export type TagListQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<PageType>;
}>;


export type TagListQuery = { __typename?: 'Query', tagList?: { __typename?: 'TagListType', count?: number | null, pageCount?: number | null, data?: Array<{ __typename?: 'TagQueryType', id: string, name?: string | null, displayName?: string | null } | null> | null } | null };

export type TourDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type TourDetailQuery = { __typename?: 'Query', tourDetail?: { __typename?: 'TourQueryType', id: string, title: string, description?: string | null, startTime: any, endTime: any, NGO: { __typename?: 'NGOQueryType', id: string, user?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, phoneNumber?: string | null, avatarS3?: { __typename?: 'UserImageType', small?: string | null } | null, ngo?: { __typename?: 'NGOQueryType', id: string } | null } | null, tourSet?: Array<{ __typename?: 'TourQueryType', id: string, title: string, packages: Array<{ __typename?: 'TourPackageType', id: string, title?: string | null, price: number }>, destination?: { __typename?: 'AccommodationQueryType', address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | { __typename?: 'ProjectQueryType' } | null } | null> | null }, capacity?: { __typename?: 'TourCapacityType', id: string, male: number, female: number, child: boolean } | null, facilities?: Array<{ __typename?: 'TourFacilityQueryType', id: string, enName?: string | null, faName?: string | null, arName?: string | null } | null> | null, destination?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, lat?: number | null, lng?: number | null } | { __typename?: 'ProjectQueryType' } | null, packages: Array<{ __typename?: 'TourPackageType', id: string, title?: string | null, price: number }>, avatarS3?: Array<{ __typename?: 'TourImageType', medium?: string | null, large?: string | null, small?: string | null } | null> | null } | null };

export type TourListQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortType>;
  filter?: InputMaybe<TourFilterType>;
  page: PageType;
}>;


export type TourListQuery = { __typename?: 'Query', tourList?: { __typename?: 'TourListType', count?: number | null, data?: Array<{ __typename?: 'TourQueryType', id: string, title: string, description?: string | null, startTime: any, endTime: any, NGO: { __typename?: 'NGOQueryType', id: string, user?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, phoneNumber?: string | null, avatarS3?: { __typename?: 'UserImageType', small?: string | null } | null } | null, tourSet?: Array<{ __typename?: 'TourQueryType', id: string, title: string, packages: Array<{ __typename?: 'TourPackageType', id: string, title?: string | null, price: number }>, destination?: { __typename?: 'AccommodationQueryType', address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | { __typename?: 'ProjectQueryType' } | null } | null> | null }, capacity?: { __typename?: 'TourCapacityType', id: string, male: number, female: number, child: boolean } | null, facilities?: Array<{ __typename?: 'TourFacilityQueryType', id: string, enName?: string | null, faName?: string | null, arName?: string | null } | null> | null, destination?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, lat?: number | null, lng?: number | null } | { __typename?: 'ProjectQueryType' } | null, packages: Array<{ __typename?: 'TourPackageType', id: string, title?: string | null, price: number }>, avatarS3?: Array<{ __typename?: 'TourImageType', medium?: string | null, large?: string | null, small?: string | null } | null> | null } | null> | null } | null };

export type TourTransactionDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type TourTransactionDetailQuery = { __typename?: 'Query', tourTransactionDetail?: { __typename?: 'TourTransactionQueryType', id: string, createdDate?: any | null, description?: string | null, modifiedDate?: any | null, invoiceNumber?: any | null, purchaseRefId?: number | null, tourGuests?: Array<{ __typename?: 'TourGuestQueryType', id: string } | null> | null, tourguestSet: Array<{ __typename?: 'TourGuestQueryType', id: string, birthday?: any | null, lastname?: string | null, firstname?: string | null, phoneNumber?: string | null, identifyNumber?: string | null, gender: TourTourGuestGenderChoices }>, status?: { __typename?: 'TourStatusQueryType', isActive?: boolean | null, step?: string | null } | null, tourPackage?: { __typename?: 'TourPackageType', title?: string | null, price: number, id: string, tour?: { __typename?: 'TourQueryType', id: string, title: string, endTime: any, startTime: any, avatarS3?: Array<{ __typename?: 'TourImageType', small?: string | null, medium?: string | null } | null> | null, destination?: { __typename?: 'AccommodationQueryType', id: string, lat?: number | null, lng?: number | null, address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', small?: string | null, medium?: string | null, large?: string | null } | null> | null } | { __typename?: 'ProjectQueryType' } | null } | null } | null } | null };

export type TourTransactionListQueryVariables = Exact<{
  page?: InputMaybe<PageType>;
}>;


export type TourTransactionListQuery = { __typename?: 'Query', tourTransactionList?: { __typename?: 'TourTransactionListType', count?: number | null, data?: Array<{ __typename?: 'TourTransactionQueryType', id: string, description?: string | null, invoiceNumber?: any | null, tourguestSet: Array<{ __typename?: 'TourGuestQueryType', id: string }>, status?: { __typename?: 'TourStatusQueryType', isActive?: boolean | null, step?: string | null } | null, tourPackage?: { __typename?: 'TourPackageType', price: number, tour?: { __typename?: 'TourQueryType', id: string, startTime: any, endTime: any, title: string, avatarS3?: Array<{ __typename?: 'TourImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null, destination?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', small?: string | null } | null> | null } | { __typename?: 'ProjectQueryType' } | null } | null } | null } | null> | null } | null };

export type UserDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDetailQuery = { __typename?: 'Query', userDetail?: { __typename?: 'UserQueryType', id: string, username: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, email: string, bio?: string | null, phoneNumber?: string | null, isNgo?: boolean | null, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null, setting?: { __typename?: 'SettingDetailType', language: AccountSettingLanguageChoices } | null, ngo?: { __typename?: 'NGOQueryType', id: string } | null, wallet?: { __typename?: 'UserWalletType', balance: number, createdTime: any, id: string, modifiedTime: any, walletTransactions: Array<{ __typename?: 'WalletTransactionQueryType', action: WalletWalletTransactionActionChoices, purchaseRefId?: number | null, modifiedTime?: any | null, invoiceNumber: string, id: string, description?: string | null, amount: number, statusStep?: WalletWalletTransactionStatusStepChoices | null, source?: { __typename?: 'BackCardQueryType', id: string, title?: string | null, cardPan?: string | null } | { __typename?: 'WalletQuryType', id: string } | null, reference?: { __typename?: 'BackCardQueryType', id: string, cardPan?: string | null, iban?: string | null } | { __typename?: 'WalletQuryType', id: string, balance: number } | null }>, walletCards: Array<{ __typename?: 'BackCardQueryType', id: string, iban?: string | null, title?: string | null, cardPan?: string | null }> } | null } | null };

export type WalletTransactionListQueryVariables = Exact<{ [key: string]: never; }>;


export type WalletTransactionListQuery = { __typename?: 'Query', walletTransactionList?: { __typename?: 'WalletTransactionListType', data?: Array<{ __typename?: 'WalletTransactionQueryType', action: WalletWalletTransactionActionChoices, purchaseRefId?: number | null, modifiedTime?: any | null, invoiceNumber: string, id: string, description?: string | null, amount: number, statusStep?: WalletWalletTransactionStatusStepChoices | null, source?: { __typename?: 'BackCardQueryType', id: string, title?: string | null, cardPan?: string | null } | { __typename?: 'WalletQuryType', id: string } | null, reference?: { __typename?: 'BackCardQueryType', id: string, cardPan?: string | null, iban?: string | null } | { __typename?: 'WalletQuryType', id: string, balance: number } | null } | null> | null } | null };

export type WalletTransactionDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type WalletTransactionDetailQuery = { __typename?: 'Query', walletTransactionDetail?: { __typename?: 'WalletTransactionQueryType', action: WalletWalletTransactionActionChoices, purchaseRefId?: number | null, modifiedTime?: any | null, invoiceNumber: string, id: string, description?: string | null, amount: number, statusStep?: WalletWalletTransactionStatusStepChoices | null, source?: { __typename?: 'BackCardQueryType', id: string, title?: string | null, cardPan?: string | null } | { __typename?: 'WalletQuryType', id: string } | null, reference?: { __typename?: 'BackCardQueryType', id: string, cardPan?: string | null, iban?: string | null } | { __typename?: 'WalletQuryType', id: string, balance: number } | null } | null };


export const BankCardAddDocument = gql`
    mutation bankCardAdd($data: AddCardType!) {
  bankCardAdd(data: $data) {
    message
    metadata
    status
    statusCode
  }
}
    `;
export type BankCardAddMutationFn = Apollo.MutationFunction<BankCardAddMutation, BankCardAddMutationVariables>;

/**
 * __useBankCardAddMutation__
 *
 * To run a mutation, you first call `useBankCardAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBankCardAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bankCardAddMutation, { data, loading, error }] = useBankCardAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBankCardAddMutation(baseOptions?: Apollo.MutationHookOptions<BankCardAddMutation, BankCardAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BankCardAddMutation, BankCardAddMutationVariables>(BankCardAddDocument, options);
      }
export type BankCardAddMutationHookResult = ReturnType<typeof useBankCardAddMutation>;
export type BankCardAddMutationResult = Apollo.MutationResult<BankCardAddMutation>;
export type BankCardAddMutationOptions = Apollo.BaseMutationOptions<BankCardAddMutation, BankCardAddMutationVariables>;
export const DepositWalletDocument = gql`
    mutation depositWallet($data: DepositWalletInputType!) {
  depositWallet(data: $data) {
    message
    status
    statusCode
    metadata
  }
}
    `;
export type DepositWalletMutationFn = Apollo.MutationFunction<DepositWalletMutation, DepositWalletMutationVariables>;

/**
 * __useDepositWalletMutation__
 *
 * To run a mutation, you first call `useDepositWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDepositWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [depositWalletMutation, { data, loading, error }] = useDepositWalletMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDepositWalletMutation(baseOptions?: Apollo.MutationHookOptions<DepositWalletMutation, DepositWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DepositWalletMutation, DepositWalletMutationVariables>(DepositWalletDocument, options);
      }
export type DepositWalletMutationHookResult = ReturnType<typeof useDepositWalletMutation>;
export type DepositWalletMutationResult = Apollo.MutationResult<DepositWalletMutation>;
export type DepositWalletMutationOptions = Apollo.BaseMutationOptions<DepositWalletMutation, DepositWalletMutationVariables>;
export const CreateLoginDocument = gql`
    mutation createLogin($dataUser: UserInputType, $dataNgo: NGOInputType) {
  createLogin(dataUser: $dataUser, dataNgo: $dataNgo) {
    __typename
    status
    statusCode
    message
    metadata
  }
}
    `;
export type CreateLoginMutationFn = Apollo.MutationFunction<CreateLoginMutation, CreateLoginMutationVariables>;

/**
 * __useCreateLoginMutation__
 *
 * To run a mutation, you first call `useCreateLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLoginMutation, { data, loading, error }] = useCreateLoginMutation({
 *   variables: {
 *      dataUser: // value for 'dataUser'
 *      dataNgo: // value for 'dataNgo'
 *   },
 * });
 */
export function useCreateLoginMutation(baseOptions?: Apollo.MutationHookOptions<CreateLoginMutation, CreateLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLoginMutation, CreateLoginMutationVariables>(CreateLoginDocument, options);
      }
export type CreateLoginMutationHookResult = ReturnType<typeof useCreateLoginMutation>;
export type CreateLoginMutationResult = Apollo.MutationResult<CreateLoginMutation>;
export type CreateLoginMutationOptions = Apollo.BaseMutationOptions<CreateLoginMutation, CreateLoginMutationVariables>;
export const NgoEditDocument = gql`
    mutation ngoEdit($data: NGOEditInputType) {
  ngoEdit(data: $data) {
    status
    statusCode
    message
    metadata
    __typename
  }
}
    `;
export type NgoEditMutationFn = Apollo.MutationFunction<NgoEditMutation, NgoEditMutationVariables>;

/**
 * __useNgoEditMutation__
 *
 * To run a mutation, you first call `useNgoEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNgoEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ngoEditMutation, { data, loading, error }] = useNgoEditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNgoEditMutation(baseOptions?: Apollo.MutationHookOptions<NgoEditMutation, NgoEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NgoEditMutation, NgoEditMutationVariables>(NgoEditDocument, options);
      }
export type NgoEditMutationHookResult = ReturnType<typeof useNgoEditMutation>;
export type NgoEditMutationResult = Apollo.MutationResult<NgoEditMutation>;
export type NgoEditMutationOptions = Apollo.BaseMutationOptions<NgoEditMutation, NgoEditMutationVariables>;
export const ProjectAddDocument = gql`
    mutation projectAdd($data: ProjectAddInputType!) {
  projectAdd(data: $data) {
    status
    statusCode
    message
    metadata
  }
}
    `;
export type ProjectAddMutationFn = Apollo.MutationFunction<ProjectAddMutation, ProjectAddMutationVariables>;

/**
 * __useProjectAddMutation__
 *
 * To run a mutation, you first call `useProjectAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectAddMutation, { data, loading, error }] = useProjectAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectAddMutation(baseOptions?: Apollo.MutationHookOptions<ProjectAddMutation, ProjectAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectAddMutation, ProjectAddMutationVariables>(ProjectAddDocument, options);
      }
export type ProjectAddMutationHookResult = ReturnType<typeof useProjectAddMutation>;
export type ProjectAddMutationResult = Apollo.MutationResult<ProjectAddMutation>;
export type ProjectAddMutationOptions = Apollo.BaseMutationOptions<ProjectAddMutation, ProjectAddMutationVariables>;
export const ProjectTransactionAddDocument = gql`
    mutation projectTransactionAdd($data: ProjectTransactionAddInputType!) {
  projectTransactionAdd(data: $data) {
    message
    status
    metadata
    statusCode
  }
}
    `;
export type ProjectTransactionAddMutationFn = Apollo.MutationFunction<ProjectTransactionAddMutation, ProjectTransactionAddMutationVariables>;

/**
 * __useProjectTransactionAddMutation__
 *
 * To run a mutation, you first call `useProjectTransactionAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectTransactionAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectTransactionAddMutation, { data, loading, error }] = useProjectTransactionAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectTransactionAddMutation(baseOptions?: Apollo.MutationHookOptions<ProjectTransactionAddMutation, ProjectTransactionAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectTransactionAddMutation, ProjectTransactionAddMutationVariables>(ProjectTransactionAddDocument, options);
      }
export type ProjectTransactionAddMutationHookResult = ReturnType<typeof useProjectTransactionAddMutation>;
export type ProjectTransactionAddMutationResult = Apollo.MutationResult<ProjectTransactionAddMutation>;
export type ProjectTransactionAddMutationOptions = Apollo.BaseMutationOptions<ProjectTransactionAddMutation, ProjectTransactionAddMutationVariables>;
export const ProjectTransactionEditDocument = gql`
    mutation projectTransactionEdit($data: ProjectTransactionEditInputType!) {
  projectTransactionEdit(data: $data) {
    message
    status
    statusCode
    __typename
  }
}
    `;
export type ProjectTransactionEditMutationFn = Apollo.MutationFunction<ProjectTransactionEditMutation, ProjectTransactionEditMutationVariables>;

/**
 * __useProjectTransactionEditMutation__
 *
 * To run a mutation, you first call `useProjectTransactionEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectTransactionEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectTransactionEditMutation, { data, loading, error }] = useProjectTransactionEditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectTransactionEditMutation(baseOptions?: Apollo.MutationHookOptions<ProjectTransactionEditMutation, ProjectTransactionEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectTransactionEditMutation, ProjectTransactionEditMutationVariables>(ProjectTransactionEditDocument, options);
      }
export type ProjectTransactionEditMutationHookResult = ReturnType<typeof useProjectTransactionEditMutation>;
export type ProjectTransactionEditMutationResult = Apollo.MutationResult<ProjectTransactionEditMutation>;
export type ProjectTransactionEditMutationOptions = Apollo.BaseMutationOptions<ProjectTransactionEditMutation, ProjectTransactionEditMutationVariables>;
export const ProjectPurchaseAddDocument = gql`
    mutation projectPurchaseAdd($data: ProjectPurchaseAddInputData!) {
  projectPurchaseAdd(data: $data) {
    message
    metadata
    status
    statusCode
  }
}
    `;
export type ProjectPurchaseAddMutationFn = Apollo.MutationFunction<ProjectPurchaseAddMutation, ProjectPurchaseAddMutationVariables>;

/**
 * __useProjectPurchaseAddMutation__
 *
 * To run a mutation, you first call `useProjectPurchaseAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectPurchaseAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectPurchaseAddMutation, { data, loading, error }] = useProjectPurchaseAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectPurchaseAddMutation(baseOptions?: Apollo.MutationHookOptions<ProjectPurchaseAddMutation, ProjectPurchaseAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectPurchaseAddMutation, ProjectPurchaseAddMutationVariables>(ProjectPurchaseAddDocument, options);
      }
export type ProjectPurchaseAddMutationHookResult = ReturnType<typeof useProjectPurchaseAddMutation>;
export type ProjectPurchaseAddMutationResult = Apollo.MutationResult<ProjectPurchaseAddMutation>;
export type ProjectPurchaseAddMutationOptions = Apollo.BaseMutationOptions<ProjectPurchaseAddMutation, ProjectPurchaseAddMutationVariables>;
export const ReportAddDocument = gql`
    mutation reportAdd($data: ReportInputType!) {
  reportAdd(data: $data) {
    message
    metadata
    status
    statusCode
  }
}
    `;
export type ReportAddMutationFn = Apollo.MutationFunction<ReportAddMutation, ReportAddMutationVariables>;

/**
 * __useReportAddMutation__
 *
 * To run a mutation, you first call `useReportAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportAddMutation, { data, loading, error }] = useReportAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useReportAddMutation(baseOptions?: Apollo.MutationHookOptions<ReportAddMutation, ReportAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportAddMutation, ReportAddMutationVariables>(ReportAddDocument, options);
      }
export type ReportAddMutationHookResult = ReturnType<typeof useReportAddMutation>;
export type ReportAddMutationResult = Apollo.MutationResult<ReportAddMutation>;
export type ReportAddMutationOptions = Apollo.BaseMutationOptions<ReportAddMutation, ReportAddMutationVariables>;
export const SettingEditDocument = gql`
    mutation settingEdit($data: SettingEditInputType) {
  settingEdit(data: $data) {
    status
    statusCode
    message
    metadata
    __typename
  }
}
    `;
export type SettingEditMutationFn = Apollo.MutationFunction<SettingEditMutation, SettingEditMutationVariables>;

/**
 * __useSettingEditMutation__
 *
 * To run a mutation, you first call `useSettingEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingEditMutation, { data, loading, error }] = useSettingEditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSettingEditMutation(baseOptions?: Apollo.MutationHookOptions<SettingEditMutation, SettingEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SettingEditMutation, SettingEditMutationVariables>(SettingEditDocument, options);
      }
export type SettingEditMutationHookResult = ReturnType<typeof useSettingEditMutation>;
export type SettingEditMutationResult = Apollo.MutationResult<SettingEditMutation>;
export type SettingEditMutationOptions = Apollo.BaseMutationOptions<SettingEditMutation, SettingEditMutationVariables>;
export const TourAddDocument = gql`
    mutation tourAdd($data: TourAddInputType!) {
  tourAdd(data: $data) {
    status
    statusCode
    message
    metadata
  }
}
    `;
export type TourAddMutationFn = Apollo.MutationFunction<TourAddMutation, TourAddMutationVariables>;

/**
 * __useTourAddMutation__
 *
 * To run a mutation, you first call `useTourAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTourAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tourAddMutation, { data, loading, error }] = useTourAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTourAddMutation(baseOptions?: Apollo.MutationHookOptions<TourAddMutation, TourAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TourAddMutation, TourAddMutationVariables>(TourAddDocument, options);
      }
export type TourAddMutationHookResult = ReturnType<typeof useTourAddMutation>;
export type TourAddMutationResult = Apollo.MutationResult<TourAddMutation>;
export type TourAddMutationOptions = Apollo.BaseMutationOptions<TourAddMutation, TourAddMutationVariables>;
export const TourTransactionAddDocument = gql`
    mutation tourTransactionAdd($data: TourTransactionAddInputType!) {
  tourTransactionAdd(data: $data) {
    status
    statusCode
    message
    metadata
  }
}
    `;
export type TourTransactionAddMutationFn = Apollo.MutationFunction<TourTransactionAddMutation, TourTransactionAddMutationVariables>;

/**
 * __useTourTransactionAddMutation__
 *
 * To run a mutation, you first call `useTourTransactionAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTourTransactionAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tourTransactionAddMutation, { data, loading, error }] = useTourTransactionAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTourTransactionAddMutation(baseOptions?: Apollo.MutationHookOptions<TourTransactionAddMutation, TourTransactionAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TourTransactionAddMutation, TourTransactionAddMutationVariables>(TourTransactionAddDocument, options);
      }
export type TourTransactionAddMutationHookResult = ReturnType<typeof useTourTransactionAddMutation>;
export type TourTransactionAddMutationResult = Apollo.MutationResult<TourTransactionAddMutation>;
export type TourTransactionAddMutationOptions = Apollo.BaseMutationOptions<TourTransactionAddMutation, TourTransactionAddMutationVariables>;
export const TourPurchaseAddDocument = gql`
    mutation tourPurchaseAdd($data: TourPurchaseAddInputData!) {
  tourPurchaseAdd(data: $data) {
    message
    metadata
    status
    statusCode
  }
}
    `;
export type TourPurchaseAddMutationFn = Apollo.MutationFunction<TourPurchaseAddMutation, TourPurchaseAddMutationVariables>;

/**
 * __useTourPurchaseAddMutation__
 *
 * To run a mutation, you first call `useTourPurchaseAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTourPurchaseAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tourPurchaseAddMutation, { data, loading, error }] = useTourPurchaseAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTourPurchaseAddMutation(baseOptions?: Apollo.MutationHookOptions<TourPurchaseAddMutation, TourPurchaseAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TourPurchaseAddMutation, TourPurchaseAddMutationVariables>(TourPurchaseAddDocument, options);
      }
export type TourPurchaseAddMutationHookResult = ReturnType<typeof useTourPurchaseAddMutation>;
export type TourPurchaseAddMutationResult = Apollo.MutationResult<TourPurchaseAddMutation>;
export type TourPurchaseAddMutationOptions = Apollo.BaseMutationOptions<TourPurchaseAddMutation, TourPurchaseAddMutationVariables>;
export const TourTransactionEditDocument = gql`
    mutation tourTransactionEdit($data: TourTransactionEditInputType!) {
  tourTransactionEdit(data: $data) {
    message
    metadata
    status
    statusCode
    __typename
  }
}
    `;
export type TourTransactionEditMutationFn = Apollo.MutationFunction<TourTransactionEditMutation, TourTransactionEditMutationVariables>;

/**
 * __useTourTransactionEditMutation__
 *
 * To run a mutation, you first call `useTourTransactionEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTourTransactionEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tourTransactionEditMutation, { data, loading, error }] = useTourTransactionEditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTourTransactionEditMutation(baseOptions?: Apollo.MutationHookOptions<TourTransactionEditMutation, TourTransactionEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TourTransactionEditMutation, TourTransactionEditMutationVariables>(TourTransactionEditDocument, options);
      }
export type TourTransactionEditMutationHookResult = ReturnType<typeof useTourTransactionEditMutation>;
export type TourTransactionEditMutationResult = Apollo.MutationResult<TourTransactionEditMutation>;
export type TourTransactionEditMutationOptions = Apollo.BaseMutationOptions<TourTransactionEditMutation, TourTransactionEditMutationVariables>;
export const UserGetTokenDocument = gql`
    mutation userGetToken($code: Int!, $phoneNumber: String!) {
  userGetToken(code: $code, phoneNumber: $phoneNumber) {
    __typename
    ... on ResponseWithToken {
      message
      metadata
      status
      statusCode
      token
      refreshToken
    }
    ... on ResponseBase {
      message
      metadata
      status
      statusCode
    }
  }
}
    `;
export type UserGetTokenMutationFn = Apollo.MutationFunction<UserGetTokenMutation, UserGetTokenMutationVariables>;

/**
 * __useUserGetTokenMutation__
 *
 * To run a mutation, you first call `useUserGetTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserGetTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userGetTokenMutation, { data, loading, error }] = useUserGetTokenMutation({
 *   variables: {
 *      code: // value for 'code'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUserGetTokenMutation(baseOptions?: Apollo.MutationHookOptions<UserGetTokenMutation, UserGetTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserGetTokenMutation, UserGetTokenMutationVariables>(UserGetTokenDocument, options);
      }
export type UserGetTokenMutationHookResult = ReturnType<typeof useUserGetTokenMutation>;
export type UserGetTokenMutationResult = Apollo.MutationResult<UserGetTokenMutation>;
export type UserGetTokenMutationOptions = Apollo.BaseMutationOptions<UserGetTokenMutation, UserGetTokenMutationVariables>;
export const UserEditDocument = gql`
    mutation userEdit($data: UserEditInputType) {
  userEdit(data: $data) {
    status
    statusCode
    message
    metadata
    __typename
  }
}
    `;
export type UserEditMutationFn = Apollo.MutationFunction<UserEditMutation, UserEditMutationVariables>;

/**
 * __useUserEditMutation__
 *
 * To run a mutation, you first call `useUserEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userEditMutation, { data, loading, error }] = useUserEditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserEditMutation(baseOptions?: Apollo.MutationHookOptions<UserEditMutation, UserEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserEditMutation, UserEditMutationVariables>(UserEditDocument, options);
      }
export type UserEditMutationHookResult = ReturnType<typeof useUserEditMutation>;
export type UserEditMutationResult = Apollo.MutationResult<UserEditMutation>;
export type UserEditMutationOptions = Apollo.BaseMutationOptions<UserEditMutation, UserEditMutationVariables>;
export const BannerListDocument = gql`
    query bannerList($page: PageType, $search: String) {
  bannerList(search: $search, page: $page) {
    pageCount
    count
    data {
      id
      url
      title
      avatarS3 {
        large
        medium
        small
      }
    }
  }
}
    `;

/**
 * __useBannerListQuery__
 *
 * To run a query within a React component, call `useBannerListQuery` and pass it any options that fit your needs.
 * When your component renders, `useBannerListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBannerListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useBannerListQuery(baseOptions?: Apollo.QueryHookOptions<BannerListQuery, BannerListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BannerListQuery, BannerListQueryVariables>(BannerListDocument, options);
      }
export function useBannerListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BannerListQuery, BannerListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BannerListQuery, BannerListQueryVariables>(BannerListDocument, options);
        }
export type BannerListQueryHookResult = ReturnType<typeof useBannerListQuery>;
export type BannerListLazyQueryHookResult = ReturnType<typeof useBannerListLazyQuery>;
export type BannerListQueryResult = Apollo.QueryResult<BannerListQuery, BannerListQueryVariables>;
export const CategoryListDocument = gql`
    query categoryList($page: PageType, $search: String) {
  categoryList(page: $page, search: $search) {
    pageCount
    count
    data {
      id
      name
      displayName
      avatarS3 {
        large
        medium
        small
      }
    }
    pageCount
  }
}
    `;

/**
 * __useCategoryListQuery__
 *
 * To run a query within a React component, call `useCategoryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useCategoryListQuery(baseOptions?: Apollo.QueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
      }
export function useCategoryListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
        }
export type CategoryListQueryHookResult = ReturnType<typeof useCategoryListQuery>;
export type CategoryListLazyQueryHookResult = ReturnType<typeof useCategoryListLazyQuery>;
export type CategoryListQueryResult = Apollo.QueryResult<CategoryListQuery, CategoryListQueryVariables>;
export const MyNgoDetailProjectSetDocument = gql`
    query myNGODetailProjectSet {
  NGODetail {
    id
    projectSet {
      id
      creator {
        id
      }
      accommodation {
        id
        address
        province
        city
        avatarS3 {
          large
          medium
          small
        }
      }
      name
      description
      modifiedDate
      dateStart
      dateEnd
      gender
      requestFrom
      price
      discount
      tax
      statusStep
      statusActivation
      facilities {
        id
      }
      tags {
        id
      }
      categories {
        id
      }
      createdDate
      capacity {
        id
      }
      transactionSet {
        id
      }
      capacityReserved {
        male
        female
        allCap
      }
      freeCapacity {
        male
        female
        allCap
      }
      __typename
    }
  }
}
    `;

/**
 * __useMyNgoDetailProjectSetQuery__
 *
 * To run a query within a React component, call `useMyNgoDetailProjectSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNgoDetailProjectSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNgoDetailProjectSetQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNgoDetailProjectSetQuery(baseOptions?: Apollo.QueryHookOptions<MyNgoDetailProjectSetQuery, MyNgoDetailProjectSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNgoDetailProjectSetQuery, MyNgoDetailProjectSetQueryVariables>(MyNgoDetailProjectSetDocument, options);
      }
export function useMyNgoDetailProjectSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNgoDetailProjectSetQuery, MyNgoDetailProjectSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNgoDetailProjectSetQuery, MyNgoDetailProjectSetQueryVariables>(MyNgoDetailProjectSetDocument, options);
        }
export type MyNgoDetailProjectSetQueryHookResult = ReturnType<typeof useMyNgoDetailProjectSetQuery>;
export type MyNgoDetailProjectSetLazyQueryHookResult = ReturnType<typeof useMyNgoDetailProjectSetLazyQuery>;
export type MyNgoDetailProjectSetQueryResult = Apollo.QueryResult<MyNgoDetailProjectSetQuery, MyNgoDetailProjectSetQueryVariables>;
export const MyNgoDetailProjectTransactionSetDocument = gql`
    query myNGODetailProjectTransactionSet {
  NGODetail {
    id
    projectTransactionSet {
      dateEnd
      dateStart
      id
      owner {
        phoneNumber
        fullname
        id
        avatarS3 {
          large
          medium
          small
        }
      }
      guest {
        guestNumber
        gender
        childAccept
      }
      project {
        name
        id
      }
      status {
        isActive
        step
      }
    }
  }
}
    `;

/**
 * __useMyNgoDetailProjectTransactionSetQuery__
 *
 * To run a query within a React component, call `useMyNgoDetailProjectTransactionSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNgoDetailProjectTransactionSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNgoDetailProjectTransactionSetQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNgoDetailProjectTransactionSetQuery(baseOptions?: Apollo.QueryHookOptions<MyNgoDetailProjectTransactionSetQuery, MyNgoDetailProjectTransactionSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNgoDetailProjectTransactionSetQuery, MyNgoDetailProjectTransactionSetQueryVariables>(MyNgoDetailProjectTransactionSetDocument, options);
      }
export function useMyNgoDetailProjectTransactionSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNgoDetailProjectTransactionSetQuery, MyNgoDetailProjectTransactionSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNgoDetailProjectTransactionSetQuery, MyNgoDetailProjectTransactionSetQueryVariables>(MyNgoDetailProjectTransactionSetDocument, options);
        }
export type MyNgoDetailProjectTransactionSetQueryHookResult = ReturnType<typeof useMyNgoDetailProjectTransactionSetQuery>;
export type MyNgoDetailProjectTransactionSetLazyQueryHookResult = ReturnType<typeof useMyNgoDetailProjectTransactionSetLazyQuery>;
export type MyNgoDetailProjectTransactionSetQueryResult = Apollo.QueryResult<MyNgoDetailProjectTransactionSetQuery, MyNgoDetailProjectTransactionSetQueryVariables>;
export const MyNgoDetailTourSetDocument = gql`
    query myNGODetailTourSet {
  NGODetail {
    id
    tourSet {
      id
      title
      description
      startTime
      endTime
      statusStep
      statusActivation
      createdDate
      modifiedDate
      origin {
        ... on AccommodationQueryType {
          id
          province
          city
          address
          lat
          lng
          avatarS3 {
            large
            medium
            small
          }
        }
        ... on ProjectQueryType {
          id
        }
      }
      destination {
        ... on AccommodationQueryType {
          id
          province
          city
          address
          lat
          lng
          avatarS3 {
            large
            medium
            small
          }
        }
        ... on ProjectQueryType {
          id
        }
        __typename
      }
      avatarS3 {
        large
        medium
        small
      }
      packages {
        id
        title
        price
      }
      capacity {
        id
        male
        female
        child
      }
      facilities {
        id
        faName
        enName
        arName
      }
    }
  }
}
    `;

/**
 * __useMyNgoDetailTourSetQuery__
 *
 * To run a query within a React component, call `useMyNgoDetailTourSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNgoDetailTourSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNgoDetailTourSetQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNgoDetailTourSetQuery(baseOptions?: Apollo.QueryHookOptions<MyNgoDetailTourSetQuery, MyNgoDetailTourSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNgoDetailTourSetQuery, MyNgoDetailTourSetQueryVariables>(MyNgoDetailTourSetDocument, options);
      }
export function useMyNgoDetailTourSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNgoDetailTourSetQuery, MyNgoDetailTourSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNgoDetailTourSetQuery, MyNgoDetailTourSetQueryVariables>(MyNgoDetailTourSetDocument, options);
        }
export type MyNgoDetailTourSetQueryHookResult = ReturnType<typeof useMyNgoDetailTourSetQuery>;
export type MyNgoDetailTourSetLazyQueryHookResult = ReturnType<typeof useMyNgoDetailTourSetLazyQuery>;
export type MyNgoDetailTourSetQueryResult = Apollo.QueryResult<MyNgoDetailTourSetQuery, MyNgoDetailTourSetQueryVariables>;
export const MyNgoDetailTourTransactionSetDocument = gql`
    query myNGODetailTourTransactionSet {
  NGODetail {
    id
    tourTransactionSet {
      id
      status {
        isActive
        step
      }
      owner {
        avatarS3 {
          large
          medium
          small
        }
        id
        fullname
        phoneNumber
      }
      tourPackage {
        tour {
          id
          title
        }
      }
      tourGuests {
        avatarS3 {
          large
          medium
          small
        }
        id
        firstname
        lastname
        phoneNumber
      }
    }
  }
}
    `;

/**
 * __useMyNgoDetailTourTransactionSetQuery__
 *
 * To run a query within a React component, call `useMyNgoDetailTourTransactionSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNgoDetailTourTransactionSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNgoDetailTourTransactionSetQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNgoDetailTourTransactionSetQuery(baseOptions?: Apollo.QueryHookOptions<MyNgoDetailTourTransactionSetQuery, MyNgoDetailTourTransactionSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNgoDetailTourTransactionSetQuery, MyNgoDetailTourTransactionSetQueryVariables>(MyNgoDetailTourTransactionSetDocument, options);
      }
export function useMyNgoDetailTourTransactionSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNgoDetailTourTransactionSetQuery, MyNgoDetailTourTransactionSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNgoDetailTourTransactionSetQuery, MyNgoDetailTourTransactionSetQueryVariables>(MyNgoDetailTourTransactionSetDocument, options);
        }
export type MyNgoDetailTourTransactionSetQueryHookResult = ReturnType<typeof useMyNgoDetailTourTransactionSetQuery>;
export type MyNgoDetailTourTransactionSetLazyQueryHookResult = ReturnType<typeof useMyNgoDetailTourTransactionSetLazyQuery>;
export type MyNgoDetailTourTransactionSetQueryResult = Apollo.QueryResult<MyNgoDetailTourTransactionSetQuery, MyNgoDetailTourTransactionSetQueryVariables>;
export const MyNgoDetailDocument = gql`
    query myNGODetail {
  NGODetail {
    id
    projectSet {
      id
      creator {
        id
      }
      accommodation {
        id
        address
        province
        city
        avatarS3 {
          large
          medium
          small
        }
      }
      name
      description
      modifiedDate
      dateStart
      dateEnd
      gender
      requestFrom
      price
      discount
      tax
      statusStep
      statusActivation
      facilities {
        id
      }
      tags {
        id
      }
      categories {
        id
      }
      createdDate
      capacity {
        id
      }
      transactionSet {
        id
      }
      capacityReserved {
        male
        female
        allCap
      }
      freeCapacity {
        male
        female
        allCap
      }
      __typename
    }
    tourSet {
      id
      title
      description
      startTime
      endTime
      statusStep
      statusActivation
      createdDate
      modifiedDate
      origin {
        ... on AccommodationQueryType {
          id
          province
          city
          address
          lat
          lng
          avatarS3 {
            large
            medium
            small
          }
        }
        ... on ProjectQueryType {
          id
        }
      }
      destination {
        ... on AccommodationQueryType {
          id
          province
          city
          address
          lat
          lng
          avatarS3 {
            large
            medium
            small
          }
        }
        ... on ProjectQueryType {
          id
        }
        __typename
      }
      avatarS3 {
        large
        medium
        small
      }
      packages {
        id
        title
        price
      }
      capacity {
        id
        male
        female
        child
      }
      facilities {
        id
        faName
        enName
        arName
      }
    }
    tourTransactionSet {
      id
      status {
        isActive
        step
      }
      owner {
        avatarS3 {
          large
          medium
          small
        }
        id
        fullname
        phoneNumber
      }
      tourPackage {
        tour {
          id
          title
        }
      }
      tourGuests {
        avatarS3 {
          large
          medium
          small
        }
        id
        firstname
        lastname
        phoneNumber
      }
    }
    projectTransactionSet {
      dateEnd
      dateStart
      id
      owner {
        phoneNumber
        fullname
        id
        avatarS3 {
          large
          medium
          small
        }
      }
      guest {
        guestNumber
        gender
        childAccept
      }
      project {
        name
        id
      }
      status {
        isActive
        step
      }
    }
  }
}
    `;

/**
 * __useMyNgoDetailQuery__
 *
 * To run a query within a React component, call `useMyNgoDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNgoDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNgoDetailQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNgoDetailQuery(baseOptions?: Apollo.QueryHookOptions<MyNgoDetailQuery, MyNgoDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNgoDetailQuery, MyNgoDetailQueryVariables>(MyNgoDetailDocument, options);
      }
export function useMyNgoDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNgoDetailQuery, MyNgoDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNgoDetailQuery, MyNgoDetailQueryVariables>(MyNgoDetailDocument, options);
        }
export type MyNgoDetailQueryHookResult = ReturnType<typeof useMyNgoDetailQuery>;
export type MyNgoDetailLazyQueryHookResult = ReturnType<typeof useMyNgoDetailLazyQuery>;
export type MyNgoDetailQueryResult = Apollo.QueryResult<MyNgoDetailQuery, MyNgoDetailQueryVariables>;
export const MyUserDetailProjectSetDocument = gql`
    query myUserDetailProjectSet {
  userDetail {
    id
    projectSet {
      id
      creator {
        id
      }
      accommodation {
        id
        address
        province
        city
        avatarS3 {
          large
          medium
          small
        }
      }
      name
      description
      modifiedDate
      dateStart
      dateEnd
      gender
      requestFrom
      price
      discount
      tax
      statusStep
      statusActivation
      facilities {
        id
      }
      tags {
        id
      }
      categories {
        id
      }
      createdDate
      capacity {
        id
      }
      transactionSet {
        id
      }
      capacityReserved {
        male
        female
        allCap
      }
      freeCapacity {
        male
        female
        allCap
      }
      __typename
    }
  }
}
    `;

/**
 * __useMyUserDetailProjectSetQuery__
 *
 * To run a query within a React component, call `useMyUserDetailProjectSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserDetailProjectSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserDetailProjectSetQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUserDetailProjectSetQuery(baseOptions?: Apollo.QueryHookOptions<MyUserDetailProjectSetQuery, MyUserDetailProjectSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyUserDetailProjectSetQuery, MyUserDetailProjectSetQueryVariables>(MyUserDetailProjectSetDocument, options);
      }
export function useMyUserDetailProjectSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyUserDetailProjectSetQuery, MyUserDetailProjectSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyUserDetailProjectSetQuery, MyUserDetailProjectSetQueryVariables>(MyUserDetailProjectSetDocument, options);
        }
export type MyUserDetailProjectSetQueryHookResult = ReturnType<typeof useMyUserDetailProjectSetQuery>;
export type MyUserDetailProjectSetLazyQueryHookResult = ReturnType<typeof useMyUserDetailProjectSetLazyQuery>;
export type MyUserDetailProjectSetQueryResult = Apollo.QueryResult<MyUserDetailProjectSetQuery, MyUserDetailProjectSetQueryVariables>;
export const MyUserDetailProjectTransactionSetDocument = gql`
    query myUserDetailProjectTransactionSet {
  userDetail {
    id
    projectTransactionSet {
      dateEnd
      dateStart
      id
      owner {
        phoneNumber
        fullname
        id
        avatarS3 {
          large
          medium
          small
        }
      }
      guest {
        guestNumber
        gender
        childAccept
      }
      project {
        name
        id
      }
      status {
        isActive
        step
      }
    }
  }
}
    `;

/**
 * __useMyUserDetailProjectTransactionSetQuery__
 *
 * To run a query within a React component, call `useMyUserDetailProjectTransactionSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserDetailProjectTransactionSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserDetailProjectTransactionSetQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUserDetailProjectTransactionSetQuery(baseOptions?: Apollo.QueryHookOptions<MyUserDetailProjectTransactionSetQuery, MyUserDetailProjectTransactionSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyUserDetailProjectTransactionSetQuery, MyUserDetailProjectTransactionSetQueryVariables>(MyUserDetailProjectTransactionSetDocument, options);
      }
export function useMyUserDetailProjectTransactionSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyUserDetailProjectTransactionSetQuery, MyUserDetailProjectTransactionSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyUserDetailProjectTransactionSetQuery, MyUserDetailProjectTransactionSetQueryVariables>(MyUserDetailProjectTransactionSetDocument, options);
        }
export type MyUserDetailProjectTransactionSetQueryHookResult = ReturnType<typeof useMyUserDetailProjectTransactionSetQuery>;
export type MyUserDetailProjectTransactionSetLazyQueryHookResult = ReturnType<typeof useMyUserDetailProjectTransactionSetLazyQuery>;
export type MyUserDetailProjectTransactionSetQueryResult = Apollo.QueryResult<MyUserDetailProjectTransactionSetQuery, MyUserDetailProjectTransactionSetQueryVariables>;
export const NgoDetailDocument = gql`
    query NGODetail($pk: ID) {
  NGODetail(pk: $pk) {
    id
    title
    address
    description
    avatarS3 {
      large
      medium
      small
    }
    user {
      id
      phoneNumber
      avatarS3 {
        large
        medium
        small
      }
    }
    projectSet {
      id
      name
      price
      dateStart
      dateEnd
      gender
      requestFrom
      tax
      description
      statusStep
      createdDate
      capacity {
        id
        male
        female
        child
      }
      categories {
        id
        name
        displayName
        avatarS3 {
          large
          medium
          small
        }
      }
      tags {
        id
        name
        displayName
      }
      facilities {
        id
        faName
        enName
        arName
      }
      accommodation {
        id
        avatarS3 {
          large
          medium
          small
        }
      }
    }
    tourTransactionSet {
      id
      status {
        isActive
        step
      }
      owner {
        avatarS3 {
          large
          medium
          small
        }
        id
        fullname
        phoneNumber
      }
      tourPackage {
        tour {
          title
        }
      }
      tourGuests {
        avatarS3 {
          large
          medium
          small
        }
        id
        firstname
        lastname
        phoneNumber
      }
    }
  }
}
    `;

/**
 * __useNgoDetailQuery__
 *
 * To run a query within a React component, call `useNgoDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useNgoDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNgoDetailQuery({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useNgoDetailQuery(baseOptions?: Apollo.QueryHookOptions<NgoDetailQuery, NgoDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NgoDetailQuery, NgoDetailQueryVariables>(NgoDetailDocument, options);
      }
export function useNgoDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NgoDetailQuery, NgoDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NgoDetailQuery, NgoDetailQueryVariables>(NgoDetailDocument, options);
        }
export type NgoDetailQueryHookResult = ReturnType<typeof useNgoDetailQuery>;
export type NgoDetailLazyQueryHookResult = ReturnType<typeof useNgoDetailLazyQuery>;
export type NgoDetailQueryResult = Apollo.QueryResult<NgoDetailQuery, NgoDetailQueryVariables>;
export const ProjectDetailDocument = gql`
    query projectDetail($pk: ID!) {
  projectDetail(pk: $pk) {
    id
    name
    price
    gender
    dateEnd
    dateStart
    description
    discount
    tags {
      id
      name
    }
    capacity {
      id
      male
      child
      both
      female
    }
    facilities {
      id
      enName
      faName
      arName
    }
    categories {
      name
      id
    }
    creator {
      id
      fullname
      firstname
      phoneNumber
      ngo {
        id
      }
      avatarS3 {
        small
        medium
        large
      }
      projectSet {
        id
        name
        price
        accommodation {
          id
          address
          avatarS3 {
            large
            medium
            small
          }
        }
      }
    }
    accommodation {
      id
      lat
      lng
      address
      avatarS3 {
        large
        medium
        small
      }
    }
  }
}
    `;

/**
 * __useProjectDetailQuery__
 *
 * To run a query within a React component, call `useProjectDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDetailQuery({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useProjectDetailQuery(baseOptions: Apollo.QueryHookOptions<ProjectDetailQuery, ProjectDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDetailQuery, ProjectDetailQueryVariables>(ProjectDetailDocument, options);
      }
export function useProjectDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDetailQuery, ProjectDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDetailQuery, ProjectDetailQueryVariables>(ProjectDetailDocument, options);
        }
export type ProjectDetailQueryHookResult = ReturnType<typeof useProjectDetailQuery>;
export type ProjectDetailLazyQueryHookResult = ReturnType<typeof useProjectDetailLazyQuery>;
export type ProjectDetailQueryResult = Apollo.QueryResult<ProjectDetailQuery, ProjectDetailQueryVariables>;
export const ProjectListDocument = gql`
    query projectList($search: String, $sort: SortType, $filter: ProjectFilterType, $page: PageType!) {
  projectList(search: $search, sort: $sort, filter: $filter, page: $page) {
    pageCount
    count
    data {
      id
      name
      price
      dateStart
      dateEnd
      discount
      capacity {
        id
        male
        female
        child
      }
      tags {
        id
        name
      }
      accommodation {
        id
        address
        avatarS3 {
          small
        }
      }
    }
  }
}
    `;

/**
 * __useProjectListQuery__
 *
 * To run a query within a React component, call `useProjectListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectListQuery({
 *   variables: {
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useProjectListQuery(baseOptions: Apollo.QueryHookOptions<ProjectListQuery, ProjectListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectListQuery, ProjectListQueryVariables>(ProjectListDocument, options);
      }
export function useProjectListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectListQuery, ProjectListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectListQuery, ProjectListQueryVariables>(ProjectListDocument, options);
        }
export type ProjectListQueryHookResult = ReturnType<typeof useProjectListQuery>;
export type ProjectListLazyQueryHookResult = ReturnType<typeof useProjectListLazyQuery>;
export type ProjectListQueryResult = Apollo.QueryResult<ProjectListQuery, ProjectListQueryVariables>;
export const ProjectTransactionDetailDocument = gql`
    query projectTransactionDetail($pk: ID!) {
  projectTransactionDetail(pk: $pk) {
    id
    dateEnd
    dateStart
    description
    modifiedDate
    invoiceNumber
    purchaseRefId
    createdDate
    owner {
      id
      fullname
      firstname
    }
    status {
      step
      isActive
    }
    guest {
      guestNumber
      gender
      childAccept
    }
    project {
      id
      name
      tax
      price
      creator {
        id
        firstname
        fullname
        phoneNumber
      }
      description
      categories {
        name
      }
      facilities {
        id
        enName
      }
      accommodation {
        id
        address
        lat
        lng
        avatarS3 {
          small
          medium
          large
        }
      }
    }
  }
}
    `;

/**
 * __useProjectTransactionDetailQuery__
 *
 * To run a query within a React component, call `useProjectTransactionDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectTransactionDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectTransactionDetailQuery({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useProjectTransactionDetailQuery(baseOptions: Apollo.QueryHookOptions<ProjectTransactionDetailQuery, ProjectTransactionDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectTransactionDetailQuery, ProjectTransactionDetailQueryVariables>(ProjectTransactionDetailDocument, options);
      }
export function useProjectTransactionDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectTransactionDetailQuery, ProjectTransactionDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectTransactionDetailQuery, ProjectTransactionDetailQueryVariables>(ProjectTransactionDetailDocument, options);
        }
export type ProjectTransactionDetailQueryHookResult = ReturnType<typeof useProjectTransactionDetailQuery>;
export type ProjectTransactionDetailLazyQueryHookResult = ReturnType<typeof useProjectTransactionDetailLazyQuery>;
export type ProjectTransactionDetailQueryResult = Apollo.QueryResult<ProjectTransactionDetailQuery, ProjectTransactionDetailQueryVariables>;
export const ProjectTransactionListDocument = gql`
    query ProjectTransactionList($page: PageType, $filter: ProjectTransactionFilterType) {
  projectTransactionList(page: $page, filter: $filter) {
    count
    pageCount
    data {
      id
      dateEnd
      dateStart
      description
      modifiedDate
      invoiceNumber
      createdDate
      owner {
        id
        fullname
        firstname
      }
      status {
        step
        isActive
      }
      guest {
        guestNumber
        gender
        childAccept
      }
      project {
        id
        name
        tax
        price
        description
        facilities {
          id
          enName
        }
        accommodation {
          id
          address
          lat
          lng
          avatarS3 {
            small
            medium
            large
          }
        }
      }
    }
  }
}
    `;

/**
 * __useProjectTransactionListQuery__
 *
 * To run a query within a React component, call `useProjectTransactionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectTransactionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectTransactionListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useProjectTransactionListQuery(baseOptions?: Apollo.QueryHookOptions<ProjectTransactionListQuery, ProjectTransactionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectTransactionListQuery, ProjectTransactionListQueryVariables>(ProjectTransactionListDocument, options);
      }
export function useProjectTransactionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectTransactionListQuery, ProjectTransactionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectTransactionListQuery, ProjectTransactionListQueryVariables>(ProjectTransactionListDocument, options);
        }
export type ProjectTransactionListQueryHookResult = ReturnType<typeof useProjectTransactionListQuery>;
export type ProjectTransactionListLazyQueryHookResult = ReturnType<typeof useProjectTransactionListLazyQuery>;
export type ProjectTransactionListQueryResult = Apollo.QueryResult<ProjectTransactionListQuery, ProjectTransactionListQueryVariables>;
export const ReportCategoryListDocument = gql`
    query ReportCategoryList {
  reportCategoryList {
    data {
      name
      id
    }
  }
}
    `;

/**
 * __useReportCategoryListQuery__
 *
 * To run a query within a React component, call `useReportCategoryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportCategoryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportCategoryListQuery({
 *   variables: {
 *   },
 * });
 */
export function useReportCategoryListQuery(baseOptions?: Apollo.QueryHookOptions<ReportCategoryListQuery, ReportCategoryListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportCategoryListQuery, ReportCategoryListQueryVariables>(ReportCategoryListDocument, options);
      }
export function useReportCategoryListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportCategoryListQuery, ReportCategoryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportCategoryListQuery, ReportCategoryListQueryVariables>(ReportCategoryListDocument, options);
        }
export type ReportCategoryListQueryHookResult = ReturnType<typeof useReportCategoryListQuery>;
export type ReportCategoryListLazyQueryHookResult = ReturnType<typeof useReportCategoryListLazyQuery>;
export type ReportCategoryListQueryResult = Apollo.QueryResult<ReportCategoryListQuery, ReportCategoryListQueryVariables>;
export const SettingDetailDocument = gql`
    query settingDetail($userId: ID) {
  settingDetail(userId: $userId) {
    language
  }
}
    `;

/**
 * __useSettingDetailQuery__
 *
 * To run a query within a React component, call `useSettingDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingDetailQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSettingDetailQuery(baseOptions?: Apollo.QueryHookOptions<SettingDetailQuery, SettingDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingDetailQuery, SettingDetailQueryVariables>(SettingDetailDocument, options);
      }
export function useSettingDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingDetailQuery, SettingDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingDetailQuery, SettingDetailQueryVariables>(SettingDetailDocument, options);
        }
export type SettingDetailQueryHookResult = ReturnType<typeof useSettingDetailQuery>;
export type SettingDetailLazyQueryHookResult = ReturnType<typeof useSettingDetailLazyQuery>;
export type SettingDetailQueryResult = Apollo.QueryResult<SettingDetailQuery, SettingDetailQueryVariables>;
export const TagListDocument = gql`
    query TagList($search: String, $page: PageType) {
  tagList(search: $search, page: $page) {
    count
    pageCount
    data {
      id
      name
      displayName
    }
  }
}
    `;

/**
 * __useTagListQuery__
 *
 * To run a query within a React component, call `useTagListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagListQuery({
 *   variables: {
 *      search: // value for 'search'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useTagListQuery(baseOptions?: Apollo.QueryHookOptions<TagListQuery, TagListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagListQuery, TagListQueryVariables>(TagListDocument, options);
      }
export function useTagListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagListQuery, TagListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagListQuery, TagListQueryVariables>(TagListDocument, options);
        }
export type TagListQueryHookResult = ReturnType<typeof useTagListQuery>;
export type TagListLazyQueryHookResult = ReturnType<typeof useTagListLazyQuery>;
export type TagListQueryResult = Apollo.QueryResult<TagListQuery, TagListQueryVariables>;
export const TourDetailDocument = gql`
    query tourDetail($pk: ID!) {
  tourDetail(pk: $pk) {
    id
    title
    description
    startTime
    endTime
    NGO {
      id
      user {
        id
        fullname
        phoneNumber
        avatarS3 {
          small
        }
        ngo {
          id
        }
      }
      tourSet {
        id
        title
        packages {
          id
          title
          price
        }
        destination {
          ... on AccommodationQueryType {
            address
            avatarS3 {
              large
              medium
              small
            }
          }
        }
      }
    }
    capacity {
      id
      male
      female
      child
    }
    facilities {
      id
      enName
      faName
      arName
    }
    destination {
      ... on AccommodationQueryType {
        id
        address
        lat
        lng
      }
    }
    packages {
      id
      title
      price
    }
    avatarS3 {
      medium
      large
      small
    }
  }
}
    `;

/**
 * __useTourDetailQuery__
 *
 * To run a query within a React component, call `useTourDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useTourDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTourDetailQuery({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useTourDetailQuery(baseOptions: Apollo.QueryHookOptions<TourDetailQuery, TourDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TourDetailQuery, TourDetailQueryVariables>(TourDetailDocument, options);
      }
export function useTourDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TourDetailQuery, TourDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TourDetailQuery, TourDetailQueryVariables>(TourDetailDocument, options);
        }
export type TourDetailQueryHookResult = ReturnType<typeof useTourDetailQuery>;
export type TourDetailLazyQueryHookResult = ReturnType<typeof useTourDetailLazyQuery>;
export type TourDetailQueryResult = Apollo.QueryResult<TourDetailQuery, TourDetailQueryVariables>;
export const TourListDocument = gql`
    query tourList($search: String, $sort: SortType, $filter: TourFilterType, $page: PageType!) {
  tourList(search: $search, sort: $sort, filter: $filter, page: $page) {
    count
    data {
      id
      title
      description
      startTime
      endTime
      NGO {
        id
        user {
          id
          fullname
          phoneNumber
          avatarS3 {
            small
          }
        }
        tourSet {
          id
          title
          packages {
            id
            title
            price
          }
          destination {
            ... on AccommodationQueryType {
              address
              avatarS3 {
                large
                medium
                small
              }
            }
          }
        }
      }
      capacity {
        id
        male
        female
        child
      }
      facilities {
        id
        enName
        faName
        arName
      }
      destination {
        ... on AccommodationQueryType {
          id
          address
          lat
          lng
        }
      }
      packages {
        id
        title
        price
      }
      avatarS3 {
        medium
        large
        small
      }
    }
  }
}
    `;

/**
 * __useTourListQuery__
 *
 * To run a query within a React component, call `useTourListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTourListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTourListQuery({
 *   variables: {
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useTourListQuery(baseOptions: Apollo.QueryHookOptions<TourListQuery, TourListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TourListQuery, TourListQueryVariables>(TourListDocument, options);
      }
export function useTourListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TourListQuery, TourListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TourListQuery, TourListQueryVariables>(TourListDocument, options);
        }
export type TourListQueryHookResult = ReturnType<typeof useTourListQuery>;
export type TourListLazyQueryHookResult = ReturnType<typeof useTourListLazyQuery>;
export type TourListQueryResult = Apollo.QueryResult<TourListQuery, TourListQueryVariables>;
export const TourTransactionDetailDocument = gql`
    query tourTransactionDetail($pk: ID!) {
  tourTransactionDetail(pk: $pk) {
    id
    createdDate
    description
    modifiedDate
    invoiceNumber
    purchaseRefId
    tourGuests {
      id
    }
    tourguestSet {
      id
      birthday
      lastname
      firstname
      phoneNumber
      identifyNumber
      gender
    }
    status {
      isActive
      step
    }
    tourPackage {
      title
      price
      id
      tour {
        avatarS3 {
          small
          medium
        }
        id
        title
        endTime
        startTime
        destination {
          ... on AccommodationQueryType {
            id
            lat
            lng
            address
            avatarS3 {
              small
              medium
              large
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useTourTransactionDetailQuery__
 *
 * To run a query within a React component, call `useTourTransactionDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useTourTransactionDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTourTransactionDetailQuery({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useTourTransactionDetailQuery(baseOptions: Apollo.QueryHookOptions<TourTransactionDetailQuery, TourTransactionDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TourTransactionDetailQuery, TourTransactionDetailQueryVariables>(TourTransactionDetailDocument, options);
      }
export function useTourTransactionDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TourTransactionDetailQuery, TourTransactionDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TourTransactionDetailQuery, TourTransactionDetailQueryVariables>(TourTransactionDetailDocument, options);
        }
export type TourTransactionDetailQueryHookResult = ReturnType<typeof useTourTransactionDetailQuery>;
export type TourTransactionDetailLazyQueryHookResult = ReturnType<typeof useTourTransactionDetailLazyQuery>;
export type TourTransactionDetailQueryResult = Apollo.QueryResult<TourTransactionDetailQuery, TourTransactionDetailQueryVariables>;
export const TourTransactionListDocument = gql`
    query tourTransactionList($page: PageType) {
  tourTransactionList(page: $page) {
    count
    data {
      id
      description
      invoiceNumber
      tourguestSet {
        id
      }
      status {
        isActive
        step
      }
      tourPackage {
        price
        tour {
          id
          startTime
          endTime
          avatarS3 {
            large
            medium
            small
          }
          destination {
            ... on AccommodationQueryType {
              id
              address
              avatarS3 {
                small
              }
            }
          }
          title
        }
      }
    }
  }
}
    `;

/**
 * __useTourTransactionListQuery__
 *
 * To run a query within a React component, call `useTourTransactionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTourTransactionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTourTransactionListQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useTourTransactionListQuery(baseOptions?: Apollo.QueryHookOptions<TourTransactionListQuery, TourTransactionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TourTransactionListQuery, TourTransactionListQueryVariables>(TourTransactionListDocument, options);
      }
export function useTourTransactionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TourTransactionListQuery, TourTransactionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TourTransactionListQuery, TourTransactionListQueryVariables>(TourTransactionListDocument, options);
        }
export type TourTransactionListQueryHookResult = ReturnType<typeof useTourTransactionListQuery>;
export type TourTransactionListLazyQueryHookResult = ReturnType<typeof useTourTransactionListLazyQuery>;
export type TourTransactionListQueryResult = Apollo.QueryResult<TourTransactionListQuery, TourTransactionListQueryVariables>;
export const UserDetailDocument = gql`
    query userDetail {
  userDetail {
    id
    username
    firstname
    lastname
    fullname
    email
    bio
    phoneNumber
    avatarS3 {
      large
      medium
      small
    }
    setting {
      language
    }
    isNgo
    ngo {
      id
    }
    wallet {
      balance
      createdTime
      id
      modifiedTime
      walletTransactions {
        action
        source {
          ... on BackCardQueryType {
            id
            title
            cardPan
          }
          ... on WalletQuryType {
            id
          }
        }
        reference {
          ... on BackCardQueryType {
            id
            cardPan
            iban
          }
          ... on WalletQuryType {
            id
            balance
          }
        }
        purchaseRefId
        modifiedTime
        invoiceNumber
        id
        description
        amount
        statusStep
      }
      walletCards {
        id
        iban
        title
        cardPan
      }
    }
  }
}
    `;

/**
 * __useUserDetailQuery__
 *
 * To run a query within a React component, call `useUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserDetailQuery(baseOptions?: Apollo.QueryHookOptions<UserDetailQuery, UserDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserDetailQuery, UserDetailQueryVariables>(UserDetailDocument, options);
      }
export function useUserDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDetailQuery, UserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserDetailQuery, UserDetailQueryVariables>(UserDetailDocument, options);
        }
export type UserDetailQueryHookResult = ReturnType<typeof useUserDetailQuery>;
export type UserDetailLazyQueryHookResult = ReturnType<typeof useUserDetailLazyQuery>;
export type UserDetailQueryResult = Apollo.QueryResult<UserDetailQuery, UserDetailQueryVariables>;
export const WalletTransactionListDocument = gql`
    query walletTransactionList {
  walletTransactionList {
    data {
      action
      source {
        ... on BackCardQueryType {
          id
          title
          cardPan
        }
        ... on WalletQuryType {
          id
        }
      }
      reference {
        ... on BackCardQueryType {
          id
          cardPan
          iban
        }
        ... on WalletQuryType {
          id
          balance
        }
      }
      purchaseRefId
      modifiedTime
      invoiceNumber
      id
      description
      amount
      statusStep
    }
  }
}
    `;

/**
 * __useWalletTransactionListQuery__
 *
 * To run a query within a React component, call `useWalletTransactionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletTransactionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletTransactionListQuery({
 *   variables: {
 *   },
 * });
 */
export function useWalletTransactionListQuery(baseOptions?: Apollo.QueryHookOptions<WalletTransactionListQuery, WalletTransactionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletTransactionListQuery, WalletTransactionListQueryVariables>(WalletTransactionListDocument, options);
      }
export function useWalletTransactionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletTransactionListQuery, WalletTransactionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletTransactionListQuery, WalletTransactionListQueryVariables>(WalletTransactionListDocument, options);
        }
export type WalletTransactionListQueryHookResult = ReturnType<typeof useWalletTransactionListQuery>;
export type WalletTransactionListLazyQueryHookResult = ReturnType<typeof useWalletTransactionListLazyQuery>;
export type WalletTransactionListQueryResult = Apollo.QueryResult<WalletTransactionListQuery, WalletTransactionListQueryVariables>;
export const WalletTransactionDetailDocument = gql`
    query walletTransactionDetail($pk: ID!) {
  walletTransactionDetail(pk: $pk) {
    action
    source {
      ... on BackCardQueryType {
        id
        title
        cardPan
      }
      ... on WalletQuryType {
        id
      }
    }
    reference {
      ... on BackCardQueryType {
        id
        cardPan
        iban
      }
      ... on WalletQuryType {
        id
        balance
      }
    }
    purchaseRefId
    modifiedTime
    invoiceNumber
    id
    description
    amount
    statusStep
  }
}
    `;

/**
 * __useWalletTransactionDetailQuery__
 *
 * To run a query within a React component, call `useWalletTransactionDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletTransactionDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletTransactionDetailQuery({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useWalletTransactionDetailQuery(baseOptions: Apollo.QueryHookOptions<WalletTransactionDetailQuery, WalletTransactionDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletTransactionDetailQuery, WalletTransactionDetailQueryVariables>(WalletTransactionDetailDocument, options);
      }
export function useWalletTransactionDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletTransactionDetailQuery, WalletTransactionDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletTransactionDetailQuery, WalletTransactionDetailQueryVariables>(WalletTransactionDetailDocument, options);
        }
export type WalletTransactionDetailQueryHookResult = ReturnType<typeof useWalletTransactionDetailQuery>;
export type WalletTransactionDetailLazyQueryHookResult = ReturnType<typeof useWalletTransactionDetailLazyQuery>;
export type WalletTransactionDetailQueryResult = Apollo.QueryResult<WalletTransactionDetailQuery, WalletTransactionDetailQueryVariables>;