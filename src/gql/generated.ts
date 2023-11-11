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

/** An enumeration. */
export enum AccommodationGuestGenderChoices {
  /** CHILD */
  Child = 'CHILD',
  /** FEMALE */
  Female = 'FEMALE',
  /** MALE */
  Male = 'MALE'
}

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

/** An enumeration. */
export enum AccommodationProjectStatusChoices {
  /** ACTIVE */
  Active = 'ACTIVE',
  /** COMPLETED */
  Completed = 'COMPLETED',
  /** END */
  End = 'END',
  /** INITIAL */
  Initial = 'INITIAL',
  /** PENDING */
  Pending = 'PENDING',
  /** REJECTED */
  Rejected = 'REJECTED'
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
  child: Scalars['Int']['output'];
  female: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  male: Scalars['Int']['output'];
};

/** Type representing reserved capacity. */
export type CapacityReserveType = {
  __typename?: 'CapacityReserveType';
  child?: Maybe<Scalars['Int']['output']>;
  female?: Maybe<Scalars['Int']['output']>;
  male?: Maybe<Scalars['Int']['output']>;
};

/** Input type for specifying capacity values. */
export type CapacityType = {
  /** Number of child occupants. */
  child?: InputMaybe<Scalars['Int']['input']>;
  /** Number of female occupants. */
  female?: InputMaybe<Scalars['Int']['input']>;
  /** Number of male occupants. */
  male?: InputMaybe<Scalars['Int']['input']>;
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

export type DateRangeType = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

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

/** Input type for specifying guest information. */
export type GuestInputType = {
  /** Birthday of the guest. */
  birthday: Scalars['String']['input'];
  /** Gender of the guest. */
  gender: GuestGenderEnum;
  /** Identification number of the guest. */
  identifyNumber: Scalars['String']['input'];
  /** Identification picture of the guest. */
  identifyPicture?: InputMaybe<Scalars['String']['input']>;
  /** Name of the guest. */
  name: Scalars['String']['input'];
};

export type GuestQueryType = {
  __typename?: 'GuestQueryType';
  birthday?: Maybe<Scalars['Date']['output']>;
  gender: AccommodationGuestGenderChoices;
  id: Scalars['ID']['output'];
  identifyNumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transaction?: Maybe<ProjectTransactionQueryType>;
};

export type IntRangeType = {
  high?: InputMaybe<Scalars['Int']['input']>;
  low?: InputMaybe<Scalars['Int']['input']>;
};

export enum LanguageChoiceEnum {
  Ar = 'AR',
  EnUs = 'EN_US',
  FaIr = 'FA_IR'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutation for adding a new accommodation. */
  accommodationAdd?: Maybe<ResponseBase>;
  /** Mutation for editing an existing accommodation. */
  accommodationEdit?: Maybe<ResponseBase>;
  /**
   * CreateLogin Mutation
   * This mutation is used to create a new user or NGO account and send an SMS activation code.
   */
  createLogin?: Maybe<ResponseBase>;
  /**
   * NGOEdit Mutation
   * This mutation is used to edit an NGO's information, including their avatar image.
   */
  ngoEdit?: Maybe<ResponseBase>;
  /** Mutation for adding a new accommodation project. */
  projectAdd?: Maybe<ResponseBase>;
  /** Mutation for editing an existing accommodation project. */
  projectEdit?: Maybe<ResponseBase>;
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
  refreshToken?: Maybe<Refresh>;
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
};


export type MutationAccommodationAddArgs = {
  data: AccommodationAddInputType;
};


export type MutationAccommodationEditArgs = {
  data: AccommodationEditInputType;
};


export type MutationCreateLoginArgs = {
  dataNgo?: InputMaybe<NgoInputType>;
  dataUser?: InputMaybe<UserInputType>;
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


export type MutationProjectTransactionAddArgs = {
  data: ProjectTransactionAddInputType;
};


export type MutationProjectTransactionEditArgs = {
  data: ProjectTransactionEditInputType;
};


export type MutationRefreshTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
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

/** Input type for editing an NGO. */
export type NgoEditInputType = {
  /** Address of the NGO. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Base64-encoded image. */
  base64Image?: InputMaybe<Scalars['String']['input']>;
  /** Description of the NGO. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Latitude coordinate of the NGO location. */
  lat: Scalars['Float']['input'];
  /** Longitude coordinate of the NGO location. */
  lng: Scalars['Float']['input'];
  /** Title of the NGO. */
  title?: InputMaybe<Scalars['String']['input']>;
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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  /** List of projects associated with the NGO. */
  projectSet?: Maybe<Array<Maybe<ProjectQueryType>>>;
  title: Scalars['String']['output'];
  /** List of tours associated with the NGO. */
  tourSet?: Maybe<Array<Maybe<TourQueryType>>>;
  user?: Maybe<UserQueryType>;
};

/**
 * Represents an input object for specifying pagination parameters.
 *
 * Fields:
 *     - page_size (int): The number of items per page.
 *     - page_number (int): The page number.
 */
export type PageType = {
  /** The page number. */
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  /** The number of items per page. */
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

/** Input type for adding a new project. */
export type ProjectAddInputType = {
  /** ID of the associated accommodation. */
  accommodationId: Scalars['ID']['input'];
  /** Base64-encoded image. */
  base64Image?: InputMaybe<Scalars['String']['input']>;
  /** Capacity information. */
  capacity: CapacityType;
  /** End date of the project. */
  dateEnd: Scalars['String']['input'];
  /** Start date of the project. */
  dateStart: Scalars['String']['input'];
  /** Description of the project. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** List of associated facility IDs. */
  facilities?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Gender for the project. */
  gender: ProjectGenderEnum;
  /** Name of the project. */
  name: Scalars['String']['input'];
  /** Price of the project. */
  price: Scalars['Int']['input'];
  /** Request source for the project. */
  requestFrom: ProjectRequestFromEnum;
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
  /** Capacity range. */
  capacity?: InputMaybe<IntRangeType>;
  /** Filter by project categories. */
  categories?: InputMaybe<Array<InputMaybe<ProjectCategoryEnum>>>;
  /** Filter by project creator. */
  creator?: InputMaybe<Array<InputMaybe<ProjectCreatorEnum>>>;
  /** Date range. */
  dateRange?: InputMaybe<DateRangeType>;
  /** Filter by project gender. */
  gender?: InputMaybe<Array<InputMaybe<ProjectGenderEnum>>>;
  /** Price range. */
  price?: InputMaybe<IntRangeType>;
  /** Filter by project status. */
  status?: InputMaybe<Array<InputMaybe<ProjectStatusEnum>>>;
  /** Filter by project tags. */
  tags?: InputMaybe<Array<InputMaybe<ProjectTagEnum>>>;
};

export enum ProjectGenderEnum {
  Child = 'CHILD',
  Female = 'FEMALE',
  Male = 'MALE'
}

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
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<UserQueryType>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** List of facilities associated with the project. */
  facilities?: Maybe<Array<Maybe<ProjectFacilityQueryType>>>;
  /** Free capacity information associated with the project. */
  freeCapacity?: Maybe<CapacityReserveType>;
  gender: AccommodationProjectGenderChoices;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  requestFrom: AccommodationProjectRequestFromChoices;
  status: AccommodationProjectStatusChoices;
  tags: Array<TagQueryType>;
  tax?: Maybe<Scalars['Int']['output']>;
  /** List of transactions associated with the project. */
  transactionSet?: Maybe<Array<Maybe<ProjectTransactionQueryType>>>;
};

export enum ProjectRequestFromEnum {
  Both = 'BOTH',
  Ngo = 'NGO',
  User = 'USER'
}

export enum ProjectStatusEnum {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  End = 'END',
  Initial = 'INITIAL',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
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
  guests?: InputMaybe<Array<InputMaybe<GuestInputType>>>;
  /** ID of the associated project. */
  projectId: Scalars['ID']['input'];
};

/** Input type for editing a project transaction. */
export type ProjectTransactionEditInputType = {
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
  /** List of guests associated with the transaction. */
  guestSet?: Maybe<Array<Maybe<GuestQueryType>>>;
  id: Scalars['ID']['output'];
  invoiceNumber?: Maybe<Scalars['UUID']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  owner?: Maybe<UserQueryType>;
  project?: Maybe<ProjectQueryType>;
  /** Transaction status information. */
  status?: Maybe<StatusQueryType>;
};

export type Query = {
  __typename?: 'Query';
  NGODetail?: Maybe<NgoQueryType>;
  NGOList?: Maybe<NgoListType>;
  accommodationDetail?: Maybe<AccommodationQueryType>;
  accommodationList?: Maybe<AccommodationListType>;
  bannerDetail?: Maybe<BannerQueryType>;
  bannerList?: Maybe<BannerListType>;
  categoryList?: Maybe<CategoryListType>;
  projectDetail?: Maybe<ProjectQueryType>;
  projectFacilityList?: Maybe<ProjectFacilityListType>;
  projectList?: Maybe<ProjectListType>;
  projectTransactionDetail?: Maybe<ProjectTransactionQueryType>;
  projectTransactionList?: Maybe<ProjectTransactionListType>;
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


export type QueryBannerDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryBannerListArgs = {
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoryListArgs = {
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
};


export type QueryProjectTransactionDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryProjectTransactionListArgs = {
  filter?: InputMaybe<ProjectTransactionFilterType>;
  page?: InputMaybe<PageType>;
};


export type QuerySettingDetailArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTagListArgs = {
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
};


export type QueryTourTransactionDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryTourTransactionListArgs = {
  filter?: InputMaybe<TourTransactionFilterType>;
  page?: InputMaybe<PageType>;
};


export type QueryUserDetailArgs = {
  dimension?: InputMaybe<Scalars['String']['input']>;
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserListArgs = {
  page?: InputMaybe<PageType>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

/**
 * Represents a basic response object.
 *
 * Fields:
 *     - status (str): The status of the response.
 *     - status_code (int): The HTTP status code of the response.
 *     - message (str): A message associated with the response.
 *     - metadata (GenericScalar): Additional metadata associated with the response.
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
 * Fields:
 *     - status (str): The status of the response.
 *     - status_code (int): The HTTP status code of the response.
 *     - message (str): A message associated with the response.
 *     - token (str): An authentication token.
 *     - refresh_token (str): A refresh token.
 *     - metadata (GenericScalar): Additional metadata associated with the response.
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
  discount: Scalars['Int']['input'];
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
  child: Scalars['Int']['output'];
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
  /** Filter by date range. */
  dateRange?: InputMaybe<DateRangeType>;
  /** Filter by price range. */
  price?: InputMaybe<IntRangeType>;
};

export enum TourGenderEnum {
  Both = 'BOTH',
  Female = 'FEMALE',
  Male = 'MALE'
}

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
  description: Scalars['String']['output'];
  destination?: Maybe<TourDestOrigUnion>;
  endTime: Scalars['DateTime']['output'];
  /** List of tour facilities. */
  facilities?: Maybe<Array<Maybe<TourFacilityQueryType>>>;
  id: Scalars['ID']['output'];
  origin?: Maybe<TourDestOrigUnion>;
  packages: Array<TourPackageType>;
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
  /** Status information for the transaction. */
  status?: Maybe<TourStatusQueryType>;
  tourPackage?: Maybe<TourPackageType>;
};

/** Input type for updating the status of a tour transaction. */
export type TourTransactionStatusInputType = {
  /** New active status for the transaction. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** New step/status for the transaction. */
  step?: InputMaybe<TransactionStatusEnum>;
};

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
  setting?: Maybe<SettingDetailType>;
  smsActivationCode?: Maybe<Scalars['Int']['output']>;
  tourtransactionSet: Array<TourTransactionQueryType>;
  transactionSet: Array<ProjectTransactionQueryType>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String']['output'];
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

export type CreateLoginMutationVariables = Exact<{
  dataUser?: InputMaybe<UserInputType>;
  dataNgo?: InputMaybe<NgoInputType>;
}>;


export type CreateLoginMutation = { __typename?: 'Mutation', createLogin?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type SettingEditMutationVariables = Exact<{
  data?: InputMaybe<SettingEditInputType>;
}>;


export type SettingEditMutation = { __typename?: 'Mutation', settingEdit?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type TourTransactionAddMutationVariables = Exact<{
  data: TourTransactionAddInputType;
}>;


export type TourTransactionAddMutation = { __typename?: 'Mutation', tourTransactionAdd?: { __typename?: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type ProjectTransactionEditMutationVariables = Exact<{
  data: ProjectTransactionEditInputType;
}>;


export type ProjectTransactionEditMutation = { __typename?: 'Mutation', projectTransactionEdit?: { __typename: 'ResponseBase', message?: string | null, status?: string | null, statusCode?: number | null } | null };

export type ProjectTransactionAddMutationVariables = Exact<{
  data: ProjectTransactionAddInputType;
}>;


export type ProjectTransactionAddMutation = { __typename?: 'Mutation', projectTransactionAdd?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type UserGetTokenMutationVariables = Exact<{
  code: Scalars['Int']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type UserGetTokenMutation = { __typename?: 'Mutation', userGetToken?: { __typename: 'ResponseBase', message?: string | null, metadata?: any | null, status?: string | null, statusCode?: number | null } | { __typename: 'ResponseWithToken', message?: string | null, metadata?: any | null, refreshToken?: string | null, status?: string | null, statusCode?: number | null, token?: string | null } | null };

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

export type MyNgoDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNgoDetailQuery = { __typename?: 'Query', NGODetail?: { __typename?: 'NGOQueryType', id: string, tourSet?: Array<{ __typename?: 'TourQueryType', id: string, title: string, description: string, startTime: any, endTime: any, statusStep?: TourTourStatusStepChoices | null, statusActivation: boolean, origin?: { __typename?: 'AccommodationQueryType', id: string } | { __typename?: 'ProjectQueryType', id: string } | null, destination?: { __typename: 'AccommodationQueryType', id: string } | { __typename: 'ProjectQueryType', id: string } | null, avatarS3?: Array<{ __typename?: 'TourImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null, packages: Array<{ __typename?: 'TourPackageType', id: string, title?: string | null, price: number }>, capacity?: { __typename?: 'TourCapacityType', id: string, male: number, female: number, child: number } | null, facilities?: Array<{ __typename?: 'TourFacilityQueryType', id: string, faName?: string | null, enName?: string | null, arName?: string | null } | null> | null } | null> | null } | null };

export type NgoDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type NgoDetailQuery = { __typename?: 'Query', NGODetail?: { __typename?: 'NGOQueryType', id: string, title: string, address?: string | null, description?: string | null, avatarS3?: { __typename?: 'NGOImageType', large?: string | null, medium?: string | null, small?: string | null } | null, user?: { __typename?: 'UserQueryType', id: string, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null, tourSet?: Array<{ __typename?: 'TourQueryType', id: string, title: string } | null> | null, projectSet?: Array<{ __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, dateStart?: any | null, dateEnd?: any | null, gender: AccommodationProjectGenderChoices, requestFrom: AccommodationProjectRequestFromChoices, tax?: number | null, description?: string | null, status: AccommodationProjectStatusChoices, createdTime?: any | null, capacity?: { __typename?: 'CapacityQueryType', id: string, male: number, female: number, child: number } | null, categories?: Array<{ __typename?: 'CategoryQueryType', id: string, name?: string | null, displayName?: string | null, avatarS3?: { __typename?: 'CategoryImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null> | null, tags: Array<{ __typename?: 'TagQueryType', id: string, name?: string | null, displayName?: string | null }>, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string, faName?: string | null, enName?: string | null, arName?: string | null } | null> | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null } | null> | null } | null };

export type ProjectDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type ProjectDetailQuery = { __typename?: 'Query', projectDetail?: { __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, gender: AccommodationProjectGenderChoices, description?: string | null, tags: Array<{ __typename?: 'TagQueryType', id: string, name?: string | null }>, capacity?: { __typename?: 'CapacityQueryType', id: string, male: number, child: number, female: number } | null, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string, enName?: string | null, faName?: string | null, arName?: string | null } | null> | null, creator?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, firstname?: string | null, phoneNumber?: string | null, ngo?: { __typename?: 'NGOQueryType', id: string } | null, avatarS3?: { __typename?: 'UserImageType', small?: string | null } | null, projectSet?: Array<{ __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null } | null> | null } | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, lat?: number | null, lng?: number | null, address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null } | null };

export type ProjectListQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ProjectFilterType>;
  page: PageType;
}>;


export type ProjectListQuery = { __typename?: 'Query', projectList?: { __typename?: 'ProjectListType', pageCount?: number | null, count?: number | null, data?: Array<{ __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, dateStart?: any | null, dateEnd?: any | null, capacity?: { __typename?: 'CapacityQueryType', id: string, male: number, female: number, child: number } | null, tags: Array<{ __typename?: 'TagQueryType', id: string, name?: string | null }>, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', small?: string | null } | null> | null } | null } | null> | null } | null };

export type ProjectTransactionDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type ProjectTransactionDetailQuery = { __typename?: 'Query', projectTransactionDetail?: { __typename?: 'ProjectTransactionQueryType', id: string, dateEnd?: any | null, dateStart?: any | null, owner?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, firstname?: string | null } | null, guestSet?: Array<{ __typename?: 'GuestQueryType', name?: string | null } | null> | null, project?: { __typename?: 'ProjectQueryType', id: string, tax?: number | null, name?: string | null, price?: number | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null } | null } | null } | null };

export type ProjectTransactionListQueryVariables = Exact<{
  page?: InputMaybe<PageType>;
  filter?: InputMaybe<ProjectTransactionFilterType>;
}>;


export type ProjectTransactionListQuery = { __typename?: 'Query', projectTransactionList?: { __typename?: 'ProjectTransactionListType', count?: number | null, pageCount?: number | null, data?: Array<{ __typename?: 'ProjectTransactionQueryType', id: string, dateEnd?: any | null, dateStart?: any | null, description?: string | null, invoiceNumber?: any | null, createdDate?: any | null, owner?: { __typename?: 'UserQueryType', id: string, fullname?: string | null, firstname?: string | null } | null, status?: { __typename?: 'StatusQueryType', step?: string | null, isActive?: boolean | null } | null, guestSet?: Array<{ __typename?: 'GuestQueryType', name?: string | null } | null> | null, project?: { __typename?: 'ProjectQueryType', id: string, name?: string | null, tax?: number | null, price?: number | null, description?: string | null, facilities?: Array<{ __typename?: 'ProjectFacilityQueryType', id: string, enName?: string | null } | null> | null, accommodation?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, lat?: number | null, lng?: number | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', small?: string | null } | null> | null } | null } | null } | null> | null } | null };

export type SettingDetailQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SettingDetailQuery = { __typename?: 'Query', settingDetail?: { __typename?: 'SettingDetailType', language: AccountSettingLanguageChoices } | null };

export type TagListQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<PageType>;
}>;


export type TagListQuery = { __typename?: 'Query', tagList?: { __typename?: 'TagListType', count?: number | null, pageCount?: number | null, data?: Array<{ __typename?: 'TagQueryType', id: string, name?: string | null, displayName?: string | null } | null> | null } | null };

export type TourListQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TourFilterType>;
  page: PageType;
}>;


export type TourListQuery = { __typename?: 'Query', tourList?: { __typename?: 'TourListType', data?: Array<{ __typename?: 'TourQueryType', id: string, title: string, description: string, startTime: any, endTime: any, NGO: { __typename?: 'NGOQueryType', id: string, user?: { __typename?: 'UserQueryType', id: string, phoneNumber?: string | null } | null, tourSet?: Array<{ __typename?: 'TourQueryType', id: string, title: string, packages: Array<{ __typename?: 'TourPackageType', id: string, title?: string | null, price: number }>, destination?: { __typename?: 'AccommodationQueryType', address?: string | null, avatarS3?: Array<{ __typename?: 'AccommodationImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | { __typename?: 'ProjectQueryType' } | null } | null> | null }, capacity?: { __typename?: 'TourCapacityType', id: string, male: number, female: number, child: number } | null, facilities?: Array<{ __typename?: 'TourFacilityQueryType', id: string, enName?: string | null, faName?: string | null, arName?: string | null } | null> | null, destination?: { __typename?: 'AccommodationQueryType', id: string, address?: string | null, lat?: number | null, lng?: number | null } | { __typename?: 'ProjectQueryType' } | null, packages: Array<{ __typename?: 'TourPackageType', id: string, title?: string | null, price: number }>, avatarS3?: Array<{ __typename?: 'TourImageType', medium?: string | null, large?: string | null, small?: string | null } | null> | null } | null> | null } | null };

export type UserDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDetailQuery = { __typename?: 'Query', userDetail?: { __typename?: 'UserQueryType', id: string, username: string, firstname?: string | null, fullname?: string | null, email: string, bio?: string | null, phoneNumber?: string | null, isNgo?: boolean | null, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null, setting?: { __typename?: 'SettingDetailType', language: AccountSettingLanguageChoices } | null, ngo?: { __typename?: 'NGOQueryType', id: string } | null } | null };


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
export const ProjectTransactionAddDocument = gql`
    mutation projectTransactionAdd($data: ProjectTransactionAddInputType!) {
  projectTransactionAdd(data: $data) {
    status
    statusCode
    message
    metadata
    __typename
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
export const UserGetTokenDocument = gql`
    mutation userGetToken($code: Int!, $phoneNumber: String!) {
  userGetToken(code: $code, phoneNumber: $phoneNumber) {
    __typename
    ... on ResponseWithToken {
      message
      metadata
      refreshToken
      status
      statusCode
      token
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
  categoryList(search: $search) {
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
export const MyNgoDetailDocument = gql`
    query myNGODetail {
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
      origin {
        ... on AccommodationQueryType {
          id
        }
        ... on ProjectQueryType {
          id
        }
      }
      destination {
        ... on AccommodationQueryType {
          id
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
export const NgoDetailDocument = gql`
    query NGODetail($pk: ID!) {
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
      avatarS3 {
        large
        medium
        small
      }
    }
    tourSet {
      id
      title
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
      status
      createdTime
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
export function useNgoDetailQuery(baseOptions: Apollo.QueryHookOptions<NgoDetailQuery, NgoDetailQueryVariables>) {
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
    description
    tags {
      id
      name
    }
    capacity {
      id
      male
      child
      female
    }
    facilities {
      id
      enName
      faName
      arName
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
    query projectList($search: String, $filter: ProjectFilterType, $page: PageType!) {
  projectList(search: $search, filter: $filter, page: $page) {
    pageCount
    count
    data {
      id
      name
      price
      dateStart
      dateEnd
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
    owner {
      id
      fullname
      firstname
    }
    guestSet {
      name
    }
    project {
      id
      tax
      name
      price
      accommodation {
        id
        address
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
      guestSet {
        name
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
export const TourListDocument = gql`
    query tourList($search: String, $filter: TourFilterType, $page: PageType!) {
  tourList(search: $search, filter: $filter, page: $page) {
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
          phoneNumber
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
export const UserDetailDocument = gql`
    query userDetail {
  userDetail {
    id
    username
    firstname
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