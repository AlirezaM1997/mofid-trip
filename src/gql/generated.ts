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
  DateTime: { input: any; output: any; }
  GenericScalar: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Input type for adding a new accommodation. */
export type AccommodationAddInputType = {
  /** Address of the accommodation. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** List of base64-encoded images. */
  base64Images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Description of the accommodation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Latitude of the accommodation. */
  lat: Scalars['Float']['input'];
  /** Longitude of the accommodation. */
  lng: Scalars['Float']['input'];
  /** Name of the accommodation. */
  name: Scalars['String']['input'];
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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  projectSet: Array<NgoProjectType>;
  user?: Maybe<UserListType>;
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
  projectSet: Array<NgoProjectType>;
};

export type DateRangeType = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

/** Type representing a Facility model. */
export type FacilityQueryType = {
  __typename?: 'FacilityQueryType';
  arName?: Maybe<Scalars['String']['output']>;
  enName?: Maybe<Scalars['String']['output']>;
  faName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  projectSet: Array<NgoProjectType>;
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
  /** Name of the NGO. */
  name?: InputMaybe<Scalars['String']['input']>;
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
  /** Name of the NGO. */
  name: Scalars['String']['input'];
  /** Phone number of the NGO. */
  phoneNumber: Scalars['String']['input'];
};

/** Type representing an NGO with additional fields. */
export type NgoListType = {
  __typename?: 'NGOListType';
  address?: Maybe<Scalars['String']['output']>;
  /** NGO avatar image. */
  avatarS3?: Maybe<NgoImageType>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  /** List of projects associated with the NGO. */
  projectSet?: Maybe<Array<Maybe<NgoProjectType>>>;
  tours: Array<TourQueryType>;
  user?: Maybe<UserListType>;
};

/** Type representing an accommodation associated with an NGO project. */
export type NgoProjectAccommodationType = {
  __typename?: 'NGOProjectAccommodationType';
  address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  projectSet: Array<NgoProjectType>;
  user?: Maybe<UserListType>;
};

