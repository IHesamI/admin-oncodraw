// import type { Schema, Struct } from '@strapi/strapi';

type Schema = {
  Attribute: {
    String: string;
  }
}

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    description: Schema.Attribute.String &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }> &
    Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
    Schema.Attribute.Private;
    name: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.Unique &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
    Schema.Attribute.Required &
    Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
    Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
    Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.Unique &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
    Schema.Attribute.Private;
    name: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.Unique &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    description: Schema.Attribute.String &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }> &
    Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
    Schema.Attribute.Private;
    name: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.Unique &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
    Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
    Schema.Attribute.Private &
    Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    email: Schema.Attribute.Email &
    Schema.Attribute.Required &
    Schema.Attribute.Private &
    Schema.Attribute.Unique &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 6;
    }>;
    firstname: Schema.Attribute.String &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    isActive: Schema.Attribute.Boolean &
    Schema.Attribute.Private &
    Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
    Schema.Attribute.Private;
    password: Schema.Attribute.Password &
    Schema.Attribute.Private &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 6;
    }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
    Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}
interface Schema {
  Attribute: {
    Text: string;
    String: string;
  }
}
// type Schema.Attribute.Text=string;

export namespace Schema {
  export namespace Attribute {
    export type Text = string;
    export type String = string;
    export type DateTime = Date;
    export type Enumeration<T> = T;
    export type RichText = string;
    export type Boolean = boolean;
    export type Private = unknown;
    export type Media<T, Multiple extends boolean = false> = Multiple extends true ? PluginUploadFile['attributes'][] : PluginUploadFile['attributes'];
    type Integer = number;
  }
}

