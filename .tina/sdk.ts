import type {Client} from "tina-graphql-gateway"
type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** References another document, used as a foreign key */
  Reference: any;
  JSON: any;
  JSONObject: any;
};

type Node = {
  id: Scalars['ID'];
};

type Document = {
  sys?: Maybe<SystemInfo>;
  id: Scalars['ID'];
};

type FormField = {
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
};




type SystemInfo = {
  __typename?: 'SystemInfo';
  filename?: Maybe<Scalars['String']>;
  basename?: Maybe<Scalars['String']>;
  breadcrumbs?: Maybe<Array<Maybe<Scalars['String']>>>;
  path?: Maybe<Scalars['String']>;
  relativePath?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
  template?: Maybe<Scalars['String']>;
  collection?: Maybe<Section>;
};


type SystemInfoBreadcrumbsArgs = {
  excludeExtension?: Maybe<Scalars['Boolean']>;
};

type Section = {
  __typename?: 'Section';
  type?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  create?: Maybe<Scalars['String']>;
  match?: Maybe<Scalars['String']>;
  new_doc_ext?: Maybe<Scalars['String']>;
  templates?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<Document>>>;
};

type SectionDocumentUnion = Posts_Document | Pages_Document | Forms_Document | Curated_Document | Authors_Document | Nav_Document;

type SectionParams = {
  posts?: Maybe<Posts_Input>;
  pages?: Maybe<Pages_Input>;
  forms?: Maybe<Forms_Input>;
  curated?: Maybe<Curated_Input>;
  authors?: Maybe<Authors_Input>;
  nav?: Maybe<Nav_Input>;
};

type Mutation = {
  __typename?: 'Mutation';
  addPendingDocument?: Maybe<Document>;
  updateDocument?: Maybe<SectionDocumentUnion>;
  updatePostsDocument?: Maybe<Posts_Document>;
  updatePagesDocument?: Maybe<Pages_Document>;
  updateFormsDocument?: Maybe<Forms_Document>;
  updateCuratedDocument?: Maybe<Curated_Document>;
  updateAuthorsDocument?: Maybe<Authors_Document>;
  updateNavDocument?: Maybe<Nav_Document>;
};


type MutationAddPendingDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
  collection?: Maybe<Scalars['String']>;
  template?: Maybe<Scalars['String']>;
};


type MutationUpdateDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
  params?: Maybe<SectionParams>;
};


type MutationUpdatePostsDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
  params?: Maybe<Posts_Input>;
};


type MutationUpdatePagesDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
  params?: Maybe<Pages_Input>;
};


type MutationUpdateFormsDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
  params?: Maybe<Forms_Input>;
};


type MutationUpdateCuratedDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
  params?: Maybe<Curated_Input>;
};


type MutationUpdateAuthorsDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
  params?: Maybe<Authors_Input>;
};


type MutationUpdateNavDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
  params?: Maybe<Nav_Input>;
};

type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  getDocument?: Maybe<SectionDocumentUnion>;
  getCollections?: Maybe<Array<Maybe<Section>>>;
  getCollection?: Maybe<Section>;
  getPostsDocument?: Maybe<Posts_Document>;
  getPostsList?: Maybe<Array<Maybe<Posts_Document>>>;
  getPagesDocument?: Maybe<Pages_Document>;
  getPagesList?: Maybe<Array<Maybe<Pages_Document>>>;
  getFormsDocument?: Maybe<Forms_Document>;
  getFormsList?: Maybe<Array<Maybe<Forms_Document>>>;
  getCuratedDocument?: Maybe<Curated_Document>;
  getCuratedList?: Maybe<Array<Maybe<Curated_Document>>>;
  getAuthorsDocument?: Maybe<Authors_Document>;
  getAuthorsList?: Maybe<Array<Maybe<Authors_Document>>>;
  getNavDocument?: Maybe<Nav_Document>;
  getNavList?: Maybe<Array<Maybe<Nav_Document>>>;
};


type QueryNodeArgs = {
  id: Scalars['ID'];
};


type QueryGetDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath?: Maybe<Scalars['String']>;
};


type QueryGetCollectionArgs = {
  collection?: Maybe<Scalars['String']>;
};


type QueryGetPostsDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


type QueryGetPagesDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


type QueryGetFormsDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


type QueryGetCuratedDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


type QueryGetAuthorsDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


type QueryGetNavDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};

type Posts_Data = Post_Doc_Data;

type Posts_Input = {
  post?: Maybe<Post_Doc_Input>;
};

type Posts_Values = Post_Doc_Values;

type Posts_Form = Post_Doc_Form;

type Posts_Document = Node & Document & {
  __typename?: 'Posts_Document';
  id: Scalars['ID'];
  sys?: Maybe<SystemInfo>;
  data?: Maybe<Posts_Data>;
  values?: Maybe<Posts_Values>;
  form?: Maybe<Posts_Form>;
};

