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

export type AccommodationAddInputType = {
  address?: InputMaybe<Scalars['String']['input']>;
  base64Images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type AccommodationEditInputType = {
  address?: InputMaybe<Scalars['String']['input']>;
  base64Images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pk: Scalars['ID']['input'];
};

export type AccommodationFilterType = {
  mine?: InputMaybe<Triple_Choice>;
};

export type AccommodationImageType = {
  __typename?: 'AccommodationImageType';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type AccommodationListType = {
  __typename?: 'AccommodationListType';
  address?: Maybe<Scalars['String']['output']>;
  avatarS3?: Maybe<Array<Maybe<AccommodationImageType>>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserListType>;
};

export type AccommodationType = {
  __typename?: 'AccommodationType';
  address?: Maybe<Scalars['String']['output']>;
  avatarS3?: Maybe<Array<Maybe<ImageType>>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserListType>;
};

export type BBoxRangeType = {
  latHigh?: InputMaybe<Scalars['Float']['input']>;
  latLow?: InputMaybe<Scalars['Float']['input']>;
  lngHigh?: InputMaybe<Scalars['Float']['input']>;
  lngLow?: InputMaybe<Scalars['Float']['input']>;
};

export type BackendVersion = {
  __typename?: 'BackendVersion';
  buildNumber?: Maybe<Scalars['String']['output']>;
  currentVersion?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Scalars['GenericScalar']['output']>;
};

export type BannerImageType = {
  __typename?: 'BannerImageType';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type BannerListType = {
  __typename?: 'BannerListType';
  avatarS3?: Maybe<BannerImageType>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type CapacityReserveType = {
  __typename?: 'CapacityReserveType';
  child?: Maybe<Scalars['Int']['output']>;
  female?: Maybe<Scalars['Int']['output']>;
  male?: Maybe<Scalars['Int']['output']>;
};

export type CapacityType = {
  __typename?: 'CapacityType';
  child: Scalars['Int']['output'];
  female: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  male: Scalars['Int']['output'];
};

export type CategoryImageType = {
  __typename?: 'CategoryImageType';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type CategoryListType = {
  __typename?: 'CategoryListType';
  avatarS3?: Maybe<CategoryImageType>;
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  projectSet: Array<ProjectQueryType>;
};

export type CategoryType = {
  __typename?: 'CategoryType';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type DateRangeType = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type FacilityType = {
  __typename?: 'FacilityType';
  arName?: Maybe<Scalars['String']['output']>;
  enName?: Maybe<Scalars['String']['output']>;
  faName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  projectSet: Array<ProjectQueryType>;
};

export type FrontendVersion = {
  __typename?: 'FrontendVersion';
  buildNumber?: Maybe<Scalars['String']['output']>;
  currentVersion?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Scalars['GenericScalar']['output']>;
};

/** An enumeration. */
export enum GuestGender {
  /** CHILD */
  Child = 'CHILD',
  /** FEMALE */
  Female = 'FEMALE',
  /** MALE */
  Male = 'MALE'
}

export type GuestImageType = {
  __typename?: 'GuestImageType';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type GuestInputType = {
  birthday: Scalars['String']['input'];
  gender: Gender;
  identifyNumber: Scalars['String']['input'];
  identifyPicture?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type GuestType = {
  __typename?: 'GuestType';
  avatarS3?: Maybe<GuestImageType>;
  birthday?: Maybe<Scalars['Date']['output']>;
  gender: GuestGender;
  identifyNumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ImageType = {
  __typename?: 'ImageType';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type IntRangeType = {
  high?: InputMaybe<Scalars['Int']['input']>;
  low?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  NGOEdit?: Maybe<ResponseType>;
  login?: Maybe<ResponseType>;
  projectAdd?: Maybe<ResponseType>;
  projectEdit?: Maybe<ResponseType>;
  refreshToken?: Maybe<Refresh>;
  settingEdit?: Maybe<ResponseType>;
  userAccommodationAdd?: Maybe<ResponseType>;
  userAccommodationEdit?: Maybe<ResponseType>;
  userCheckSmsVerificationCode?: Maybe<ResponseType>;
  userEdit?: Maybe<ResponseType>;
  userLogout?: Maybe<ResponseType>;
  userTourTransactionAdd?: Maybe<ResponseType>;
  userTourTransactionEdit?: Maybe<ResponseType>;
  userTransactionAdd?: Maybe<ResponseType>;
  userTransactionEdit?: Maybe<ResponseType>;
  verifyToken?: Maybe<Verify>;
};


export type MutationNgoEditArgs = {
  data?: InputMaybe<NgoEditInputType>;
};


export type MutationLoginArgs = {
  dataNgo?: InputMaybe<NgoInputType>;
  dataUser?: InputMaybe<UserInputType>;
};


export type MutationProjectAddArgs = {
  data: ProjectAddInputType;
};


export type MutationProjectEditArgs = {
  data: ProjectEditInputType;
};


export type MutationRefreshTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSettingEditArgs = {
  data?: InputMaybe<SettingEditInputType>;
};


export type MutationUserAccommodationAddArgs = {
  data?: InputMaybe<AccommodationAddInputType>;
};


export type MutationUserAccommodationEditArgs = {
  data: AccommodationEditInputType;
};


export type MutationUserCheckSmsVerificationCodeArgs = {
  code: Scalars['Int']['input'];
  phoneNumber: Scalars['String']['input'];
};


export type MutationUserEditArgs = {
  data?: InputMaybe<UserEditInputType>;
};


export type MutationUserTourTransactionAddArgs = {
  data: TourTransactionAddInputType;
};


export type MutationUserTourTransactionEditArgs = {
  data: TourTransactionEditInputType;
};


export type MutationUserTransactionAddArgs = {
  data: TransactionAddInputType;
};


export type MutationUserTransactionEditArgs = {
  data: TransactionEditInputType;
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type NgoDetailType = {
  __typename?: 'NGODetailType';
  address?: Maybe<Scalars['String']['output']>;
  avatarS3?: Maybe<NgoImageType>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  tours: Array<TourTypes>;
  user?: Maybe<UserListType>;
};

export type NgoEditInputType = {
  address?: InputMaybe<Scalars['String']['input']>;
  base64Image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type NgoImageType = {
  __typename?: 'NGOImageType';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type NgoInputType = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type NgoListType = {
  __typename?: 'NGOListType';
  address?: Maybe<Scalars['String']['output']>;
  avatarBase64?: Maybe<NgoImageType>;
  avatarS3?: Maybe<NgoImageType>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  projectSet?: Maybe<Array<Maybe<NgoProjectType>>>;
  tours: Array<TourTypes>;
  user?: Maybe<UserListType>;
};

export type NgoProjectAccommodationType = {
  __typename?: 'NGOProjectAccommodationType';
  address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserListType>;
};

export type NgoProjectFacilityType = {
  __typename?: 'NGOProjectFacilityType';
  arName?: Maybe<Scalars['String']['output']>;
  enName?: Maybe<Scalars['String']['output']>;
  faName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  projectSet: Array<ProjectQueryType>;
};

export type NgoProjectType = {
  __typename?: 'NGOProjectType';
  accommodation?: Maybe<Array<Maybe<NgoProjectAccommodationType>>>;
  capacity?: Maybe<CapacityType>;
  capacityReserved?: Maybe<Scalars['Int']['output']>;
  categories: Array<CategoryType>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<UserListType>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  facilities?: Maybe<Array<Maybe<NgoProjectFacilityType>>>;
  gender: ProjectGender;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  objectId?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  requestFrom: ProjectRequestFrom;
  status: ProjectStatus;
  tags: Array<TagType>;
  tax?: Maybe<Scalars['Int']['output']>;
  tours: Array<TourTypes>;
  transactionSet: Array<UserTransactionQueryType>;
};

export type NgoTransactionFilterType = {
  statusStep?: InputMaybe<Transaction_Status>;
};

export type NgoTransactionQueryType = {
  __typename?: 'NgoTransactionQueryType';
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  guestSet: Array<GuestType>;
  id: Scalars['ID']['output'];
  invoiceNumber?: Maybe<Scalars['UUID']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  owner?: Maybe<UserListType>;
  project?: Maybe<ProjectQueryType>;
  statusActivation: Scalars['Boolean']['output'];
  statusStep?: Maybe<TransactionStatusStep>;
};

export type PageType = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectAddInputType = {
  base64Image?: InputMaybe<Scalars['String']['input']>;
  capacity: Scalars['Int']['input'];
  dateEnd: Scalars['String']['input'];
  dateStart: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  facilities?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  gender: Project_Gender;
  name: Scalars['String']['input'];
  objectId: Scalars['ID']['input'];
  objectType: Object_Type;
  price: Scalars['Int']['input'];
  requestFrom: Request_From;
};

export type ProjectAvatarDimensions = {
  height?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectEditInputType = {
  base64Image?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  facilities?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  gender?: InputMaybe<Project_Gender>;
  name?: InputMaybe<Scalars['String']['input']>;
  pk: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
  requestFrom?: InputMaybe<Request_From>;
  status?: InputMaybe<Project_Status>;
};

export type ProjectFilterType = {
  bbox?: InputMaybe<BBoxRangeType>;
  capacity?: InputMaybe<IntRangeType>;
  categories?: InputMaybe<Array<InputMaybe<Project_Category>>>;
  creator?: InputMaybe<Array<InputMaybe<Creator>>>;
  dateRange?: InputMaybe<DateRangeType>;
  gender?: InputMaybe<Array<InputMaybe<Project_Gender>>>;
  objectId?: InputMaybe<Scalars['ID']['input']>;
  objectType?: InputMaybe<Object_Type>;
  price?: InputMaybe<IntRangeType>;
  status?: InputMaybe<Array<InputMaybe<Project_Status>>>;
  tags?: InputMaybe<Array<InputMaybe<Tag>>>;
};

/** An enumeration. */
export enum ProjectGender {
  /** BOTH */
  Both = 'BOTH',
  /** FEMALE */
  Female = 'FEMALE',
  /** MALE */
  Male = 'MALE'
}

export type ProjectQueryType = {
  __typename?: 'ProjectQueryType';
  accommodation?: Maybe<AccommodationType>;
  capacity?: Maybe<CapacityType>;
  capacityReserved?: Maybe<CapacityReserveType>;
  categories?: Maybe<Array<Maybe<CategoryType>>>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<UserListType>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  facilities?: Maybe<Array<Maybe<FacilityType>>>;
  freeCapacity?: Maybe<CapacityReserveType>;
  gender: ProjectGender;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  objectId?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  requestFrom: ProjectRequestFrom;
  status: ProjectStatus;
  tags: Array<TagType>;
  tax?: Maybe<Scalars['Int']['output']>;
  tours?: Maybe<Array<Maybe<TourTypes>>>;
  transactionSet: Array<UserTransactionQueryType>;
  type?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
export enum ProjectRequestFrom {
  /** BOTH */
  Both = 'BOTH',
  /** NGO */
  Ngo = 'NGO',
  /** USER */
  User = 'USER'
}

export type ProjectSetType = {
  __typename?: 'ProjectSetType';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<ProjectQueryType>>>;
  pageCount?: Maybe<Scalars['Int']['output']>;
};

/** An enumeration. */
export enum ProjectStatus {
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

export type Query = {
  __typename?: 'Query';
  NGODetail?: Maybe<NgoDetailType>;
  NGOList?: Maybe<Array<Maybe<NgoListType>>>;
  accommodationDetail?: Maybe<AccommodationListType>;
  accommodationSet?: Maybe<Array<Maybe<AccommodationListType>>>;
  bannerDetail?: Maybe<BannerListType>;
  bannerList?: Maybe<Array<Maybe<BannerListType>>>;
  categoryList?: Maybe<Array<Maybe<CategoryListType>>>;
  facilityList?: Maybe<Array<Maybe<FacilityType>>>;
  ngoTransactionDetail?: Maybe<NgoTransactionQueryType>;
  ngoTransactionList?: Maybe<Array<Maybe<NgoTransactionQueryType>>>;
  projectDetail?: Maybe<ProjectQueryType>;
  projectSet?: Maybe<ProjectSetType>;
  settingDetail?: Maybe<SettingDetailType>;
  tagList?: Maybe<Array<Maybe<TagListType>>>;
  tourDetail?: Maybe<TourTypes>;
  tourList?: Maybe<TourListType>;
  userDetail?: Maybe<UserListType>;
  userList?: Maybe<Array<Maybe<UserListType>>>;
  userTourTransactionDetail?: Maybe<UserTourTransactionQueryType>;
  userTourTransactionList?: Maybe<Array<Maybe<UserTourTransactionQueryType>>>;
  userTransactionDetail?: Maybe<UserTransactionQueryType>;
  userTransactionList?: Maybe<Array<Maybe<UserTransactionQueryType>>>;
  version?: Maybe<VersionType>;
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


export type QueryAccommodationSetArgs = {
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


export type QueryNgoTransactionDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryNgoTransactionListArgs = {
  filter?: InputMaybe<NgoTransactionFilterType>;
};


export type QueryProjectDetailArgs = {
  dimension?: InputMaybe<ProjectAvatarDimensions>;
  pk: Scalars['ID']['input'];
};


export type QueryProjectSetArgs = {
  filter?: InputMaybe<ProjectFilterType>;
  page?: InputMaybe<PageType>;
  search?: InputMaybe<Scalars['String']['input']>;
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


export type QueryUserDetailArgs = {
  pk?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserTourTransactionDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryUserTourTransactionListArgs = {
  filter?: InputMaybe<UserTourTransactionFilterType>;
};


export type QueryUserTransactionDetailArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryUserTransactionListArgs = {
  filter?: InputMaybe<UserTransactionFilterType>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type ResponseBase = {
  __typename?: 'ResponseBase';
  message?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['GenericScalar']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

/** use for dynamic outputs in mutations. */
export type ResponseType = ResponseBase | ResponseWithToken;

export type ResponseWithToken = {
  __typename?: 'ResponseWithToken';
  message?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['GenericScalar']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type SettingDetailType = {
  __typename?: 'SettingDetailType';
  language: SettingLanguage;
};

export type SettingEditInputType = {
  language?: InputMaybe<Language_Choice>;
};

/** An enumeration. */
export enum SettingLanguage {
  /** AR */
  Ar = 'AR',
  /** EN_US */
  EnUs = 'EN_US',
  /** FA_IR */
  FaIr = 'FA_IR'
}

export type StatusInputType = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  step?: InputMaybe<Transaction_Status>;
};

export type StatusQueryType = {
  __typename?: 'StatusQueryType';
  isActive?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['String']['output']>;
};

export type TagListType = {
  __typename?: 'TagListType';
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  projectSet: Array<ProjectQueryType>;
};

export type TagType = {
  __typename?: 'TagType';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type TourCapacityType = {
  __typename?: 'TourCapacityType';
  child: Scalars['Int']['output'];
  female: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  male: Scalars['Int']['output'];
};

export type TourFacilitType = {
  __typename?: 'TourFacilitType';
  arName?: Maybe<Scalars['String']['output']>;
  enName?: Maybe<Scalars['String']['output']>;
  faName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type TourFilterType = {
  dateRange?: InputMaybe<DateRangeType>;
  price?: InputMaybe<IntRangeType>;
};

/** An enumeration. */
export enum TourGuestGender {
  /** CHILD */
  Child = 'CHILD',
  /** FEMALE */
  Female = 'FEMALE',
  /** MALE */
  Male = 'MALE'
}

export type TourGuestImageType = {
  __typename?: 'TourGuestImageType';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type TourGuestInputType = {
  birthday: Scalars['String']['input'];
  gender: Gender;
  identifyNumber: Scalars['String']['input'];
  identifyPicture?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type TourGuestType = {
  __typename?: 'TourGuestType';
  avatarS3?: Maybe<TourGuestImageType>;
  birthday?: Maybe<Scalars['Date']['output']>;
  gender: TourGuestGender;
  identifyNumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type TourImageType = {
  __typename?: 'TourImageType';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type TourListType = {
  __typename?: 'TourListType';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<TourTypes>>>;
  pageCount?: Maybe<Scalars['Int']['output']>;
};

export type TourPriceType = {
  __typename?: 'TourPriceType';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type TourStatusInputType = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  step?: InputMaybe<Transaction_Status>;
};

export type TourStatusQueryType = {
  __typename?: 'TourStatusQueryType';
  isActive?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['String']['output']>;
};

export type TourTransactionAddInputType = {
  dateEnd: Scalars['String']['input'];
  dateStart: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  guests?: InputMaybe<Array<InputMaybe<TourGuestInputType>>>;
  tourId: Scalars['ID']['input'];
};

export type TourTransactionEditInputType = {
  status?: InputMaybe<TourStatusInputType>;
  transactionId: Scalars['ID']['input'];
};

export type TourTypes = {
  __typename?: 'TourTypes';
  NGO: NgoDetailType;
  avatarS3?: Maybe<Array<Maybe<TourImageType>>>;
  capacity?: Maybe<TourCapacityType>;
  endTime: Scalars['DateTime']['output'];
  facilities?: Maybe<Array<Maybe<TourFacilitType>>>;
  id: Scalars['ID']['output'];
  longDescription: Scalars['String']['output'];
  price?: Maybe<Array<Maybe<TourPriceType>>>;
  prices: Array<TourPriceType>;
  projects: Array<ProjectQueryType>;
  shortDescription: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
  termsRules: Scalars['String']['output'];
  title: Scalars['String']['output'];
  tourtransactionSet: Array<UserTourTransactionQueryType>;
};

export type TransactionAddInputType = {
  dateEnd: Scalars['String']['input'];
  dateStart: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  guests?: InputMaybe<Array<InputMaybe<GuestInputType>>>;
  projectId: Scalars['ID']['input'];
};

export type TransactionEditInputType = {
  status?: InputMaybe<StatusInputType>;
  transactionId: Scalars['ID']['input'];
};

/** An enumeration. */
export enum TransactionStatusStep {
  /** ACCEPT */
  Accept = 'ACCEPT',
  /** PAYMENT */
  Payment = 'PAYMENT',
  /** REQUEST */
  Request = 'REQUEST',
  /** SUCCESSFUL */
  Successful = 'SUCCESSFUL'
}

export type UserEditInputType = {
  base64Image?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type UserImageType = {
  __typename?: 'UserImageType';
  large?: Maybe<Scalars['String']['output']>;
  medium?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
};

export type UserInputType = {
  bio?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
};

export type UserListType = {
  __typename?: 'UserListType';
  accommodationSet: Array<AccommodationType>;
  avatarS3?: Maybe<UserImageType>;
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isNgo?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  ngo?: Maybe<NgoDetailType>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  projectSet: Array<ProjectQueryType>;
  setting?: Maybe<SettingDetailType>;
  smsActivationCode?: Maybe<Scalars['Int']['output']>;
  tourtransactionSet: Array<UserTourTransactionQueryType>;
  transactionSet: Array<UserTransactionQueryType>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String']['output'];
};

export type UserTourTransactionFilterType = {
  statusStep?: InputMaybe<Transaction_Status>;
};

export type UserTourTransactionQueryType = {
  __typename?: 'UserTourTransactionQueryType';
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoiceNumber?: Maybe<Scalars['UUID']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  owner?: Maybe<UserListType>;
  status?: Maybe<TourStatusQueryType>;
  tour?: Maybe<TourTypes>;
  tourguestSet: Array<TourGuestType>;
};

export type UserTransactionFilterType = {
  statusStep?: InputMaybe<Transaction_Status>;
};

export type UserTransactionQueryType = {
  __typename?: 'UserTransactionQueryType';
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  dateEnd?: Maybe<Scalars['DateTime']['output']>;
  dateStart?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  guestSet: Array<GuestType>;
  id: Scalars['ID']['output'];
  invoiceNumber?: Maybe<Scalars['UUID']['output']>;
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  owner?: Maybe<UserListType>;
  project?: Maybe<ProjectQueryType>;
  status?: Maybe<StatusQueryType>;
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar']['output'];
};

/** use for dynamic outputs in mutations. */
export type VersionType = BackendVersion | FrontendVersion;

/** An enumeration. */
export enum Creator {
  Me = 'ME',
  Others = 'OTHERS'
}

/** An enumeration. */
export enum Gender {
  Child = 'CHILD',
  Female = 'FEMALE',
  Male = 'MALE'
}

/** An enumeration. */
export enum Language_Choice {
  Ar = 'AR',
  EnUs = 'EN_US',
  FaIr = 'FA_IR'
}

/** An enumeration. */
export enum Object_Type {
  Accommodation = 'ACCOMMODATION',
  Project = 'PROJECT'
}

/** An enumeration. */
export enum Project_Category {
  Apartment = 'Apartment',
  Beachfront = 'Beachfront',
  Hussainiyah = 'Hussainiyah',
  Moukeb = 'Moukeb',
  Room = 'Room'
}

/** An enumeration. */
export enum Project_Gender {
  Both = 'BOTH',
  Female = 'FEMALE',
  Male = 'MALE'
}

/** An enumeration. */
export enum Project_Status {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  End = 'END',
  Initial = 'INITIAL',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** An enumeration. */
export enum Request_From {
  Both = 'BOTH',
  Ngo = 'NGO',
  User = 'USER'
}

/** An enumeration. */
export enum Tag {
  Discount = 'DISCOUNT',
  Economy = 'ECONOMY',
  Free = 'FREE',
  Luxe = 'LUXE',
  New = 'NEW',
  Trend = 'TREND'
}

/** An enumeration. */
export enum Transaction_Status {
  Accept = 'ACCEPT',
  Payment = 'PAYMENT',
  Request = 'REQUEST',
  Successful = 'SUCCESSFUL'
}

/** An enumeration. */
export enum Triple_Choice {
  False = 'FALSE',
  None = 'NONE',
  True = 'TRUE'
}

export type LoginMutationVariables = Exact<{
  dataUser?: InputMaybe<UserInputType>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename: 'ResponseBase', status?: string | null, message?: string | null, statusCode?: number | null, metadata?: any | null } | { __typename: 'ResponseWithToken', status?: string | null, statusCode?: number | null, message?: string | null, token?: string | null, refreshToken?: string | null, metadata?: any | null } | null };

export type SettingEditMutationVariables = Exact<{
  data?: InputMaybe<SettingEditInputType>;
}>;


export type SettingEditMutation = { __typename?: 'Mutation', settingEdit?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | { __typename: 'ResponseWithToken' } | null };

export type UserTransactionEditMutationVariables = Exact<{
  data: TransactionEditInputType;
}>;


export type UserTransactionEditMutation = { __typename?: 'Mutation', userTransactionEdit?: { __typename?: 'ResponseBase', message?: string | null, status?: string | null, statusCode?: number | null } | { __typename?: 'ResponseWithToken' } | null };

export type UserTransactionAddMutationVariables = Exact<{
  data: TransactionAddInputType;
}>;


export type UserTransactionAddMutation = { __typename?: 'Mutation', userTransactionAdd?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | { __typename: 'ResponseWithToken', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | null };

export type UserCheckSmsVerificationCodeMutationVariables = Exact<{
  code: Scalars['Int']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type UserCheckSmsVerificationCodeMutation = { __typename?: 'Mutation', userCheckSmsVerificationCode?: { __typename: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null, metadata?: any | null } | { __typename: 'ResponseWithToken', status?: string | null, statusCode?: number | null, message?: string | null, token?: string | null, refreshToken?: string | null, metadata?: any | null } | null };

export type UserEditMutationVariables = Exact<{
  data?: InputMaybe<UserEditInputType>;
}>;


export type UserEditMutation = { __typename?: 'Mutation', userEdit?: { __typename?: 'ResponseBase', status?: string | null, statusCode?: number | null, message?: string | null } | { __typename?: 'ResponseWithToken', status?: string | null, statusCode?: number | null, message?: string | null } | null };

export type BannerListQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type BannerListQuery = { __typename?: 'Query', bannerList?: Array<{ __typename?: 'BannerListType', id: string, url?: string | null, title: string, avatarS3?: { __typename?: 'BannerImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null> | null };

export type CategoryListQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryListQuery = { __typename?: 'Query', categoryList?: Array<{ __typename?: 'CategoryListType', id: string, name?: string | null, displayName?: string | null, avatarS3?: { __typename?: 'CategoryImageType', large?: string | null, medium?: string | null, small?: string | null } | null } | null> | null };

export type ProjectDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type ProjectDetailQuery = { __typename?: 'Query', projectDetail?: { __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, gender: ProjectGender, description?: string | null, tags: Array<{ __typename?: 'TagType', id: string, name?: string | null }>, capacity?: { __typename?: 'CapacityType', id: string, male: number, child: number, female: number } | null, facilities?: Array<{ __typename?: 'FacilityType', id: string, enName?: string | null, faName?: string | null, arName?: string | null } | null> | null, creator?: { __typename?: 'UserListType', id: string, lastName: string, firstName: string, phoneNumber?: string | null, avatarS3?: { __typename?: 'UserImageType', small?: string | null } | null, projectSet: Array<{ __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, accommodation?: { __typename?: 'AccommodationType', id: string, name?: string | null, address?: string | null, avatarS3?: Array<{ __typename?: 'ImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null }> } | null, accommodation?: { __typename?: 'AccommodationType', id: string, lat?: number | null, lng?: number | null, name?: string | null, address?: string | null, description?: string | null, avatarS3?: Array<{ __typename?: 'ImageType', large?: string | null, medium?: string | null, small?: string | null } | null> | null } | null } | null };

export type ProjectSetQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ProjectFilterType>;
  page: PageType;
}>;


export type ProjectSetQuery = { __typename?: 'Query', projectSet?: { __typename?: 'ProjectSetType', pageCount?: number | null, count?: number | null, data?: Array<{ __typename?: 'ProjectQueryType', id: string, name?: string | null, price?: number | null, tags: Array<{ __typename?: 'TagType', id: string, name?: string | null }>, accommodation?: { __typename?: 'AccommodationType', id: string, address?: string | null, avatarS3?: Array<{ __typename?: 'ImageType', small?: string | null } | null> | null } | null } | null> | null } | null };

export type SettingDetailQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SettingDetailQuery = { __typename?: 'Query', settingDetail?: { __typename?: 'SettingDetailType', language: SettingLanguage } | null };

export type TagListQueryVariables = Exact<{ [key: string]: never; }>;


export type TagListQuery = { __typename?: 'Query', tagList?: Array<{ __typename?: 'TagListType', id: string, name?: string | null, displayName?: string | null } | null> | null };

export type TourListQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TourFilterType>;
  page: PageType;
}>;


export type TourListQuery = { __typename?: 'Query', tourList?: { __typename?: 'TourListType', data?: Array<{ __typename?: 'TourTypes', id: string, title: string, shortDescription: string, startTime: any, endTime: any, facilities?: Array<{ __typename?: 'TourFacilitType', id: string, enName?: string | null } | null> | null, price?: Array<{ __typename?: 'TourPriceType', title: string, price: number } | null> | null, avatarS3?: Array<{ __typename?: 'TourImageType', medium?: string | null, large?: string | null, small?: string | null } | null> | null } | null> | null } | null };

export type UserTransactionDetailQueryVariables = Exact<{
  pk: Scalars['ID']['input'];
}>;


export type UserTransactionDetailQuery = { __typename?: 'Query', userTransactionDetail?: { __typename?: 'UserTransactionQueryType', id: string, dateEnd?: any | null, dateStart?: any | null, owner?: { __typename?: 'UserListType', id: string, lastName: string, firstName: string } | null, guestSet: Array<{ __typename?: 'GuestType', name?: string | null }>, project?: { __typename?: 'ProjectQueryType', id: string, tax?: number | null, name?: string | null, price?: number | null, accommodation?: { __typename?: 'AccommodationType', id: string, address?: string | null } | null } | null } | null };

export type UserTransactionListQueryVariables = Exact<{ [key: string]: never; }>;


export type UserTransactionListQuery = { __typename?: 'Query', userTransactionList?: Array<{ __typename?: 'UserTransactionQueryType', id: string, dateEnd?: any | null, dateStart?: any | null, description?: string | null, invoiceNumber?: any | null, createdDate?: any | null, owner?: { __typename?: 'UserListType', id: string, lastName: string, firstName: string } | null, status?: { __typename?: 'StatusQueryType', step?: string | null, isActive?: boolean | null } | null, guestSet: Array<{ __typename?: 'GuestType', name?: string | null }>, project?: { __typename?: 'ProjectQueryType', id: string, name?: string | null, tax?: number | null, price?: number | null, description?: string | null, facilities?: Array<{ __typename?: 'FacilityType', id: string, enName?: string | null } | null> | null, accommodation?: { __typename?: 'AccommodationType', id: string, address?: string | null, lat?: number | null, lng?: number | null, avatarS3?: Array<{ __typename?: 'ImageType', small?: string | null } | null> | null } | null } | null } | null> | null };

export type UserDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDetailQuery = { __typename?: 'Query', userDetail?: { __typename?: 'UserListType', id: string, username: string, firstName: string, lastName: string, email: string, bio?: string | null, phoneNumber?: string | null, isNgo?: boolean | null, avatarS3?: { __typename?: 'UserImageType', large?: string | null, medium?: string | null, small?: string | null } | null, setting?: { __typename?: 'SettingDetailType', language: SettingLanguage } | null, ngo?: { __typename?: 'NGODetailType', id: string } | null } | null };

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version?: { __typename?: 'BackendVersion', currentVersion?: string | null } | { __typename?: 'FrontendVersion' } | null };


export const LoginDocument = gql`
    mutation login($dataUser: UserInputType) {
  login(dataUser: $dataUser) {
    __typename
    ... on ResponseBase {
      status
      message
      statusCode
      metadata
      __typename
    }
    ... on ResponseWithToken {
      status
      statusCode
      message
      token
      refreshToken
      metadata
      __typename
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      dataUser: // value for 'dataUser'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SettingEditDocument = gql`
    mutation settingEdit($data: SettingEditInputType) {
  settingEdit(data: $data) {
    ... on ResponseBase {
      status
      statusCode
      message
      metadata
    }
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
export const UserTransactionEditDocument = gql`
    mutation userTransactionEdit($data: TransactionEditInputType!) {
  userTransactionEdit(data: $data) {
    ... on ResponseBase {
      message
      status
      statusCode
    }
  }
}
    `;
export type UserTransactionEditMutationFn = Apollo.MutationFunction<UserTransactionEditMutation, UserTransactionEditMutationVariables>;

/**
 * __useUserTransactionEditMutation__
 *
 * To run a mutation, you first call `useUserTransactionEditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserTransactionEditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userTransactionEditMutation, { data, loading, error }] = useUserTransactionEditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserTransactionEditMutation(baseOptions?: Apollo.MutationHookOptions<UserTransactionEditMutation, UserTransactionEditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserTransactionEditMutation, UserTransactionEditMutationVariables>(UserTransactionEditDocument, options);
      }
export type UserTransactionEditMutationHookResult = ReturnType<typeof useUserTransactionEditMutation>;
export type UserTransactionEditMutationResult = Apollo.MutationResult<UserTransactionEditMutation>;
export type UserTransactionEditMutationOptions = Apollo.BaseMutationOptions<UserTransactionEditMutation, UserTransactionEditMutationVariables>;
export const UserTransactionAddDocument = gql`
    mutation userTransactionAdd($data: TransactionAddInputType!) {
  userTransactionAdd(data: $data) {
    __typename
    ... on ResponseWithToken {
      status
      statusCode
      message
      metadata
    }
    ... on ResponseBase {
      status
      statusCode
      message
      metadata
    }
  }
}
    `;
export type UserTransactionAddMutationFn = Apollo.MutationFunction<UserTransactionAddMutation, UserTransactionAddMutationVariables>;

/**
 * __useUserTransactionAddMutation__
 *
 * To run a mutation, you first call `useUserTransactionAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserTransactionAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userTransactionAddMutation, { data, loading, error }] = useUserTransactionAddMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserTransactionAddMutation(baseOptions?: Apollo.MutationHookOptions<UserTransactionAddMutation, UserTransactionAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserTransactionAddMutation, UserTransactionAddMutationVariables>(UserTransactionAddDocument, options);
      }
export type UserTransactionAddMutationHookResult = ReturnType<typeof useUserTransactionAddMutation>;
export type UserTransactionAddMutationResult = Apollo.MutationResult<UserTransactionAddMutation>;
export type UserTransactionAddMutationOptions = Apollo.BaseMutationOptions<UserTransactionAddMutation, UserTransactionAddMutationVariables>;
export const UserCheckSmsVerificationCodeDocument = gql`
    mutation userCheckSmsVerificationCode($code: Int!, $phoneNumber: String!) {
  userCheckSmsVerificationCode(code: $code, phoneNumber: $phoneNumber) {
    __typename
    ... on ResponseWithToken {
      status
      statusCode
      message
      token
      refreshToken
      metadata
    }
    ... on ResponseBase {
      status
      statusCode
      message
      metadata
    }
  }
}
    `;
export type UserCheckSmsVerificationCodeMutationFn = Apollo.MutationFunction<UserCheckSmsVerificationCodeMutation, UserCheckSmsVerificationCodeMutationVariables>;

/**
 * __useUserCheckSmsVerificationCodeMutation__
 *
 * To run a mutation, you first call `useUserCheckSmsVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCheckSmsVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCheckSmsVerificationCodeMutation, { data, loading, error }] = useUserCheckSmsVerificationCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUserCheckSmsVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<UserCheckSmsVerificationCodeMutation, UserCheckSmsVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserCheckSmsVerificationCodeMutation, UserCheckSmsVerificationCodeMutationVariables>(UserCheckSmsVerificationCodeDocument, options);
      }
export type UserCheckSmsVerificationCodeMutationHookResult = ReturnType<typeof useUserCheckSmsVerificationCodeMutation>;
export type UserCheckSmsVerificationCodeMutationResult = Apollo.MutationResult<UserCheckSmsVerificationCodeMutation>;
export type UserCheckSmsVerificationCodeMutationOptions = Apollo.BaseMutationOptions<UserCheckSmsVerificationCodeMutation, UserCheckSmsVerificationCodeMutationVariables>;
export const UserEditDocument = gql`
    mutation userEdit($data: UserEditInputType) {
  userEdit(data: $data) {
    ... on ResponseWithToken {
      status
      statusCode
      message
    }
    ... on ResponseBase {
      status
      statusCode
      message
    }
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
    query bannerList($search: String) {
  bannerList(search: $search) {
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
    query categoryList {
  categoryList {
    id
    name
    displayName
    avatarS3 {
      large
      medium
      small
    }
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
      lastName
      firstName
      phoneNumber
      avatarS3 {
        small
      }
      projectSet {
        id
        name
        price
        accommodation {
          id
          name
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
      name
      address
      description
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
export const ProjectSetDocument = gql`
    query projectSet($search: String, $filter: ProjectFilterType, $page: PageType!) {
  projectSet(search: $search, filter: $filter, page: $page) {
    pageCount
    count
    data {
      id
      name
      price
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
 * __useProjectSetQuery__
 *
 * To run a query within a React component, call `useProjectSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectSetQuery({
 *   variables: {
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useProjectSetQuery(baseOptions: Apollo.QueryHookOptions<ProjectSetQuery, ProjectSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectSetQuery, ProjectSetQueryVariables>(ProjectSetDocument, options);
      }
export function useProjectSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectSetQuery, ProjectSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectSetQuery, ProjectSetQueryVariables>(ProjectSetDocument, options);
        }
export type ProjectSetQueryHookResult = ReturnType<typeof useProjectSetQuery>;
export type ProjectSetLazyQueryHookResult = ReturnType<typeof useProjectSetLazyQuery>;
export type ProjectSetQueryResult = Apollo.QueryResult<ProjectSetQuery, ProjectSetQueryVariables>;
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
    query tagList {
  tagList {
    id
    name
    displayName
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
      shortDescription
      startTime
      endTime
      facilities {
        id
        enName
      }
      price {
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
export const UserTransactionDetailDocument = gql`
    query userTransactionDetail($pk: ID!) {
  userTransactionDetail(pk: $pk) {
    id
    dateEnd
    dateStart
    owner {
      id
      lastName
      firstName
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
 * __useUserTransactionDetailQuery__
 *
 * To run a query within a React component, call `useUserTransactionDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTransactionDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTransactionDetailQuery({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useUserTransactionDetailQuery(baseOptions: Apollo.QueryHookOptions<UserTransactionDetailQuery, UserTransactionDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTransactionDetailQuery, UserTransactionDetailQueryVariables>(UserTransactionDetailDocument, options);
      }
export function useUserTransactionDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTransactionDetailQuery, UserTransactionDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTransactionDetailQuery, UserTransactionDetailQueryVariables>(UserTransactionDetailDocument, options);
        }
export type UserTransactionDetailQueryHookResult = ReturnType<typeof useUserTransactionDetailQuery>;
export type UserTransactionDetailLazyQueryHookResult = ReturnType<typeof useUserTransactionDetailLazyQuery>;
export type UserTransactionDetailQueryResult = Apollo.QueryResult<UserTransactionDetailQuery, UserTransactionDetailQueryVariables>;
export const UserTransactionListDocument = gql`
    query userTransactionList {
  userTransactionList {
    id
    dateEnd
    dateStart
    description
    invoiceNumber
    createdDate
    owner {
      id
      lastName
      firstName
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
    `;

/**
 * __useUserTransactionListQuery__
 *
 * To run a query within a React component, call `useUserTransactionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTransactionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTransactionListQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTransactionListQuery(baseOptions?: Apollo.QueryHookOptions<UserTransactionListQuery, UserTransactionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTransactionListQuery, UserTransactionListQueryVariables>(UserTransactionListDocument, options);
      }
export function useUserTransactionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTransactionListQuery, UserTransactionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTransactionListQuery, UserTransactionListQueryVariables>(UserTransactionListDocument, options);
        }
export type UserTransactionListQueryHookResult = ReturnType<typeof useUserTransactionListQuery>;
export type UserTransactionListLazyQueryHookResult = ReturnType<typeof useUserTransactionListLazyQuery>;
export type UserTransactionListQueryResult = Apollo.QueryResult<UserTransactionListQuery, UserTransactionListQueryVariables>;
export const UserDetailDocument = gql`
    query userDetail {
  userDetail {
    id
    username
    firstName
    lastName
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
export const VersionDocument = gql`
    query version {
  version {
    ... on BackendVersion {
      currentVersion
    }
  }
}
    `;

/**
 * __useVersionQuery__
 *
 * To run a query within a React component, call `useVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useVersionQuery(baseOptions?: Apollo.QueryHookOptions<VersionQuery, VersionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VersionQuery, VersionQueryVariables>(VersionDocument, options);
      }
export function useVersionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VersionQuery, VersionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VersionQuery, VersionQueryVariables>(VersionDocument, options);
        }
export type VersionQueryHookResult = ReturnType<typeof useVersionQuery>;
export type VersionLazyQueryHookResult = ReturnType<typeof useVersionLazyQuery>;
export type VersionQueryResult = Apollo.QueryResult<VersionQuery, VersionQueryVariables>;