export interface ApiCaseTypeCaseType extends Struct.CollectionTypeSchema {
  collectionName: 'case_types';
  info: {
    description: '';
    displayName: 'case';
    pluralName: 'case-types';
    singularName: 'case-type';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Text;
    contourStructs: Schema.Attribute.Text;
    convenors: Schema.Attribute.String;
    convenorsGroup: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    eventConvenors: Schema.Attribute.Text;
    eventDate: Schema.Attribute.Date;
    eventDescription: Schema.Attribute.String;
    feedBacks: Schema.Attribute.Component<'feed-back.feed-backs', true>;
    files: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    imageMods: Schema.Attribute.String;
    isOpen: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::case-type.case-type'
    > &
    Schema.Attribute.Private;
    participants: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    schedules: Schema.Attribute.Relation<'oneToMany', 'api::schedule.schedule'>;
    segments: Schema.Attribute.Relation<'oneToMany', 'api::segment.segment'>;
    showIn: Schema.Attribute.Enumeration<'develop'| 'main'>;
    Structures: Schema.Attribute.Component<'structures.structures', true>;
    StudyInstanceId: Schema.Attribute.Text;
    subCategory: Schema.Attribute.Text;
    tab1Content: Schema.Attribute.RichText &
    Schema.Attribute.CustomField<
      'plugin::ckeditor5.CKEditor',
      {
        preset: 'defaultHtml';
      }
    >;
    tab1Title: Schema.Attribute.Text;
    tab2Content: Schema.Attribute.RichText &
    Schema.Attribute.CustomField<
      'plugin::ckeditor5.CKEditor',
      {
        preset: 'defaultHtml';
      }
    >;
    tab2Title: Schema.Attribute.Text;
    tab3content: Schema.Attribute.RichText &
    Schema.Attribute.CustomField<
      'plugin::ckeditor5.CKEditor',
      {
        preset: 'defaultHtml';
      }
    >;
    tab3Title: Schema.Attribute.String;
    tag: Schema.Attribute.Text;
    teacher: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    title: Schema.Attribute.Text;
    tomurTypes: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<'case-library'|'workshop' |'both'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiCommentComment extends Struct.CollectionTypeSchema {
  collectionName: 'comments';
  info: {
    description: '';
    displayName: 'Comment';
    pluralName: 'comments';
    singularName: 'comment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    discussion: Schema.Attribute.Relation<
      'manyToOne',
      'api::discussion.discussion'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::comment.comment'
    > &
    Schema.Attribute.Private;
    owner: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiCourseCourse extends Struct.CollectionTypeSchema {
  collectionName: 'courses';
  info: {
    description: '';
    displayName: 'Course';
    pluralName: 'courses';
    singularName: 'course';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['anatomy,', 'neuroradiology,', 'xray,', 'emergency,']
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    description: Schema.Attribute.RichText &
    Schema.Attribute.CustomField<
      'plugin::ckeditor5.CKEditor',
      {
        preset: 'defaultHtml';
      }
    >;
    difficulty: Schema.Attribute.Integer;
    discussions: ApiDiscussionDiscussion['attributes'][];
    instructors: User[];
    isFree: Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::course.course'
    > &
    Schema.Attribute.Private;
    modules: Schema.Attribute.Relation<'oneToMany', 'api::module.module'>;
    price: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    rates: Schema.Attribute.Relation<'oneToMany', 'api::rate.rate'>;
    thumbnail: Schema.Attribute.Media<'files' | 'images'>;
    title: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiDiscussionDiscussion extends Struct.CollectionTypeSchema {
  collectionName: 'discussions';
  info: {
    description: '';
    displayName: 'Discussion';
    pluralName: 'discussions';
    singularName: 'discussion';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    approvalState: Schema.Attribute.Enumeration<
      ['wait', 'reject', 'approve', 'close']
    > &
    Schema.Attribute.DefaultTo<'wait'>;
    comments: Schema.Attribute.Relation<'oneToMany', 'api::comment.comment'>;
    course: Schema.Attribute.Relation<'manyToOne', 'api::course.course'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::discussion.discussion'
    > &
    Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiGuidelineGuideline extends Struct.CollectionTypeSchema {
  collectionName: 'guidelines';
  info: {
    displayName: 'Guideline';
    pluralName: 'guidelines';
    singularName: 'guideline';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    author: Schema.Attribute.String;
    category: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    files: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::guideline.guideline'
    > &
    Schema.Attribute.Private;
    magazine: Schema.Attribute.String;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    refrenceLink: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiLogLog extends Struct.CollectionTypeSchema {
  collectionName: 'logs';
  info: {
    displayName: 'log';
    pluralName: 'logs';
    singularName: 'log';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    changedFields: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::log.log'> &
    Schema.Attribute.Private;
    Owner: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiModulePartModulePart extends Struct.CollectionTypeSchema {
  collectionName: 'module_parts';
  info: {
    displayName: 'ModulePart';
    pluralName: 'module-parts';
    singularName: 'module-part';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.RichText &
    Schema.Attribute.CustomField<
      'plugin::ckeditor5.CKEditor',
      {
        preset: 'defaultHtml';
      }
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::module-part.module-part'
    > &
    Schema.Attribute.Private;
    media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    order: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    questions: Schema.Attribute.Relation<'oneToMany', 'api::question.question'>;
    title: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiModuleModule extends Struct.CollectionTypeSchema {
  collectionName: 'modules';
  info: {
    description: '';
    displayName: 'Module';
    pluralName: 'modules';
    singularName: 'module';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.RichText &
    Schema.Attribute.CustomField<
      'plugin::ckeditor5.CKEditor',
      {
        preset: 'defaultHtml';
      }
    >;
    course: Schema.Attribute.Relation<'manyToOne', 'api::course.course'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::module.module'
    > &
    Schema.Attribute.Private;
    parts: Schema.Attribute.Relation<
      'oneToMany',
      'api::module-part.module-part'
    >;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiNotificationNotification
  extends Struct.CollectionTypeSchema {
  collectionName: 'notifications';
  info: {
    displayName: 'Notification';
    pluralName: 'notifications';
    singularName: 'notification';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    > &
    Schema.Attribute.Private;
    owners: Schema.Attribute.Relation<
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiOptionOption extends Struct.CollectionTypeSchema {
  collectionName: 'options';
  info: {
    description: '';
    displayName: 'Option';
    pluralName: 'options';
    singularName: 'option';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id: number;
    content: string;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    isCorrect: boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::option.option'
    > &
    Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiResponseResponse extends Struct.CollectionTypeSchema {
  collectionName: 'responses';
  info: {
    displayName: 'Response';
    pluralName: 'responses';
    singularName: 'response';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id: number;
    answer: Schema.Attribute.Relation<'oneToOne', 'api::option.option'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::response.response'
    > &
    Schema.Attribute.Private;
    owner: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    question: Schema.Attribute.Relation<'manyToOne', 'api::question.question'>;
    score: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiPlanPlan extends Struct.CollectionTypeSchema {
  collectionName: 'plans';
  info: {
    description: '';
    displayName: 'Plan';
    pluralName: 'plans';
    singularName: 'plan';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    courses: Schema.Attribute.Relation<'oneToMany', 'api::course.course'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    duration: Schema.Attribute.BigInteger;
    features: Schema.Attribute.JSON;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::plan.plan'> &
    Schema.Attribute.Private;
    price: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['free,', 'Pro']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiQuestionQuestion extends Struct.CollectionTypeSchema {
  collectionName: 'questions';
  info: {
    displayName: 'Question';
    pluralName: 'questions';
    singularName: 'question';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id: number;
    documentId: string;
    responses: ApiResponseResponse['attributes'][];
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::question.question'
    > &
    Schema.Attribute.Private;
    media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    options: ApiOptionOption['attributes'][];
    publishedAt: Schema.Attribute.DateTime;
    score: Schema.Attribute.Integer;
    title: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiRateRate extends Struct.CollectionTypeSchema {
  collectionName: 'rates';
  info: {
    description: '';
    displayName: 'Rate';
    pluralName: 'rates';
    singularName: 'rate';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    course: Schema.Attribute.Relation<'manyToOne', 'api::course.course'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::rate.rate'> &
    Schema.Attribute.Private;
    owner: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    rateCount: Schema.Attribute.Integer;
    title: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface ApiScheduleSchedule extends Struct.CollectionTypeSchema {
  collectionName: 'schedules';
  info: {
    description: '';
    displayName: 'Schedule';
    pluralName: 'schedules';
    singularName: 'schedule';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    case: Schema.Attribute.Relation<'manyToOne', 'api::case-type.case-type'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::schedule.schedule'
    > &
    Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    segments: Schema.Attribute.Relation<'oneToMany', 'api::segment.segment'>;
    startContour: Schema.Attribute.DateTime;
    startView: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    withoutLimit: Schema.Attribute.Boolean;
  };
}

export interface ApiSegmentSegment extends Struct.CollectionTypeSchema {
  collectionName: 'segments';
  info: {
    description: '';
    displayName: 'segment';
    pluralName: 'segments';
    singularName: 'segment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    case: Schema.Attribute.Relation<'manyToOne', 'api::case-type.case-type'>;
    category: Schema.Attribute.Integer;
    color: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    file: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isReleased: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::segment.segment'
    > &
    Schema.Attribute.Private;
    originSegment: Schema.Attribute.Relation<
      'oneToOne',
      'api::segment.segment'
    >;
    publishedAt: Schema.Attribute.DateTime;
    score: Schema.Attribute.Decimal;
    segmentationId: Schema.Attribute.Text;
    seriesInstanceUID: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiSubscriptionSubscription
  extends Struct.CollectionTypeSchema {
  collectionName: 'subscriptions';
  info: {
    description: '';
    displayName: 'Subscription';
    pluralName: 'subscriptions';
    singularName: 'subscription';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    courses: Schema.Attribute.Relation<'oneToMany', 'api::course.course'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    plan: ApiPlanPlan['attributes'];
    duration: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::subscription.subscription'
    > &
    Schema.Attribute.Private;
    owner: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    startTime: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
    Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
    Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
    Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
    Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
    Schema.Attribute.Private;
    name: Schema.Attribute.String &
    Schema.Attribute.SetMinMax<
      {
        max: 50;
        min: 1;
      },
      number
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
    Schema.Attribute.Required &
    Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
    Schema.Attribute.Private;
    name: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
    Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
    Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.Private &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
    Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
    Schema.Attribute.Private;
    name: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 1;
    }>;
    pathId: Schema.Attribute.Integer &
    Schema.Attribute.Required &
    Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
    Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
    Schema.Attribute.Private;
    name: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 3;
    }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    id: number;
    birthDate: Schema.Attribute.Date;
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cases: Schema.Attribute.Relation<'manyToMany', 'api::case-type.case-type'>;
    city: Schema.Attribute.String;
    comments: Schema.Attribute.Relation<'oneToMany', 'api::comment.comment'>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    educationLevel: Schema.Attribute.Enumeration<['resident', 'graduated']>;
    email: Schema.Attribute.Email &
    Schema.Attribute.Required &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 6;
    }>;
    fullName: Schema.Attribute.String;
    gender: Schema.Attribute.Enumeration<['male', 'female', 'other']>;
    generalGraduatedYear: Schema.Attribute.String;
    generalUniversity: Schema.Attribute.String;
    graduatedYear: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
    Schema.Attribute.Private;
    logs: Schema.Attribute.Relation<'oneToMany', 'api::log.log'>;
    major: Schema.Attribute.String;
    maritalStatus: Schema.Attribute.String;
    medicalLicenseNumber: Schema.Attribute.String;
    nationalIdNumber: Schema.Attribute.String;
    notifications: Schema.Attribute.Relation<
      'manyToMany',
      'api::notification.notification'
    >;
    numberOfChildren: Schema.Attribute.String;
    password: Schema.Attribute.Password &
    Schema.Attribute.Private &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 6;
    }>;
    phoneNumber: Schema.Attribute.String;
    provider: Schema.Attribute.String;
    province: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    rates: Schema.Attribute.Relation<'oneToMany', 'api::rate.rate'>;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    segments: Schema.Attribute.Relation<'oneToMany', 'api::segment.segment'>;
    specialtyGraduatedYear: Schema.Attribute.String;
    specialtyUniversity: Schema.Attribute.String;
    subscriptions: Schema.Attribute.Relation<
      'oneToMany',
      'api::subscription.subscription'
    >;
    university: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    username: Schema.Attribute.String &
    Schema.Attribute.Required &
    Schema.Attribute.Unique &
    Schema.Attribute.SetMinMaxLength<{
      minLength: 3;
    }>;
  };
}

export interface ApiProgressProgress extends Struct.CollectionTypeSchema {
  collectionName: 'progresses';
  info: {
    displayName: 'Progress';
    pluralName: 'progresses';
    singularName: 'progress';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    course: Schema.Attribute.Relation<'manyToOne', 'api::course.course'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::progress.progress'
    > &
    Schema.Attribute.Private;
    owner: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    parts: ApiModulePartModulePart;
    publishedAt: Schema.Attribute.DateTime;
    totalTime: Schema.Attribute.BigInteger;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
    Schema.Attribute.Private;
  };
}


declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::case-type.case-type': ApiCaseTypeCaseType;
      'api::comment.comment': ApiCommentComment;
      'api::course.course': ApiCourseCourse;
      'api::discussion.discussion': ApiDiscussionDiscussion;
      'api::guideline.guideline': ApiGuidelineGuideline;
      'api::log.log': ApiLogLog;
      'api::module-part.module-part': ApiModulePartModulePart;
      'api::module.module': ApiModuleModule;
      'api::notification.notification': ApiNotificationNotification;
      'api::option.option': ApiOptionOption;
      'api::plan.plan': ApiPlanPlan;
      'api::question.question': ApiQuestionQuestion;
      'api::rate.rate': ApiRateRate;
      'api::schedule.schedule': ApiScheduleSchedule;
      'api::segment.segment': ApiSegmentSegment;
      'api::subscription.subscription': ApiSubscriptionSubscription;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