type Post_Accolades_Data = {
  __typename?: 'Post_Accolades_Data';
  figure?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type Post_Doc_Data = {
  __typename?: 'Post_Doc_Data';
  title?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  image_small?: Maybe<Scalars['String']>;
  accolades?: Maybe<Post_Accolades_Data>;
  author?: Maybe<Authors_Document>;
  preface?: Maybe<Scalars['String']>;
  _body?: Maybe<Scalars['String']>;
};

type Post_Accolades_Values = {
  __typename?: 'Post_Accolades_Values';
  figure?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type Post_Doc_Values = {
  __typename?: 'Post_Doc_Values';
  title?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  image_small?: Maybe<Scalars['String']>;
  accolades?: Maybe<Post_Accolades_Values>;
  author?: Maybe<Scalars['Reference']>;
  preface?: Maybe<Scalars['String']>;
  _body?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type TextField = FormField & {
  __typename?: 'TextField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
};

type TagListField = FormField & {
  __typename?: 'TagListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
};

type Post_Accolades_FormFieldsUnion = TextField;

type Post_Accolades_GroupField = FormField & {
  __typename?: 'Post_Accolades_GroupField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Post_Accolades_FormFieldsUnion>>>;
};

type SelectField = FormField & {
  __typename?: 'SelectField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<Scalars['String']>>>;
};

type TextareaField = FormField & {
  __typename?: 'TextareaField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
};

type Post_Doc_FormFieldsUnion = TextField | TagListField | Post_Accolades_GroupField | SelectField | TextareaField;

type Post_Doc_Form = {
  __typename?: 'Post_Doc_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Post_Doc_FormFieldsUnion>>>;
};

type Post_Accolades_Input = {
  figure?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type Post_Doc_Input = {
  title?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  image_small?: Maybe<Scalars['String']>;
  accolades?: Maybe<Post_Accolades_Input>;
  author?: Maybe<Scalars['String']>;
  preface?: Maybe<Scalars['String']>;
  _body?: Maybe<Scalars['String']>;
};

type Pages_Data = Page_Doc_Data;

type Pages_Input = {
  page?: Maybe<Page_Doc_Input>;
};

type Pages_Values = Page_Doc_Values;

type Pages_Form = Page_Doc_Form;

type Pages_Document = Node & Document & {
  __typename?: 'Pages_Document';
  id: Scalars['ID'];
  sys?: Maybe<SystemInfo>;
  data?: Maybe<Pages_Data>;
  values?: Maybe<Pages_Values>;
  form?: Maybe<Pages_Form>;
};

type Page_Seo_Data = {
  __typename?: 'Page_Seo_Data';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

type LayerTeam_Data = {
  __typename?: 'LayerTeam_Data';
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Authors_Document>>>;
};

type LayerPostList_Data = {
  __typename?: 'LayerPostList_Data';
  description?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Posts_Document>>>;
};

type LayerDarkFeature_FeatureList_Data = {
  __typename?: 'LayerDarkFeature_FeatureList_Data';
  header?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type LayerDarkFeature_Data = {
  __typename?: 'LayerDarkFeature_Data';
  hint?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  feature_list?: Maybe<Array<Maybe<LayerDarkFeature_FeatureList_Data>>>;
};

type LayerLeadership_Data = {
  __typename?: 'LayerLeadership_Data';
  title?: Maybe<Scalars['String']>;
  leaders?: Maybe<Array<Maybe<Authors_Document>>>;
};

type LayerSponsors_Sponsors_Data = {
  __typename?: 'LayerSponsors_Sponsors_Data';
  name?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

type LayerSponsors_Data = {
  __typename?: 'LayerSponsors_Data';
  title?: Maybe<Scalars['String']>;
  sponsors?: Maybe<Array<Maybe<LayerSponsors_Sponsors_Data>>>;
};

type CuratedCollection_Data = {
  __typename?: 'CuratedCollection_Data';
  description?: Maybe<Scalars['String']>;
  posts_collection?: Maybe<Array<Maybe<Posts_Document>>>;
};

type LayerCta_Data = {
  __typename?: 'LayerCta_Data';
  description?: Maybe<Scalars['String']>;
  cta_text?: Maybe<Scalars['String']>;
  cta_link?: Maybe<Scalars['String']>;
  cta_image?: Maybe<Scalars['String']>;
};

type Page_Layers_Data = LayerTeam_Data | LayerPostList_Data | LayerDarkFeature_Data | LayerLeadership_Data | LayerSponsors_Data | CuratedCollection_Data | LayerCta_Data;

type Page_Doc_Data = {
  __typename?: 'Page_Doc_Data';
  title?: Maybe<Scalars['String']>;
  seo?: Maybe<Page_Seo_Data>;
  layers?: Maybe<Array<Maybe<Page_Layers_Data>>>;
  _body?: Maybe<Scalars['String']>;
};

type Page_Seo_Values = {
  __typename?: 'Page_Seo_Values';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

type LayerTeam_Values = {
  __typename?: 'LayerTeam_Values';
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Scalars['String']>>>;
  _template?: Maybe<Scalars['String']>;
};

type LayerPostList_Values = {
  __typename?: 'LayerPostList_Values';
  description?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Scalars['String']>>>;
  _template?: Maybe<Scalars['String']>;
};

type LayerDarkFeature_FeatureList_Values = {
  __typename?: 'LayerDarkFeature_FeatureList_Values';
  header?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type LayerDarkFeature_Values = {
  __typename?: 'LayerDarkFeature_Values';
  hint?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  feature_list?: Maybe<Array<Maybe<LayerDarkFeature_FeatureList_Values>>>;
  _template?: Maybe<Scalars['String']>;
};

type LayerLeadership_Values = {
  __typename?: 'LayerLeadership_Values';
  title?: Maybe<Scalars['String']>;
  leaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  _template?: Maybe<Scalars['String']>;
};

type LayerSponsors_Sponsors_Values = {
  __typename?: 'LayerSponsors_Sponsors_Values';
  name?: Maybe<Scalars['Reference']>;
  link?: Maybe<Scalars['String']>;
};

type LayerSponsors_Values = {
  __typename?: 'LayerSponsors_Values';
  title?: Maybe<Scalars['String']>;
  sponsors?: Maybe<Array<Maybe<LayerSponsors_Sponsors_Values>>>;
  _template?: Maybe<Scalars['String']>;
};

type CuratedCollection_Values = {
  __typename?: 'CuratedCollection_Values';
  description?: Maybe<Scalars['String']>;
  posts_collection?: Maybe<Array<Maybe<Scalars['String']>>>;
  _template?: Maybe<Scalars['String']>;
};

type LayerCta_Values = {
  __typename?: 'LayerCta_Values';
  description?: Maybe<Scalars['String']>;
  cta_text?: Maybe<Scalars['String']>;
  cta_link?: Maybe<Scalars['String']>;
  cta_image?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type Page_Layers_Values = LayerTeam_Values | LayerPostList_Values | LayerDarkFeature_Values | LayerLeadership_Values | LayerSponsors_Values | CuratedCollection_Values | LayerCta_Values;

type Page_Doc_Values = {
  __typename?: 'Page_Doc_Values';
  title?: Maybe<Scalars['String']>;
  seo?: Maybe<Page_Seo_Values>;
  layers?: Maybe<Array<Maybe<Page_Layers_Values>>>;
  _body?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type Page_Seo_FormFieldsUnion = TextField;

type Page_Seo_GroupField = FormField & {
  __typename?: 'Page_Seo_GroupField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Page_Seo_FormFieldsUnion>>>;
};

type List_FormFieldsUnion = TextField | SelectField;

type ListField = FormField & {
  __typename?: 'ListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  defaultItem?: Maybe<Scalars['String']>;
  field?: Maybe<List_FormFieldsUnion>;
};

type LayerTeam_FormFieldsUnion = TextareaField | ListField;

type LayerTeam_Form = {
  __typename?: 'LayerTeam_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<LayerTeam_FormFieldsUnion>>>;
};

type LayerPostList_FormFieldsUnion = TextareaField | ListField;

type LayerPostList_Form = {
  __typename?: 'LayerPostList_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<LayerPostList_FormFieldsUnion>>>;
};

type LayerDarkFeature_FeatureList_FormFieldsUnion = TextField;

type LayerDarkFeature_FeatureList_GroupListField = FormField & {
  __typename?: 'LayerDarkFeature_FeatureList_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<LayerDarkFeature_FeatureList_FormFieldsUnion>>>;
};

type LayerDarkFeature_FormFieldsUnion = TextField | TextareaField | LayerDarkFeature_FeatureList_GroupListField;

type LayerDarkFeature_Form = {
  __typename?: 'LayerDarkFeature_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<LayerDarkFeature_FormFieldsUnion>>>;
};

type LayerLeadership_FormFieldsUnion = TextField | ListField;

type LayerLeadership_Form = {
  __typename?: 'LayerLeadership_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<LayerLeadership_FormFieldsUnion>>>;
};

type LayerSponsors_Sponsors_FormFieldsUnion = SelectField | TextField;

type LayerSponsors_Sponsors_GroupListField = FormField & {
  __typename?: 'LayerSponsors_Sponsors_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<LayerSponsors_Sponsors_FormFieldsUnion>>>;
};

type LayerSponsors_FormFieldsUnion = TextField | LayerSponsors_Sponsors_GroupListField;

type LayerSponsors_Form = {
  __typename?: 'LayerSponsors_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<LayerSponsors_FormFieldsUnion>>>;
};

type CuratedCollection_FormFieldsUnion = TextareaField | ListField;

type CuratedCollection_Form = {
  __typename?: 'CuratedCollection_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<CuratedCollection_FormFieldsUnion>>>;
};

type LayerCta_FormFieldsUnion = TextareaField | TextField;

type LayerCta_Form = {
  __typename?: 'LayerCta_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<LayerCta_FormFieldsUnion>>>;
};

type Page_Layers_BlocksFieldTemplates = {
  __typename?: 'Page_Layers_BlocksFieldTemplates';
  layerTeam?: Maybe<LayerTeam_Form>;
  layerPostList?: Maybe<LayerPostList_Form>;
  layerDarkFeature?: Maybe<LayerDarkFeature_Form>;
  layerLeadership?: Maybe<LayerLeadership_Form>;
  layerSponsors?: Maybe<LayerSponsors_Form>;
  curatedCollection?: Maybe<CuratedCollection_Form>;
  layerCta?: Maybe<LayerCta_Form>;
};

type Page_Layers_BlocksField = FormField & {
  __typename?: 'Page_Layers_BlocksField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  templates?: Maybe<Page_Layers_BlocksFieldTemplates>;
};

type Page_Doc_FormFieldsUnion = TextField | Page_Seo_GroupField | Page_Layers_BlocksField | TextareaField;

type Page_Doc_Form = {
  __typename?: 'Page_Doc_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Page_Doc_FormFieldsUnion>>>;
};

type Page_Seo_Input = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

type LayerTeam_Input = {
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Scalars['String']>>>;
};

type LayerPostList_Input = {
  description?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Scalars['String']>>>;
};

type LayerDarkFeature_FeatureList_Input = {
  header?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type LayerDarkFeature_Input = {
  hint?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  feature_list?: Maybe<Array<Maybe<LayerDarkFeature_FeatureList_Input>>>;
};

type LayerLeadership_Input = {
  title?: Maybe<Scalars['String']>;
  leaders?: Maybe<Array<Maybe<Scalars['String']>>>;
};

type LayerSponsors_Sponsors_Input = {
  name?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

type LayerSponsors_Input = {
  title?: Maybe<Scalars['String']>;
  sponsors?: Maybe<Array<Maybe<LayerSponsors_Sponsors_Input>>>;
};

type CuratedCollection_Input = {
  description?: Maybe<Scalars['String']>;
  posts_collection?: Maybe<Array<Maybe<Scalars['String']>>>;
};

type LayerCta_Input = {
  description?: Maybe<Scalars['String']>;
  cta_text?: Maybe<Scalars['String']>;
  cta_link?: Maybe<Scalars['String']>;
  cta_image?: Maybe<Scalars['String']>;
};

type Layers_Input = {
  layerTeam?: Maybe<LayerTeam_Input>;
  layerPostList?: Maybe<LayerPostList_Input>;
  layerDarkFeature?: Maybe<LayerDarkFeature_Input>;
  layerLeadership?: Maybe<LayerLeadership_Input>;
  layerSponsors?: Maybe<LayerSponsors_Input>;
  curatedCollection?: Maybe<CuratedCollection_Input>;
  layerCta?: Maybe<LayerCta_Input>;
};

type Page_Doc_Input = {
  title?: Maybe<Scalars['String']>;
  seo?: Maybe<Page_Seo_Input>;
  layers?: Maybe<Array<Maybe<Layers_Input>>>;
  _body?: Maybe<Scalars['String']>;
};

type Forms_Data = JenCcoaching_Doc_Data;

type Forms_Input = {
  jenCcoaching?: Maybe<JenCcoaching_Doc_Input>;
};

type Forms_Values = JenCcoaching_Doc_Values;

type Forms_Form = JenCcoaching_Doc_Form;

type Forms_Document = Node & Document & {
  __typename?: 'Forms_Document';
  id: Scalars['ID'];
  sys?: Maybe<SystemInfo>;
  data?: Maybe<Forms_Data>;
  values?: Maybe<Forms_Values>;
  form?: Maybe<Forms_Form>;
};

type FieldBoolean_Data = {
  __typename?: 'FieldBoolean_Data';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type FieldText_Data = {
  __typename?: 'FieldText_Data';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  suffix?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type FieldTextarea_Data = {
  __typename?: 'FieldTextarea_Data';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type FieldCheckbox_Options_Data = {
  __typename?: 'FieldCheckbox_Options_Data';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type FieldCheckbox_Data = {
  __typename?: 'FieldCheckbox_Data';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<FieldCheckbox_Options_Data>>>;
};

type FieldRadio_Options_Data = {
  __typename?: 'FieldRadio_Options_Data';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type FieldRadio_Data = {
  __typename?: 'FieldRadio_Data';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<FieldRadio_Options_Data>>>;
};

type FieldGroupText_Fields_Data = FieldText_Data;

type FieldGroupText_Data = {
  __typename?: 'FieldGroupText_Data';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldGroupText_Fields_Data>>>;
  prefix_class?: Maybe<Scalars['String']>;
};

type FieldWeekCheckbox_Data = {
  __typename?: 'FieldWeekCheckbox_Data';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type JenCcoaching_Fields_Data = FieldBoolean_Data | FieldText_Data | FieldTextarea_Data | FieldCheckbox_Data | FieldRadio_Data | FieldGroupText_Data | FieldWeekCheckbox_Data;

type JenCcoaching_Doc_Data = {
  __typename?: 'JenCcoaching_Doc_Data';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<JenCcoaching_Fields_Data>>>;
  _body?: Maybe<Scalars['String']>;
};

type FieldBoolean_Values = {
  __typename?: 'FieldBoolean_Values';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type FieldText_Values = {
  __typename?: 'FieldText_Values';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  suffix?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type FieldTextarea_Values = {
  __typename?: 'FieldTextarea_Values';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type FieldCheckbox_Options_Values = {
  __typename?: 'FieldCheckbox_Options_Values';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type FieldCheckbox_Values = {
  __typename?: 'FieldCheckbox_Values';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<FieldCheckbox_Options_Values>>>;
  _template?: Maybe<Scalars['String']>;
};

type FieldRadio_Options_Values = {
  __typename?: 'FieldRadio_Options_Values';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type FieldRadio_Values = {
  __typename?: 'FieldRadio_Values';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<FieldRadio_Options_Values>>>;
  _template?: Maybe<Scalars['String']>;
};

type FieldGroupText_Fields_Values = FieldText_Values;

type FieldGroupText_Values = {
  __typename?: 'FieldGroupText_Values';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldGroupText_Fields_Values>>>;
  prefix_class?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type FieldWeekCheckbox_Values = {
  __typename?: 'FieldWeekCheckbox_Values';
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type JenCcoaching_Fields_Values = FieldBoolean_Values | FieldText_Values | FieldTextarea_Values | FieldCheckbox_Values | FieldRadio_Values | FieldGroupText_Values | FieldWeekCheckbox_Values;

type JenCcoaching_Doc_Values = {
  __typename?: 'JenCcoaching_Doc_Values';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<JenCcoaching_Fields_Values>>>;
  _body?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type FieldBoolean_FormFieldsUnion = TextField;

type FieldBoolean_Form = {
  __typename?: 'FieldBoolean_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldBoolean_FormFieldsUnion>>>;
};

type FieldText_FormFieldsUnion = TextField;

type FieldText_Form = {
  __typename?: 'FieldText_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldText_FormFieldsUnion>>>;
};

type FieldTextarea_FormFieldsUnion = TextField;

type FieldTextarea_Form = {
  __typename?: 'FieldTextarea_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldTextarea_FormFieldsUnion>>>;
};

type FieldCheckbox_Options_FormFieldsUnion = TextField;

type FieldCheckbox_Options_GroupListField = FormField & {
  __typename?: 'FieldCheckbox_Options_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldCheckbox_Options_FormFieldsUnion>>>;
};

type FieldCheckbox_FormFieldsUnion = TextField | FieldCheckbox_Options_GroupListField;

type FieldCheckbox_Form = {
  __typename?: 'FieldCheckbox_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldCheckbox_FormFieldsUnion>>>;
};

type FieldRadio_Options_FormFieldsUnion = TextField;

type FieldRadio_Options_GroupListField = FormField & {
  __typename?: 'FieldRadio_Options_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldRadio_Options_FormFieldsUnion>>>;
};

type FieldRadio_FormFieldsUnion = TextField | FieldRadio_Options_GroupListField;

type FieldRadio_Form = {
  __typename?: 'FieldRadio_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldRadio_FormFieldsUnion>>>;
};

type FieldGroupText_Fields_BlocksFieldTemplates = {
  __typename?: 'FieldGroupText_Fields_BlocksFieldTemplates';
  fieldText?: Maybe<FieldText_Form>;
};

type FieldGroupText_Fields_BlocksField = FormField & {
  __typename?: 'FieldGroupText_Fields_BlocksField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  templates?: Maybe<FieldGroupText_Fields_BlocksFieldTemplates>;
};

type FieldGroupText_FormFieldsUnion = TextField | FieldGroupText_Fields_BlocksField;

type FieldGroupText_Form = {
  __typename?: 'FieldGroupText_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldGroupText_FormFieldsUnion>>>;
};

type FieldWeekCheckbox_FormFieldsUnion = TextField;

type FieldWeekCheckbox_Form = {
  __typename?: 'FieldWeekCheckbox_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<FieldWeekCheckbox_FormFieldsUnion>>>;
};

type JenCcoaching_Fields_BlocksFieldTemplates = {
  __typename?: 'JenCcoaching_Fields_BlocksFieldTemplates';
  fieldBoolean?: Maybe<FieldBoolean_Form>;
  fieldText?: Maybe<FieldText_Form>;
  fieldTextarea?: Maybe<FieldTextarea_Form>;
  fieldCheckbox?: Maybe<FieldCheckbox_Form>;
  fieldRadio?: Maybe<FieldRadio_Form>;
  fieldGroupText?: Maybe<FieldGroupText_Form>;
  fieldWeekCheckbox?: Maybe<FieldWeekCheckbox_Form>;
};

type JenCcoaching_Fields_BlocksField = FormField & {
  __typename?: 'JenCcoaching_Fields_BlocksField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  templates?: Maybe<JenCcoaching_Fields_BlocksFieldTemplates>;
};

type JenCcoaching_Doc_FormFieldsUnion = TextField | TextareaField | JenCcoaching_Fields_BlocksField;

type JenCcoaching_Doc_Form = {
  __typename?: 'JenCcoaching_Doc_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<JenCcoaching_Doc_FormFieldsUnion>>>;
};

type FieldBoolean_Input = {
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type FieldText_Input = {
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  suffix?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type FieldTextarea_Input = {
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type FieldCheckbox_Options_Input = {
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type FieldCheckbox_Input = {
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<FieldCheckbox_Options_Input>>>;
};

type FieldRadio_Options_Input = {
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type FieldRadio_Input = {
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<FieldRadio_Options_Input>>>;
};

type Fields_Input = {
  fieldText?: Maybe<FieldText_Input>;
};

type FieldGroupText_Input = {
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Fields_Input>>>;
  prefix_class?: Maybe<Scalars['String']>;
};

type FieldWeekCheckbox_Input = {
  label?: Maybe<Scalars['String']>;
  subLabel?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type JenCcoaching_Doc_Input = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Fields_Input>>>;
  _body?: Maybe<Scalars['String']>;
};

type Curated_Data = Curated_Doc_Data;

type Curated_Input = {
  curated?: Maybe<Curated_Doc_Input>;
};

type Curated_Values = Curated_Doc_Values;

type Curated_Form = Curated_Doc_Form;

type Curated_Document = Node & Document & {
  __typename?: 'Curated_Document';
  id: Scalars['ID'];
  sys?: Maybe<SystemInfo>;
  data?: Maybe<Curated_Data>;
  values?: Maybe<Curated_Values>;
  form?: Maybe<Curated_Form>;
};

type CuratedHero_Data = {
  __typename?: 'CuratedHero_Data';
  description?: Maybe<Scalars['String']>;
  hero_post?: Maybe<Posts_Document>;
};

type Curated_Curations_Data = CuratedHero_Data | CuratedCollection_Data;

type Curated_Doc_Data = {
  __typename?: 'Curated_Doc_Data';
  title?: Maybe<Scalars['String']>;
  curations?: Maybe<Array<Maybe<Curated_Curations_Data>>>;
  _body?: Maybe<Scalars['String']>;
};

type CuratedHero_Values = {
  __typename?: 'CuratedHero_Values';
  description?: Maybe<Scalars['String']>;
  hero_post?: Maybe<Scalars['Reference']>;
  _template?: Maybe<Scalars['String']>;
};

type Curated_Curations_Values = CuratedHero_Values | CuratedCollection_Values;

type Curated_Doc_Values = {
  __typename?: 'Curated_Doc_Values';
  title?: Maybe<Scalars['String']>;
  curations?: Maybe<Array<Maybe<Curated_Curations_Values>>>;
  _body?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type CuratedHero_FormFieldsUnion = TextareaField | SelectField;

type CuratedHero_Form = {
  __typename?: 'CuratedHero_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<CuratedHero_FormFieldsUnion>>>;
};

type Curated_Curations_BlocksFieldTemplates = {
  __typename?: 'Curated_Curations_BlocksFieldTemplates';
  curatedHero?: Maybe<CuratedHero_Form>;
  curatedCollection?: Maybe<CuratedCollection_Form>;
};

type Curated_Curations_BlocksField = FormField & {
  __typename?: 'Curated_Curations_BlocksField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  templates?: Maybe<Curated_Curations_BlocksFieldTemplates>;
};

type Curated_Doc_FormFieldsUnion = TextField | Curated_Curations_BlocksField | TextareaField;

type Curated_Doc_Form = {
  __typename?: 'Curated_Doc_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Curated_Doc_FormFieldsUnion>>>;
};

type CuratedHero_Input = {
  description?: Maybe<Scalars['String']>;
  hero_post?: Maybe<Scalars['String']>;
};

type Curations_Input = {
  curatedHero?: Maybe<CuratedHero_Input>;
  curatedCollection?: Maybe<CuratedCollection_Input>;
};

type Curated_Doc_Input = {
  title?: Maybe<Scalars['String']>;
  curations?: Maybe<Array<Maybe<Curations_Input>>>;
  _body?: Maybe<Scalars['String']>;
};

type Authors_Data = Author_Doc_Data | Athlete_Doc_Data;

type Authors_Input = {
  author?: Maybe<Author_Doc_Input>;
  athlete?: Maybe<Athlete_Doc_Input>;
};

type Authors_Values = Author_Doc_Values | Athlete_Doc_Values;

type Authors_Form = Author_Doc_Form | Athlete_Doc_Form;

type Authors_Document = Node & Document & {
  __typename?: 'Authors_Document';
  id: Scalars['ID'];
  sys?: Maybe<SystemInfo>;
  data?: Maybe<Authors_Data>;
  values?: Maybe<Authors_Values>;
  form?: Maybe<Authors_Form>;
};

type Author_Accolades_Data = {
  __typename?: 'Author_Accolades_Data';
  figure?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type Author_Ebook_Data = {
  __typename?: 'Author_Ebook_Data';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  link_text?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

type Author_Doc_Data = {
  __typename?: 'Author_Doc_Data';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  accolades?: Maybe<Array<Maybe<Author_Accolades_Data>>>;
  image?: Maybe<Scalars['String']>;
  bio_image?: Maybe<Scalars['String']>;
  story_image?: Maybe<Scalars['String']>;
  form?: Maybe<Forms_Document>;
  posts_collection?: Maybe<Array<Maybe<Posts_Document>>>;
  ebook?: Maybe<Author_Ebook_Data>;
  _body?: Maybe<Scalars['String']>;
};

type Author_Accolades_Values = {
  __typename?: 'Author_Accolades_Values';
  figure?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type Author_Ebook_Values = {
  __typename?: 'Author_Ebook_Values';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  link_text?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

type Author_Doc_Values = {
  __typename?: 'Author_Doc_Values';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['Reference']>;
  accolades?: Maybe<Array<Maybe<Author_Accolades_Values>>>;
  image?: Maybe<Scalars['String']>;
  bio_image?: Maybe<Scalars['String']>;
  story_image?: Maybe<Scalars['String']>;
  form?: Maybe<Scalars['Reference']>;
  posts_collection?: Maybe<Array<Maybe<Scalars['String']>>>;
  ebook?: Maybe<Author_Ebook_Values>;
  _body?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type Author_Accolades_FormFieldsUnion = TextField;

type Author_Accolades_GroupListField = FormField & {
  __typename?: 'Author_Accolades_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Author_Accolades_FormFieldsUnion>>>;
};

type Author_Ebook_FormFieldsUnion = TextField | TextareaField;

type Author_Ebook_GroupField = FormField & {
  __typename?: 'Author_Ebook_GroupField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Author_Ebook_FormFieldsUnion>>>;
};

type Author_Doc_FormFieldsUnion = TextField | TextareaField | SelectField | Author_Accolades_GroupListField | ListField | Author_Ebook_GroupField;

type Author_Doc_Form = {
  __typename?: 'Author_Doc_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Author_Doc_FormFieldsUnion>>>;
};

type Author_Accolades_Input = {
  figure?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type Author_Ebook_Input = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  link_text?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

type Author_Doc_Input = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  accolades?: Maybe<Array<Maybe<Author_Accolades_Input>>>;
  image?: Maybe<Scalars['String']>;
  bio_image?: Maybe<Scalars['String']>;
  story_image?: Maybe<Scalars['String']>;
  form?: Maybe<Scalars['String']>;
  posts_collection?: Maybe<Array<Maybe<Scalars['String']>>>;
  ebook?: Maybe<Author_Ebook_Input>;
  _body?: Maybe<Scalars['String']>;
};

type Athlete_PersonalBests_Data = {
  __typename?: 'Athlete_PersonalBests_Data';
  event?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

type Athlete_Accolades_Data = {
  __typename?: 'Athlete_Accolades_Data';
  figure?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type Athlete_SocialMedia_Data = {
  __typename?: 'Athlete_SocialMedia_Data';
  source?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
};

type Athlete_Doc_Data = {
  __typename?: 'Athlete_Doc_Data';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  personal_bests?: Maybe<Array<Maybe<Athlete_PersonalBests_Data>>>;
  accolades?: Maybe<Array<Maybe<Athlete_Accolades_Data>>>;
  social_media?: Maybe<Array<Maybe<Athlete_SocialMedia_Data>>>;
  image?: Maybe<Scalars['String']>;
  _body?: Maybe<Scalars['String']>;
};

type Athlete_PersonalBests_Values = {
  __typename?: 'Athlete_PersonalBests_Values';
  event?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

type Athlete_Accolades_Values = {
  __typename?: 'Athlete_Accolades_Values';
  figure?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type Athlete_SocialMedia_Values = {
  __typename?: 'Athlete_SocialMedia_Values';
  source?: Maybe<Scalars['Reference']>;
  handle?: Maybe<Scalars['String']>;
};

type Athlete_Doc_Values = {
  __typename?: 'Athlete_Doc_Values';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  personal_bests?: Maybe<Array<Maybe<Athlete_PersonalBests_Values>>>;
  accolades?: Maybe<Array<Maybe<Athlete_Accolades_Values>>>;
  social_media?: Maybe<Array<Maybe<Athlete_SocialMedia_Values>>>;
  image?: Maybe<Scalars['String']>;
  _body?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type Athlete_PersonalBests_FormFieldsUnion = TextField;

type Athlete_PersonalBests_GroupListField = FormField & {
  __typename?: 'Athlete_PersonalBests_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Athlete_PersonalBests_FormFieldsUnion>>>;
};

type Athlete_Accolades_FormFieldsUnion = TextField;

type Athlete_Accolades_GroupListField = FormField & {
  __typename?: 'Athlete_Accolades_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Athlete_Accolades_FormFieldsUnion>>>;
};

type Athlete_SocialMedia_FormFieldsUnion = SelectField | TextField;

type Athlete_SocialMedia_GroupListField = FormField & {
  __typename?: 'Athlete_SocialMedia_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Athlete_SocialMedia_FormFieldsUnion>>>;
};

type Athlete_Doc_FormFieldsUnion = TextField | TextareaField | Athlete_PersonalBests_GroupListField | Athlete_Accolades_GroupListField | Athlete_SocialMedia_GroupListField;

type Athlete_Doc_Form = {
  __typename?: 'Athlete_Doc_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Athlete_Doc_FormFieldsUnion>>>;
};

type Athlete_PersonalBests_Input = {
  event?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

type Athlete_Accolades_Input = {
  figure?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

type Athlete_SocialMedia_Input = {
  source?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
};

type Athlete_Doc_Input = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  personal_bests?: Maybe<Array<Maybe<Athlete_PersonalBests_Input>>>;
  accolades?: Maybe<Array<Maybe<Athlete_Accolades_Input>>>;
  social_media?: Maybe<Array<Maybe<Athlete_SocialMedia_Input>>>;
  image?: Maybe<Scalars['String']>;
  _body?: Maybe<Scalars['String']>;
};

type Nav_Data = Nav_Doc_Data;

type Nav_Input = {
  nav?: Maybe<Nav_Doc_Input>;
};

type Nav_Values = Nav_Doc_Values;

type Nav_Form = Nav_Doc_Form;

type Nav_Document = Node & Document & {
  __typename?: 'Nav_Document';
  id: Scalars['ID'];
  sys?: Maybe<SystemInfo>;
  data?: Maybe<Nav_Data>;
  values?: Maybe<Nav_Values>;
  form?: Maybe<Nav_Form>;
};

type NavItemPopout_Children_Data = {
  __typename?: 'NavItemPopout_Children_Data';
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};

type NavItemPopout_Extra_Data = {
  __typename?: 'NavItemPopout_Extra_Data';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};

type NavItemPopout_Data = {
  __typename?: 'NavItemPopout_Data';
  label?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<NavItemPopout_Children_Data>>>;
  extra?: Maybe<Array<Maybe<NavItemPopout_Extra_Data>>>;
};

type NavItemMore_ReadMore_Data = {
  __typename?: 'NavItemMore_ReadMore_Data';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type NavItemMore_Data = {
  __typename?: 'NavItemMore_Data';
  label?: Maybe<Scalars['String']>;
  featured_post?: Maybe<Posts_Document>;
  from_the_blog?: Maybe<Array<Maybe<Posts_Document>>>;
  read_more?: Maybe<NavItemMore_ReadMore_Data>;
};

type NavItemLink_Data = {
  __typename?: 'NavItemLink_Data';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type Nav_Items_Data = NavItemPopout_Data | NavItemMore_Data | NavItemLink_Data;

type Nav_Doc_Data = {
  __typename?: 'Nav_Doc_Data';
  items?: Maybe<Array<Maybe<Nav_Items_Data>>>;
  show_auth?: Maybe<Scalars['Boolean']>;
  _body?: Maybe<Scalars['String']>;
};

type NavItemPopout_Children_Values = {
  __typename?: 'NavItemPopout_Children_Values';
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};

type NavItemPopout_Extra_Values = {
  __typename?: 'NavItemPopout_Extra_Values';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};

type NavItemPopout_Values = {
  __typename?: 'NavItemPopout_Values';
  label?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<NavItemPopout_Children_Values>>>;
  extra?: Maybe<Array<Maybe<NavItemPopout_Extra_Values>>>;
  _template?: Maybe<Scalars['String']>;
};

type NavItemMore_ReadMore_Values = {
  __typename?: 'NavItemMore_ReadMore_Values';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type NavItemMore_Values = {
  __typename?: 'NavItemMore_Values';
  label?: Maybe<Scalars['String']>;
  featured_post?: Maybe<Scalars['Reference']>;
  from_the_blog?: Maybe<Array<Maybe<Scalars['String']>>>;
  read_more?: Maybe<NavItemMore_ReadMore_Values>;
  _template?: Maybe<Scalars['String']>;
};

type NavItemLink_Values = {
  __typename?: 'NavItemLink_Values';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type Nav_Items_Values = NavItemPopout_Values | NavItemMore_Values | NavItemLink_Values;

type Nav_Doc_Values = {
  __typename?: 'Nav_Doc_Values';
  items?: Maybe<Array<Maybe<Nav_Items_Values>>>;
  show_auth?: Maybe<Scalars['Boolean']>;
  _body?: Maybe<Scalars['String']>;
  _template?: Maybe<Scalars['String']>;
};

type NavItemPopout_Children_FormFieldsUnion = TextField;

type NavItemPopout_Children_GroupListField = FormField & {
  __typename?: 'NavItemPopout_Children_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<NavItemPopout_Children_FormFieldsUnion>>>;
};

type NavItemPopout_Extra_FormFieldsUnion = TextField;

type NavItemPopout_Extra_GroupListField = FormField & {
  __typename?: 'NavItemPopout_Extra_GroupListField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<NavItemPopout_Extra_FormFieldsUnion>>>;
};

type NavItemPopout_FormFieldsUnion = TextField | NavItemPopout_Children_GroupListField | NavItemPopout_Extra_GroupListField;

type NavItemPopout_Form = {
  __typename?: 'NavItemPopout_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<NavItemPopout_FormFieldsUnion>>>;
};

type NavItemMore_ReadMore_FormFieldsUnion = TextField;

type NavItemMore_ReadMore_GroupField = FormField & {
  __typename?: 'NavItemMore_ReadMore_GroupField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<NavItemMore_ReadMore_FormFieldsUnion>>>;
};

type NavItemMore_FormFieldsUnion = TextField | SelectField | ListField | NavItemMore_ReadMore_GroupField;

type NavItemMore_Form = {
  __typename?: 'NavItemMore_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<NavItemMore_FormFieldsUnion>>>;
};

type NavItemLink_FormFieldsUnion = TextField;

type NavItemLink_Form = {
  __typename?: 'NavItemLink_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<NavItemLink_FormFieldsUnion>>>;
};

type Nav_Items_BlocksFieldTemplates = {
  __typename?: 'Nav_Items_BlocksFieldTemplates';
  navItemPopout?: Maybe<NavItemPopout_Form>;
  navItemMore?: Maybe<NavItemMore_Form>;
  navItemLink?: Maybe<NavItemLink_Form>;
};

type Nav_Items_BlocksField = FormField & {
  __typename?: 'Nav_Items_BlocksField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  templates?: Maybe<Nav_Items_BlocksFieldTemplates>;
};

type BooleanField = FormField & {
  __typename?: 'BooleanField';
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
};

type Nav_Doc_FormFieldsUnion = Nav_Items_BlocksField | BooleanField | TextareaField;

type Nav_Doc_Form = {
  __typename?: 'Nav_Doc_Form';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Nav_Doc_FormFieldsUnion>>>;
};

type NavItemPopout_Children_Input = {
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};

type NavItemPopout_Extra_Input = {
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};

type NavItemPopout_Input = {
  label?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<NavItemPopout_Children_Input>>>;
  extra?: Maybe<Array<Maybe<NavItemPopout_Extra_Input>>>;
};

type NavItemMore_ReadMore_Input = {
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type NavItemMore_Input = {
  label?: Maybe<Scalars['String']>;
  featured_post?: Maybe<Scalars['String']>;
  from_the_blog?: Maybe<Array<Maybe<Scalars['String']>>>;
  read_more?: Maybe<NavItemMore_ReadMore_Input>;
};

type NavItemLink_Input = {
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

type Items_Input = {
  navItemPopout?: Maybe<NavItemPopout_Input>;
  navItemMore?: Maybe<NavItemMore_Input>;
  navItemLink?: Maybe<NavItemLink_Input>;
};

type Nav_Doc_Input = {
  items?: Maybe<Array<Maybe<Items_Input>>>;
  show_auth?: Maybe<Scalars['Boolean']>;
  _body?: Maybe<Scalars['String']>;
};

export type AuthorSnippetFragment = { sys?: Maybe<Pick<SystemInfo, 'filename'>>, data?: Maybe<Pick<Author_Doc_Data, 'image' | 'name'> | Pick<Athlete_Doc_Data, 'image' | 'name'>> };

export type AuthorSnippetNavFragment = { sys?: Maybe<Pick<SystemInfo, 'filename'>>, data?: Maybe<Pick<Author_Doc_Data, 'image' | 'name'> | Pick<Athlete_Doc_Data, 'image' | 'name'>> };

export type BaseAuthorFragment = (
  { __typename: 'Authors_Document' }
  & Pick<Authors_Document, 'id'>
  & { sys?: Maybe<(
    Pick<SystemInfo, 'filename'>
    & { collection?: Maybe<Pick<Section, 'slug'>> }
  )>, data?: Maybe<(
    { __typename: 'Author_Doc_Data' }
    & Pick<Author_Doc_Data, 'name' | 'description' | 'role' | 'image' | '_body'>
    & { accolades?: Maybe<Array<Maybe<Pick<Author_Accolades_Data, 'figure' | 'description'>>>>, ebook?: Maybe<Pick<Author_Ebook_Data, 'title' | 'description' | 'link' | 'link_text' | 'image'>> }
  ) | (
    { __typename: 'Athlete_Doc_Data' }
    & Pick<Athlete_Doc_Data, 'name' | 'country' | 'image' | '_body'>
    & { social_media?: Maybe<Array<Maybe<Pick<Athlete_SocialMedia_Data, 'source' | 'handle'>>>>, personal_bests?: Maybe<Array<Maybe<Pick<Athlete_PersonalBests_Data, 'event' | 'time'>>>> }
  )> }
);

export type ThumbnailPostFragment = { sys?: Maybe<Pick<SystemInfo, 'filename'>>, data?: Maybe<(
    { __typename: 'Post_Doc_Data' }
    & Pick<Post_Doc_Data, 'title' | 'tags' | 'image' | 'preface'>
    & { author?: Maybe<{ sys?: Maybe<Pick<SystemInfo, 'filename'>>, data?: Maybe<(
        { __typename: 'Author_Doc_Data' }
        & Pick<Author_Doc_Data, 'name' | 'image'>
      ) | (
        { __typename: 'Athlete_Doc_Data' }
        & Pick<Athlete_Doc_Data, 'name' | 'image'>
      )> }> }
  )> };

export type MemberQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type MemberQuery = { getNavDocument?: Maybe<NavFragment>, getAuthorsDocument?: Maybe<{ sys?: Maybe<(
      Pick<SystemInfo, 'filename'>
      & { collection?: Maybe<Pick<Section, 'slug'>> }
    )>, data?: Maybe<(
      { __typename: 'Author_Doc_Data' }
      & Pick<Author_Doc_Data, 'name' | 'description' | 'role' | 'image' | 'story_image' | 'bio_image' | '_body'>
      & { accolades?: Maybe<Array<Maybe<Pick<Author_Accolades_Data, 'figure' | 'description'>>>>, posts_collection?: Maybe<Array<Maybe<ThumbnailPostFragment>>>, form?: Maybe<{ data?: Maybe<(
          Pick<JenCcoaching_Doc_Data, 'title' | 'description'>
          & { fields?: Maybe<Array<Maybe<(
            { __typename: 'FieldBoolean_Data' }
            & Pick<FieldBoolean_Data, 'label' | 'subLabel' | 'name'>
          ) | (
            { __typename: 'FieldText_Data' }
            & Pick<FieldText_Data, 'label' | 'name' | 'placeholder' | 'subLabel' | 'prefix' | 'suffix'>
          ) | (
            { __typename: 'FieldTextarea_Data' }
            & Pick<FieldTextarea_Data, 'label' | 'subLabel' | 'placeholder' | 'name'>
          ) | (
            { __typename: 'FieldCheckbox_Data' }
            & Pick<FieldCheckbox_Data, 'label' | 'subLabel' | 'placeholder' | 'name'>
            & { options?: Maybe<Array<Maybe<Pick<FieldCheckbox_Options_Data, 'label' | 'value'>>>> }
          ) | (
            { __typename: 'FieldRadio_Data' }
            & Pick<FieldRadio_Data, 'label' | 'subLabel' | 'placeholder' | 'name'>
            & { options?: Maybe<Array<Maybe<Pick<FieldRadio_Options_Data, 'label' | 'value'>>>> }
          ) | (
            { __typename: 'FieldGroupText_Data' }
            & Pick<FieldGroupText_Data, 'label' | 'subLabel' | 'prefix_class'>
            & { fields?: Maybe<Array<Maybe<(
              { __typename: 'FieldText_Data' }
              & Pick<FieldText_Data, 'label' | 'subLabel' | 'name' | 'placeholder' | 'prefix' | 'suffix'>
            )>>> }
          ) | (
            { __typename: 'FieldWeekCheckbox_Data' }
            & Pick<FieldWeekCheckbox_Data, 'label' | 'subLabel' | 'name'>
          )>>> }
        )> }>, ebook?: Maybe<Pick<Author_Ebook_Data, 'title' | 'description' | 'link' | 'link_text' | 'image'>> }
    ) | (
      { __typename: 'Athlete_Doc_Data' }
      & Pick<Athlete_Doc_Data, 'name'>
    )> }> };

export type BaseAuthorListQueryVariables = Exact<{ [key: string]: never; }>;


export type BaseAuthorListQuery = { getNavDocument?: Maybe<NavFragment>, page?: Maybe<(
    Pick<Pages_Document, 'id'>
    & { data?: Maybe<(
      { __typename: 'Page_Doc_Data' }
      & { seo?: Maybe<Pick<Page_Seo_Data, 'title' | 'description' | 'image'>>, layers?: Maybe<Array<Maybe<{ __typename: 'LayerTeam_Data' } | (
        { __typename: 'LayerPostList_Data' }
        & Pick<LayerPostList_Data, 'description'>
        & { posts?: Maybe<Array<Maybe<{ data?: Maybe<(
            Pick<Post_Doc_Data, 'title' | 'tags' | 'preface' | 'image' | 'image_small'>
            & { author?: Maybe<BaseAuthorFragment> }
          )> }>>> }
      ) | (
        { __typename: 'LayerDarkFeature_Data' }
        & Pick<LayerDarkFeature_Data, 'hint' | 'title' | 'description'>
        & { feature_list?: Maybe<Array<Maybe<Pick<LayerDarkFeature_FeatureList_Data, 'header' | 'description'>>>> }
      ) | (
        { __typename: 'LayerLeadership_Data' }
        & Pick<LayerLeadership_Data, 'title'>
        & { leaders?: Maybe<Array<Maybe<BaseAuthorFragment>>> }
      ) | (
        { __typename: 'LayerSponsors_Data' }
        & Pick<LayerSponsors_Data, 'title'>
        & { sponsors?: Maybe<Array<Maybe<Pick<LayerSponsors_Sponsors_Data, 'name' | 'link'>>>> }
      ) | (
        { __typename: 'CuratedCollection_Data' }
        & CuratedCollectionFragment
      ) | (
        { __typename: 'LayerCta_Data' }
        & Pick<LayerCta_Data, 'description' | 'cta_text' | 'cta_link' | 'cta_image'>
      )>>> }
    )> }
  )>, terrence?: Maybe<BaseAuthorFragment>, jen?: Maybe<BaseAuthorFragment>, christian?: Maybe<BaseAuthorFragment>, chris?: Maybe<BaseAuthorFragment>, emily?: Maybe<BaseAuthorFragment>, eric?: Maybe<BaseAuthorFragment>, heidi?: Maybe<BaseAuthorFragment>, nicole?: Maybe<BaseAuthorFragment>, sarah?: Maybe<BaseAuthorFragment> };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { getNavDocument?: Maybe<NavFragment>, page?: Maybe<(
    Pick<Pages_Document, 'id'>
    & { data?: Maybe<(
      { __typename: 'Page_Doc_Data' }
      & { seo?: Maybe<Pick<Page_Seo_Data, 'title' | 'description' | 'image'>>, layers?: Maybe<Array<Maybe<{ __typename: 'LayerTeam_Data' } | (
        { __typename: 'LayerPostList_Data' }
        & Pick<LayerPostList_Data, 'description'>
        & { posts?: Maybe<Array<Maybe<{ data?: Maybe<(
            Pick<Post_Doc_Data, 'title' | 'tags' | 'preface' | 'image' | 'image_small'>
            & { author?: Maybe<BaseAuthorFragment> }
          )> }>>> }
      ) | (
        { __typename: 'LayerDarkFeature_Data' }
        & Pick<LayerDarkFeature_Data, 'hint' | 'title' | 'description'>
        & { feature_list?: Maybe<Array<Maybe<Pick<LayerDarkFeature_FeatureList_Data, 'header' | 'description'>>>> }
      ) | (
        { __typename: 'LayerLeadership_Data' }
        & Pick<LayerLeadership_Data, 'title'>
        & { leaders?: Maybe<Array<Maybe<BaseAuthorFragment>>> }
      ) | (
        { __typename: 'LayerSponsors_Data' }
        & Pick<LayerSponsors_Data, 'title'>
        & { sponsors?: Maybe<Array<Maybe<Pick<LayerSponsors_Sponsors_Data, 'name' | 'link'>>>> }
      ) | (
        { __typename: 'CuratedCollection_Data' }
        & CuratedCollectionFragment
      ) | (
        { __typename: 'LayerCta_Data' }
        & Pick<LayerCta_Data, 'description' | 'cta_text' | 'cta_link' | 'cta_image'>
      )>>> }
    )> }
  )> };

export type NavItemFragment = Pick<NavItemLink_Data, 'label' | 'value'>;

export type NavPopoutFragment = (
  Pick<NavItemPopout_Data, 'label'>
  & { children?: Maybe<Array<Maybe<Pick<NavItemPopout_Children_Data, 'label' | 'description' | 'value' | 'icon'>>>>, extra?: Maybe<Array<Maybe<Pick<NavItemPopout_Extra_Data, 'label' | 'value' | 'icon'>>>> }
);

export type NavItemMoreFragment = (
  Pick<NavItemMore_Data, 'label'>
  & { featured_post?: Maybe<{ sys?: Maybe<Pick<SystemInfo, 'path' | 'breadcrumbs'>>, data?: Maybe<(
      { __typename: 'Post_Doc_Data' }
      & Pick<Post_Doc_Data, 'image' | 'title' | 'preface'>
      & { author?: Maybe<{ sys?: Maybe<Pick<SystemInfo, 'filename'>>, data?: Maybe<Pick<Author_Doc_Data, 'image' | 'name'> | Pick<Athlete_Doc_Data, 'image' | 'name'>> }> }
    )> }>, read_more?: Maybe<Pick<NavItemMore_ReadMore_Data, 'label' | 'value'>>, from_the_blog?: Maybe<Array<Maybe<{ sys?: Maybe<Pick<SystemInfo, 'path' | 'breadcrumbs'>>, data?: Maybe<(
      { __typename: 'Post_Doc_Data' }
      & Pick<Post_Doc_Data, 'title' | 'image' | 'preface'>
      & { author?: Maybe<AuthorSnippetNavFragment> }
    )> }>>> }
);

export type NavFragment = { data?: Maybe<(
    Pick<Nav_Doc_Data, 'show_auth'>
    & { items?: Maybe<Array<Maybe<(
      { __typename: 'NavItemPopout_Data' }
      & NavPopoutFragment
    ) | (
      { __typename: 'NavItemMore_Data' }
      & NavItemMoreFragment
    ) | (
      { __typename: 'NavItemLink_Data' }
      & NavItemFragment
    )>>> }
  )> };

export type GetNavQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type GetNavQuery = { getNavDocument?: Maybe<NavFragment> };

export type PostQueryQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type PostQueryQuery = { getNavDocument?: Maybe<NavFragment>, getPostsDocument?: Maybe<(
    Pick<Posts_Document, 'id'>
    & { data?: Maybe<(
      { __typename: 'Post_Doc_Data' }
      & Pick<Post_Doc_Data, 'title' | 'tags' | 'image' | 'preface' | '_body'>
      & { accolades?: Maybe<Pick<Post_Accolades_Data, 'figure' | 'description'>>, author?: Maybe<AuthorSnippetFragment> }
    )> }
  )> };

export type CuratedCollectionFragment = (
  Pick<CuratedCollection_Data, 'description'>
  & { posts_collection?: Maybe<Array<Maybe<{ sys?: Maybe<(
      Pick<SystemInfo, 'breadcrumbs'>
      & { collection?: Maybe<Pick<Section, 'path' | 'slug'>> }
    )>, data?: Maybe<(
      Pick<Post_Doc_Data, 'title' | 'image' | 'preface' | '_body'>
      & { author?: Maybe<{ sys?: Maybe<Pick<SystemInfo, 'filename' | 'breadcrumbs'>>, data?: Maybe<Pick<Author_Doc_Data, 'name' | 'image'> | Pick<Athlete_Doc_Data, 'name' | 'image'>> }> }
    )> }>>> }
);

export type CuratedDocDataFragment = { curations?: Maybe<Array<Maybe<(
    { __typename: 'CuratedHero_Data' }
    & { hero_post?: Maybe<{ sys?: Maybe<(
        Pick<SystemInfo, 'breadcrumbs'>
        & { collection?: Maybe<Pick<Section, 'path' | 'slug'>> }
      )>, data?: Maybe<(
        Pick<Post_Doc_Data, 'title' | 'image' | 'preface' | '_body'>
        & { author?: Maybe<{ sys?: Maybe<Pick<SystemInfo, 'breadcrumbs' | 'filename'>>, data?: Maybe<Pick<Author_Doc_Data, 'name' | 'image' | 'description'>> }> }
      )> }> }
  ) | (
    { __typename: 'CuratedCollection_Data' }
    & CuratedCollectionFragment
  )>>> };

export type CuratedPostsQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type CuratedPostsQuery = { getNavDocument?: Maybe<NavFragment>, getCuratedDocument?: Maybe<{ sys?: Maybe<Pick<SystemInfo, 'filename'>>, data?: Maybe<CuratedDocDataFragment> }> };

export type StaticPostsPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type StaticPostsPathsQuery = { getCollection?: Maybe<(
    Pick<Section, 'type'>
    & { documents?: Maybe<Array<Maybe<(
      Pick<Posts_Document, 'id'>
      & { sys?: Maybe<Pick<SystemInfo, 'filename'>> }
    )>>> }
  )> };

export type AuthorFragmentFragment = (
  { __typename: 'Authors_Document' }
  & Pick<Authors_Document, 'id'>
  & { sys?: Maybe<(
    Pick<SystemInfo, 'filename'>
    & { collection?: Maybe<Pick<Section, 'slug'>> }
  )>, data?: Maybe<(
    { __typename: 'Author_Doc_Data' }
    & Pick<Author_Doc_Data, 'name' | 'description' | 'role' | 'image' | '_body'>
    & { accolades?: Maybe<Array<Maybe<Pick<Author_Accolades_Data, 'figure' | 'description'>>>>, ebook?: Maybe<Pick<Author_Ebook_Data, 'title' | 'description' | 'link' | 'link_text' | 'image'>> }
  ) | (
    { __typename: 'Athlete_Doc_Data' }
    & Pick<Athlete_Doc_Data, 'name' | 'country' | 'image' | '_body'>
    & { social_media?: Maybe<Array<Maybe<Pick<Athlete_SocialMedia_Data, 'source' | 'handle'>>>>, personal_bests?: Maybe<Array<Maybe<Pick<Athlete_PersonalBests_Data, 'event' | 'time'>>>> }
  )> }
);

export type AuthorListQueryVariables = Exact<{
  relativePath?: Maybe<Scalars['String']>;
}>;


export type AuthorListQuery = { getNavDocument?: Maybe<NavFragment>, page?: Maybe<(
    Pick<Pages_Document, 'id'>
    & { data?: Maybe<(
      { __typename: 'Page_Doc_Data' }
      & { layers?: Maybe<Array<Maybe<{ __typename: 'LayerTeam_Data' } | (
        { __typename: 'LayerPostList_Data' }
        & Pick<LayerPostList_Data, 'description'>
        & { posts?: Maybe<Array<Maybe<{ data?: Maybe<(
            Pick<Post_Doc_Data, 'title' | 'tags' | 'preface' | 'image' | 'image_small'>
            & { author?: Maybe<AuthorFragmentFragment> }
          )> }>>> }
      ) | (
        { __typename: 'LayerDarkFeature_Data' }
        & Pick<LayerDarkFeature_Data, 'hint' | 'title' | 'description'>
        & { feature_list?: Maybe<Array<Maybe<Pick<LayerDarkFeature_FeatureList_Data, 'header' | 'description'>>>> }
      ) | { __typename: 'LayerLeadership_Data' } | { __typename: 'LayerSponsors_Data' } | { __typename: 'CuratedCollection_Data' } | { __typename: 'LayerCta_Data' }>>> }
    )> }
  )>, terrence?: Maybe<AuthorFragmentFragment>, jen?: Maybe<AuthorFragmentFragment>, christian?: Maybe<AuthorFragmentFragment>, chris?: Maybe<AuthorFragmentFragment>, emily?: Maybe<AuthorFragmentFragment>, eric?: Maybe<AuthorFragmentFragment>, heidi?: Maybe<AuthorFragmentFragment>, nicole?: Maybe<AuthorFragmentFragment>, sarah?: Maybe<AuthorFragmentFragment> };

export const AuthorSnippetFragmentDoc = `
    fragment AuthorSnippet on Authors_Document {
  sys {
    filename
  }
  data {
    ... on Author_Doc_Data {
      image
      name
    }
    ... on Athlete_Doc_Data {
      image
      name
    }
  }
}
    `;
export const BaseAuthorFragmentDoc = `
    fragment BaseAuthor on Authors_Document {
  __typename
  id
  sys {
    filename
    collection {
      slug
    }
  }
  data {
    __typename
    ... on Athlete_Doc_Data {
      name
      country
      image
      social_media {
        source
        handle
      }
      personal_bests {
        event
        time
      }
      _body
    }
    ... on Author_Doc_Data {
      name
      accolades {
        figure
        description
      }
      description
      role
      image
      _body
      ebook {
        title
        description
        link
        link_text
        image
      }
    }
  }
}
    `;
export const ThumbnailPostFragmentDoc = `
    fragment ThumbnailPost on Posts_Document {
  sys {
    filename
  }
  data {
    __typename
    ... on Post_Doc_Data {
      title
      tags
      image
      preface
      author {
        sys {
          filename
        }
        data {
          __typename
          ... on Athlete_Doc_Data {
            name
            image
          }
          ... on Author_Doc_Data {
            name
            image
          }
        }
      }
    }
  }
}
    `;
export const NavItemFragmentDoc = `
    fragment NavItem on NavItemLink_Data {
  label
  value
}
    `;
export const NavPopoutFragmentDoc = `
    fragment NavPopout on NavItemPopout_Data {
  label
  children {
    label
    description
    value
    icon
  }
  extra {
    label
    value
    icon
  }
}
    `;
export const AuthorSnippetNavFragmentDoc = `
    fragment AuthorSnippetNav on Authors_Document {
  sys {
    filename
  }
  data {
    ... on Author_Doc_Data {
      image
      name
    }
    ... on Athlete_Doc_Data {
      image
      name
    }
  }
}
    `;
export const NavItemMoreFragmentDoc = `
    fragment NavItemMore on NavItemMore_Data {
  label
  featured_post {
    sys {
      path
      breadcrumbs(excludeExtension: true)
    }
    data {
      __typename
      ... on Post_Doc_Data {
        image
        title
        preface
        author {
          sys {
            filename
          }
          data {
            ... on Author_Doc_Data {
              image
              name
            }
            ... on Athlete_Doc_Data {
              image
              name
            }
          }
        }
      }
    }
  }
  read_more {
    label
    value
  }
  from_the_blog {
    sys {
      path
      breadcrumbs(excludeExtension: true)
    }
    data {
      __typename
      ... on Post_Doc_Data {
        title
        image
        preface
        author {
          ...AuthorSnippetNav
        }
      }
    }
  }
}
    ${AuthorSnippetNavFragmentDoc}`;
export const NavFragmentDoc = `
    fragment Nav on Nav_Document {
  data {
    ... on Nav_Doc_Data {
      show_auth
      items {
        __typename
        ... on NavItemLink_Data {
          ...NavItem
        }
        ... on NavItemPopout_Data {
          ...NavPopout
        }
        ... on NavItemMore_Data {
          ...NavItemMore
        }
      }
    }
  }
}
    ${NavItemFragmentDoc}
${NavPopoutFragmentDoc}
${NavItemMoreFragmentDoc}`;
export const CuratedCollectionFragmentDoc = `
    fragment CuratedCollection on CuratedCollection_Data {
  description
  posts_collection {
    sys {
      collection {
        path
        slug
      }
      breadcrumbs(excludeExtension: true)
    }
    data {
      ... on Post_Doc_Data {
        title
        image
        preface
        _body
        author {
          sys {
            filename
            breadcrumbs(excludeExtension: true)
          }
          data {
            ... on Athlete_Doc_Data {
              name
              image
            }
            ... on Author_Doc_Data {
              name
              image
            }
          }
        }
      }
    }
  }
}
    `;
export const CuratedDocDataFragmentDoc = `
    fragment CuratedDocData on Curated_Doc_Data {
  curations {
    __typename
    ... on CuratedHero_Data {
      hero_post {
        sys {
          collection {
            path
            slug
          }
          breadcrumbs(excludeExtension: true)
        }
        data {
          ... on Post_Doc_Data {
            title
            image
            preface
            _body
            author {
              ... on Authors_Document {
                sys {
                  breadcrumbs(excludeExtension: true)
                  filename
                }
                data {
                  ... on Author_Doc_Data {
                    name
                    image
                    description
                  }
                }
              }
            }
          }
        }
      }
    }
    ... on CuratedCollection_Data {
      ...CuratedCollection
    }
  }
}
    ${CuratedCollectionFragmentDoc}`;
export const AuthorFragmentFragmentDoc = `
    fragment authorFragment on Authors_Document {
  __typename
  id
  sys {
    filename
    collection {
      slug
    }
  }
  data {
    __typename
    ... on Athlete_Doc_Data {
      name
      country
      image
      social_media {
        source
        handle
      }
      personal_bests {
        event
        time
      }
      _body
    }
    ... on Author_Doc_Data {
      name
      accolades {
        figure
        description
      }
      description
      role
      image
      _body
      ebook {
        title
        description
        link
        link_text
        image
      }
    }
  }
}
    `;
export const MemberDocument = `
    query Member($relativePath: String!) {
  getNavDocument(relativePath: "site-nav.md") {
    ...Nav
  }
  getAuthorsDocument(relativePath: $relativePath) {
    sys {
      filename
      collection {
        slug
      }
    }
    data {
      __typename
      ... on Athlete_Doc_Data {
        name
      }
      ... on Author_Doc_Data {
        name
        accolades {
          figure
          description
        }
        description
        role
        image
        story_image
        bio_image
        posts_collection {
          ...ThumbnailPost
        }
        form {
          data {
            ... on JenCcoaching_Doc_Data {
              title
              description
              fields {
                __typename
                ... on FieldText_Data {
                  label
                  name
                  placeholder
                  subLabel
                  prefix
                  suffix
                }
                ... on FieldBoolean_Data {
                  label
                  subLabel
                  name
                }
                ... on FieldRadio_Data {
                  label
                  subLabel
                  placeholder
                  name
                  options {
                    label
                    value
                  }
                }
                ... on FieldGroupText_Data {
                  label
                  subLabel
                  prefix_class
                  fields {
                    __typename
                    ... on FieldText_Data {
                      label
                      subLabel
                      name
                      placeholder
                      prefix
                      suffix
                    }
                  }
                }
                ... on FieldWeekCheckbox_Data {
                  label
                  subLabel
                  name
                }
                ... on FieldTextarea_Data {
                  label
                  subLabel
                  placeholder
                  name
                }
                ... on FieldCheckbox_Data {
                  label
                  subLabel
                  placeholder
                  name
                  options {
                    label
                    value
                  }
                }
              }
            }
          }
        }
        _body
        ebook {
          title
          description
          link
          link_text
          image
        }
      }
    }
  }
}
    ${NavFragmentDoc}
${ThumbnailPostFragmentDoc}`;
const Member = (client: Client) =>  async ({variables }: {variables: MemberQueryVariables}) => {
        return client.request<MemberQuery>(
          `${MemberDocument}`,
          { variables: variables }
        );
      }
      const MemberString = (client: Client) =>  ({variables }: {variables: MemberQueryVariables}) => {
        return {query: gql => gql(MemberDocument), variables}
      }

    
export const BaseAuthorListDocument = `
    query BaseAuthorList {
  getNavDocument(relativePath: "site-nav.md") {
    ...Nav
  }
  page: getPagesDocument(relativePath: "our-team.md") {
    id
    data {
      ... on Page_Doc_Data {
        __typename
        seo {
          title
          description
          image
        }
        layers {
          __typename
          ... on CuratedCollection_Data {
            ...CuratedCollection
          }
          ... on LayerSponsors_Data {
            title
            sponsors {
              name
              link
            }
          }
          ... on LayerCta_Data {
            description
            cta_text
            cta_link
            cta_image
          }
          ... on LayerLeadership_Data {
            title
            leaders {
              ...BaseAuthor
            }
          }
          ... on LayerPostList_Data {
            description
            posts {
              data {
                ... on Post_Doc_Data {
                  title
                  tags
                  preface
                  image
                  image_small
                  author {
                    ...BaseAuthor
                  }
                }
              }
            }
          }
          ... on LayerDarkFeature_Data {
            hint
            title
            description
            feature_list {
              header
              description
            }
          }
        }
      }
    }
  }
  terrence: getAuthorsDocument(relativePath: "terrence.md") {
    ...BaseAuthor
  }
  jen: getAuthorsDocument(relativePath: "jen.md") {
    ...BaseAuthor
  }
  christian: getAuthorsDocument(relativePath: "christian.md") {
    ...BaseAuthor
  }
  chris: getAuthorsDocument(relativePath: "chris.md") {
    ...BaseAuthor
  }
  emily: getAuthorsDocument(relativePath: "emily.md") {
    ...BaseAuthor
  }
  eric: getAuthorsDocument(relativePath: "eric.md") {
    ...BaseAuthor
  }
  heidi: getAuthorsDocument(relativePath: "heidi.md") {
    ...BaseAuthor
  }
  nicole: getAuthorsDocument(relativePath: "nicole.md") {
    ...BaseAuthor
  }
  sarah: getAuthorsDocument(relativePath: "sarah.md") {
    ...BaseAuthor
  }
}
    ${NavFragmentDoc}
${CuratedCollectionFragmentDoc}
${BaseAuthorFragmentDoc}`;
const BaseAuthorList = (client: Client) =>  async ({variables }: {variables?: BaseAuthorListQueryVariables}) => {
        return client.request<BaseAuthorListQuery>(
          `${BaseAuthorListDocument}`,
          { variables: variables }
        );
      }
      const BaseAuthorListString = (client: Client) =>  ({variables }: {variables?: BaseAuthorListQueryVariables}) => {
        return {query: gql => gql(BaseAuthorListDocument), variables}
      }

    
export const HomeDocument = `
    query Home {
  getNavDocument(relativePath: "site-nav.md") {
    ...Nav
  }
  page: getPagesDocument(relativePath: "our-team.md") {
    id
    data {
      ... on Page_Doc_Data {
        __typename
        seo {
          title
          description
          image
        }
        layers {
          __typename
          ... on CuratedCollection_Data {
            ...CuratedCollection
          }
          ... on LayerSponsors_Data {
            title
            sponsors {
              name
              link
            }
          }
          ... on LayerCta_Data {
            description
            cta_text
            cta_link
            cta_image
          }
          ... on LayerLeadership_Data {
            title
            leaders {
              ...BaseAuthor
            }
          }
          ... on LayerPostList_Data {
            description
            posts {
              data {
                ... on Post_Doc_Data {
                  title
                  tags
                  preface
                  image
                  image_small
                  author {
                    ...BaseAuthor
                  }
                }
              }
            }
          }
          ... on LayerDarkFeature_Data {
            hint
            title
            description
            feature_list {
              header
              description
            }
          }
        }
      }
    }
  }
}
    ${NavFragmentDoc}
${CuratedCollectionFragmentDoc}
${BaseAuthorFragmentDoc}`;
const Home = (client: Client) =>  async ({variables }: {variables?: HomeQueryVariables}) => {
        return client.request<HomeQuery>(
          `${HomeDocument}`,
          { variables: variables }
        );
      }
      const HomeString = (client: Client) =>  ({variables }: {variables?: HomeQueryVariables}) => {
        return {query: gql => gql(HomeDocument), variables}
      }

    
export const GetNavDocument = `
    query getNav($relativePath: String!) {
  getNavDocument(relativePath: $relativePath) {
    ...Nav
  }
}
    ${NavFragmentDoc}`;
const getNav = (client: Client) =>  async ({variables }: {variables: GetNavQueryVariables}) => {
        return client.request<GetNavQuery>(
          `${GetNavDocument}`,
          { variables: variables }
        );
      }
      const getNavString = (client: Client) =>  ({variables }: {variables: GetNavQueryVariables}) => {
        return {query: gql => gql(GetNavDocument), variables}
      }

    
export const PostQueryDocument = `
    query PostQuery($relativePath: String!) {
  getNavDocument(relativePath: "site-nav.md") {
    ...Nav
  }
  getPostsDocument(relativePath: $relativePath) {
    id
    data {
      __typename
      ... on Post_Doc_Data {
        title
        accolades {
          figure
          description
        }
        tags
        image
        preface
        _body
        author {
          ...AuthorSnippet
        }
      }
    }
  }
}
    ${NavFragmentDoc}
${AuthorSnippetFragmentDoc}`;
const PostQuery = (client: Client) =>  async ({variables }: {variables: PostQueryQueryVariables}) => {
        return client.request<PostQueryQuery>(
          `${PostQueryDocument}`,
          { variables: variables }
        );
      }
      const PostQueryString = (client: Client) =>  ({variables }: {variables: PostQueryQueryVariables}) => {
        return {query: gql => gql(PostQueryDocument), variables}
      }

    
export const CuratedPostsDocument = `
    query CuratedPosts($relativePath: String!) {
  getNavDocument(relativePath: "site-nav.md") {
    ...Nav
  }
  getCuratedDocument(relativePath: $relativePath) {
    sys {
      filename
    }
    data {
      ... on Curated_Doc_Data {
        ...CuratedDocData
      }
    }
  }
}
    ${NavFragmentDoc}
${CuratedDocDataFragmentDoc}`;
const CuratedPosts = (client: Client) =>  async ({variables }: {variables: CuratedPostsQueryVariables}) => {
        return client.request<CuratedPostsQuery>(
          `${CuratedPostsDocument}`,
          { variables: variables }
        );
      }
      const CuratedPostsString = (client: Client) =>  ({variables }: {variables: CuratedPostsQueryVariables}) => {
        return {query: gql => gql(CuratedPostsDocument), variables}
      }

    
export const StaticPostsPathsDocument = `
    query StaticPostsPaths {
  getCollection(collection: "posts") {
    type
    documents {
      ... on Posts_Document {
        id
        sys {
          filename
        }
      }
    }
  }
}
    `;
const StaticPostsPaths = (client: Client) =>  async ({variables }: {variables?: StaticPostsPathsQueryVariables}) => {
        return client.request<StaticPostsPathsQuery>(
          `${StaticPostsPathsDocument}`,
          { variables: variables }
        );
      }
      const StaticPostsPathsString = (client: Client) =>  ({variables }: {variables?: StaticPostsPathsQueryVariables}) => {
        return {query: gql => gql(StaticPostsPathsDocument), variables}
      }

    
export const AuthorListDocument = `
    query AuthorList($relativePath: String = "site-nav.md") {
  getNavDocument(relativePath: $relativePath) {
    ...Nav
  }
  page: getPagesDocument(relativePath: "our-team.md") {
    id
    data {
      ... on Page_Doc_Data {
        __typename
        layers {
          __typename
          ... on LayerPostList_Data {
            description
            posts {
              data {
                ... on Post_Doc_Data {
                  title
                  tags
                  preface
                  image
                  image_small
                  author {
                    ...authorFragment
                  }
                }
              }
            }
          }
          ... on LayerDarkFeature_Data {
            hint
            title
            description
            feature_list {
              header
              description
            }
          }
        }
      }
    }
  }
  terrence: getAuthorsDocument(relativePath: "terrence.md") {
    ...authorFragment
  }
  jen: getAuthorsDocument(relativePath: "jen.md") {
    ...authorFragment
  }
  christian: getAuthorsDocument(relativePath: "christian.md") {
    ...authorFragment
  }
  chris: getAuthorsDocument(relativePath: "chris.md") {
    ...authorFragment
  }
  emily: getAuthorsDocument(relativePath: "emily.md") {
    ...authorFragment
  }
  eric: getAuthorsDocument(relativePath: "eric.md") {
    ...authorFragment
  }
  heidi: getAuthorsDocument(relativePath: "heidi.md") {
    ...authorFragment
  }
  nicole: getAuthorsDocument(relativePath: "nicole.md") {
    ...authorFragment
  }
  sarah: getAuthorsDocument(relativePath: "sarah.md") {
    ...authorFragment
  }
}
    ${NavFragmentDoc}
${AuthorFragmentFragmentDoc}`;
const AuthorList = (client: Client) =>  async ({variables }: {variables?: AuthorListQueryVariables}) => {
        return client.request<AuthorListQuery>(
          `${AuthorListDocument}`,
          { variables: variables }
        );
      }
      const AuthorListString = (client: Client) =>  ({variables }: {variables?: AuthorListQueryVariables}) => {
        return {query: gql => gql(AuthorListDocument), variables}
      }

    
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
      ...args: any
    ) => Promise<infer R>
      ? R
      : any;
export type FilterByTypename<
      A extends object,
      Property extends string
    > = A extends { __typename: Property } ? A : never;
export const sdk = (client: Client) => ({
Member: Member(client),
MemberString: MemberString(client),
BaseAuthorList: BaseAuthorList(client),
BaseAuthorListString: BaseAuthorListString(client),
Home: Home(client),
HomeString: HomeString(client),
getNav: getNav(client),
getNavString: getNavString(client),
PostQuery: PostQuery(client),
PostQueryString: PostQueryString(client),
CuratedPosts: CuratedPosts(client),
CuratedPostsString: CuratedPostsString(client),
StaticPostsPaths: StaticPostsPaths(client),
StaticPostsPathsString: StaticPostsPathsString(client),
AuthorList: AuthorList(client),
AuthorListString: AuthorListString(client)
});