// User roles
export const USER_ROLES = {
  PRIMARY: "Primary",
  CONTRIBUTOR: "Contributor",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// Error messages
export const ERROR_MESSAGES = {
  // User errors
  USER_NAME_REQUIRED: "User name required",
  USER_EMAIL_REQUIRED: "User email required",
  USER_PASSWORD_REQUIRED: "User password required",
  USER_ID_REQUIRED: "User id required",
  INVALID_USER_ROLE: "Invalid user role",
  USER_ALREADY_EXISTS: "User already exists!",
  EMAIL_ALREADY_IN_USE: "Email already in use by another user",
  UNABLE_TO_CREATE_USER: "Unable to create user",
  UNABLE_TO_UPDATE_USER: "Unable to update user",
  UNABLE_TO_DELETE_USER: "Unable to delete user",

  // Article errors
  ARTICLE_TITLE_REQUIRED: "Article title required",
  ARTICLE_SLUG_REQUIRED: "Article Slug required",
  ARTICLE_ID_REQUIRED: "Article Id required",
  UNABLE_TO_CREATE_ARTICLE: "Unable to create post",
  UNABLE_TO_UPDATE_ARTICLE: "Unable to update post",
  UNABLE_TO_DELETE_ARTICLE: "Unable to delete post",
  UNABLE_TO_UPDATE_POST_STATUS: "Unable to update post status",

  // Category errors
  CATEGORY_TITLE_REQUIRED: "Category title required",
  CATEGORY_SLUG_REQUIRED: "Category slug required",
  CATEGORY_ALREADY_EXISTS: "Category already exists!",
  UNABLE_TO_CREATE_CATEGORY: "Unable to create category",
  UNABLE_TO_DELETE_CATEGORY: "Unable to delete category",

  // Tag errors
  TAG_TITLE_REQUIRED: "Tag title required",
  TAG_SLUG_REQUIRED: "Tag slug required",
  TAG_ALREADY_EXISTS: "Tag already exists!",
  UNABLE_TO_CREATE_TAG: "Unable to create Tag",
  UNABLE_TO_DELETE_TAG: "Unable to delete tag",

  // Generic errors
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

// Success messages
export const SUCCESS_MESSAGES = {
  USER_CREATED: "User created!",
  USER_UPDATED: "User updated!",
  USER_DELETED: "User deleted!",
  ARTICLE_CREATED: "Post Created!",
  ARTICLE_UPDATED: "Post Updated!",
  ARTICLE_DELETED: "Post Deleted!",
  POST_STATUS_UPDATED: "Post Status Updated!",
  CATEGORY_CREATED: "Category Created!",
  CATEGORY_DELETED: "Category deleted!",
  TAG_CREATED: "Tag Created!",
  TAG_DELETED: "Tag deleted!",
} as const;

// Bcrypt configuration
export const BCRYPT_SALT_ROUNDS = 10;

// Cache tags
export const CACHE_TAGS = {
  USERS: "users",
  ARTICLES: "articles",
  CATEGORIES: "categories",
  TAGS: "tags",
} as const;

// Routes
export const ROUTES = {
  // Admin routes
  ADMIN_POSTS: "/admin/posts",
  ADMIN_USERS: "/admin/users",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_TAGS: "/admin/tags",
  ADMIN_SIGN_IN: "/admin/sign-in",
  // Public routes
  HOME: "/",
  BLOGS: "/blogs",
  BLOGS_CATEGORIES: "/blogs/categories",
  BLOGS_TAGS: "/blogs/tags",
} as const;