/** Type representing an NGO project with additional fields. */
export type NgoProjectType = {
  __typename?: 'NGOProjectType';
  /** List of accommodations associated with the project. */
  accommodation?: Maybe<Array<Maybe<NgoProjectAccommodationType>>>;
  capacity?: Maybe<CapacityQueryType>;
  /** Reserved capacity for the project. */
  capacityReserved?: Maybe<Scalars['Int']['output']>;
  categories: Array<CategoryQueryType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<UserListType>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  facilities: Array<FacilityQueryType>;
  gender: AccommodationProjectGenderChoices;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  requestFrom: AccommodationProjectRequestFromChoices;
  status: AccommodationProjectStatusChoices;
  tags: Array<TagType>;
  tax?: Maybe<Scalars['Int']['output']>;
  tours: Array<TourQueryType>;
  transactionSet: Array<ProjectTransactionQueryType>;
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
export type ProjectPageType = {
  __typename?: 'ProjectPageType';
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
  creator?: Maybe<UserListType>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** List of facilities associated with the project. */
  facilities?: Maybe<Array<Maybe<FacilityQueryType>>>;
  /** Free capacity information associated with the project. */
  freeCapacity?: Maybe<CapacityReserveType>;
  gender: AccommodationProjectGenderChoices;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  requestFrom: AccommodationProjectRequestFromChoices;
  status: AccommodationProjectStatusChoices;
  tags: Array<TagType>;
  tax?: Maybe<Scalars['Int']['output']>;
  tours: Array<TourQueryType>;
  transactionSet: Array<ProjectTransactionQueryType>;
  /** Type of the project. */
  type?: Maybe<Scalars['String']['output']>;
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

/** Type representing a Project Transaction model with additional fields. */
export type ProjectTransactionQueryType = {
  __typename?: 'ProjectTransactionQueryType';
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoiceNumber?: Maybe<Scalars['UUID']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  owner?: Maybe<UserListType>;
  project?: Maybe<NgoProjectType>;
  /** Transaction status information. */
  status?: Maybe<StatusQueryType>;
};

export type Query = {
  __typename?: 'Query';
  NGODetail?: Maybe<NgoListType>;
  NGOList?: Maybe<Array<Maybe<NgoListType>>>;
  accommodationDetail?: Maybe<AccommodationQueryType>;
  accommodationList?: Maybe<Array<Maybe<AccommodationQueryType>>>;
  bannerDetail?: Maybe<BannerQueryType>;
  bannerList?: Maybe<Array<Maybe<BannerQueryType>>>;
  categoryList?: Maybe<Array<Maybe<CategoryQueryType>>>;
  facilityList?: Maybe<Array<Maybe<FacilityQueryType>>>;
  projectDetail?: Maybe<ProjectQueryType>;
  projectList?: Maybe<ProjectPageType>;
  projectTransactionDetail?: Maybe<ProjectTransactionQueryType>;
  projectTransactionList?: Maybe<Array<Maybe<ProjectTransactionQueryType>>>;
  settingDetail?: Maybe<SettingDetailType>;
  tagList?: Maybe<Array<Maybe<TagListType>>>;
  tourDetail?: Maybe<TourQueryType>;
  tourList?: Maybe<TourPageType>;
  tourTransactionDetail?: Maybe<TourTransactionQueryType>;
  tourTransactionList?: Maybe<Array<Maybe<TourTransactionQueryType>>>;
  userDetail?: Maybe<UserListType>;
  userList?: Maybe<Array<Maybe<UserListType>>>;
};


export type QueryNgoDetailArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNgoListArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAccommodationDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryAccommodationListArgs = {
  filter?: InputMaybe<AccommodationFilterType>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBannerDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryBannerListArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoryListArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFacilityListArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProjectDetailArgs = {
  pk: Scalars['ID']['input'];
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
};


export type QuerySettingDetailArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTagListArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTourDetailArgs = {
  pk: Scalars['ID']['input'];
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
};


export type QueryUserDetailArgs = {
  dimension?: InputMaybe<Scalars['String']['input']>;
  pk?: InputMaybe<Scalars['ID']['input']>;
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

/** Type representing a list of tags with additional fields. */
export type TagListType = {
  __typename?: 'TagListType';
  /** Display name of the tag. */
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Name of the tag. */
  name?: Maybe<Scalars['String']['output']>;
  projectSet: Array<NgoProjectType>;
};

/** Type representing a single tag. */
export type TagType = {
  __typename?: 'TagType';
  id: Scalars['ID']['output'];
  /** Name of the tag. */
  name?: Maybe<Scalars['String']['output']>;
};

/** Type representing tour capacity with additional fields. */
export type TourCapacityType = {
  __typename?: 'TourCapacityType';
  child: Scalars['Int']['output'];
  female: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  male: Scalars['Int']['output'];
};

/** Type representing tour facilities with additional fields. */
export type TourFacilityType = {
  __typename?: 'TourFacilityType';
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

/** Input type for providing guest information in a tour transaction. */
export type TourGuestInputType = {
  /** Birthday of the guest. */
  birthday: Scalars['String']['input'];
  /** Gender of the guest. */
  gender: GuestGenderEnum;
  /** Identification number of the guest. */
  identifyNumber: Scalars['String']['input'];
  /** Base64-encoded image of the guest's identification. */
  identifyPicture?: InputMaybe<Scalars['String']['input']>;
  /** Name of the guest. */
  name: Scalars['String']['input'];
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
export type TourPageType = {
  __typename?: 'TourPageType';
  /** Total count of tours. */
  count?: Maybe<Scalars['Int']['output']>;
  /** List of tour data. */
  data?: Maybe<Array<Maybe<TourQueryType>>>;
  /** Number of pages. */
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** Type representing tour prices with additional fields. */
export type TourPriceType = {
  __typename?: 'TourPriceType';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

/** Type representing a tour with additional fields. */
export type TourQueryType = {
  __typename?: 'TourQueryType';
  NGO: NgoListType;
  /** Tour avatar images in different sizes. */
  avatarS3?: Maybe<Array<Maybe<TourImageType>>>;
  /** Tour capacity information. */
  capacity?: Maybe<TourCapacityType>;
  endTime: Scalars['DateTime']['output'];
  /** List of tour facilities. */
  facilities?: Maybe<Array<Maybe<TourFacilityType>>>;
  id: Scalars['ID']['output'];
  longDescription: Scalars['String']['output'];
  /** List of tour prices. */
  price?: Maybe<Array<Maybe<TourPriceType>>>;
  prices: Array<TourPriceType>;
  projects: Array<NgoProjectType>;
  shortDescription: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
  termsRules: Scalars['String']['output'];
  title: Scalars['String']['output'];
  tourtransactionSet: Array<TourTransactionQueryType>;
};

/** Input type for updating the status of a tour transaction. */
export type TourStatusInputType = {
  /** New active status for the transaction. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** New step/status for the transaction. */
  step?: InputMaybe<TransactionStatusEnum>;
};

/** Type representing the status of a tour transaction. */
export type TourStatusQueryType = {
  __typename?: 'TourStatusQueryType';
  /** Indicates if the transaction is active. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** Current step/status of the transaction. */
  step?: Maybe<Scalars['String']['output']>;
};

/** Input type for adding a new tour transaction. */
export type TourTransactionAddInputType = {
  /** End date of the transaction. */
  dateEnd: Scalars['String']['input'];
  /** Start date of the transaction. */
  dateStart: Scalars['String']['input'];
  /** Description of the transaction. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** List of guests in the transaction. */
  guests?: InputMaybe<Array<InputMaybe<TourGuestInputType>>>;
  /** ID of the associated tour. */
  tourId: Scalars['ID']['input'];
};

/** Input type for editing a tour transaction. */
export type TourTransactionEditInputType = {
  /** New status information for the transaction. */
  status?: InputMaybe<TourStatusInputType>;
  /** ID of the transaction to edit. */
  transactionId: Scalars['ID']['input'];
};

/** Input type for filtering tour transactions by status step. */
export type TourTransactionFilterType = {
  /** Filter by status step. */
  statusStep?: InputMaybe<TransactionStatusEnum>;
};

/** Type representing a tour transaction with additional fields. */
export type TourTransactionQueryType = {
  __typename?: 'TourTransactionQueryType';
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoiceNumber?: Maybe<Scalars['UUID']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  owner?: Maybe<UserListType>;
  /** Status information for the transaction. */
  status?: Maybe<TourStatusQueryType>;
  tour?: Maybe<TourQueryType>;
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
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** Last name of the user. */
  lastName?: InputMaybe<Scalars['String']['input']>;
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
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** Last name of the user. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Phone number of the user. */
  phoneNumber: Scalars['String']['input'];
};

/** Type representing a list of users with additional fields. */
export type UserListType = {
  __typename?: 'UserListType';
  accommodationSet: Array<NgoProjectAccommodationType>;
  /** User avatar image in different sizes. */
  avatarS3?: Maybe<UserImageType>;
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isNgo?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  ngo?: Maybe<NgoListType>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  projectSet: Array<NgoProjectType>;
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
