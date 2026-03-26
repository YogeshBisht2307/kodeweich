import type { UserRole } from "@/utils/constants";

// UI Props
export interface TopBarProps {}

export interface FooterProps {}

// Author
export interface Author {
  name: string | String;
  id: string | String;
}

// Articles
export interface ArticleWidget {
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface ArticleMinimal {
  id: string;
  title: string;
  slug: string;
  published: boolean | Boolean;
  updatedAt: string;
  author: Author;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage: string;
  featuredPost: boolean | Boolean;
  content: string;
  published: boolean | Boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: Author;
}

// Categories and Tags
export interface Category {
  title: string;
  slug: string;
}

export interface Tag {
  title: string;
  slug: string;
}

// Action Request Bodies
export interface EditArticleActionBody {
  id: string;
  title: string;
  content: string;
  slug: string;
  userEmail: string;
  featuredImage: string;
  featuredPost: boolean;
  description: string;
  published: boolean;
  categories: string[];
  tags: string[];
}

export interface CreateArticleActionBody {
  title: string;
  content: string;
  slug: string;
  userEmail: string;
  featuredImage: string;
  featuredPost: boolean;
  description: string;
  published: boolean;
  categories: string[];
  tags: string[];
}

export interface UpdateUserRequestBody {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

// User related types
export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// Action Response
export interface ActionResponse<T = unknown> {
  status: boolean;
  message: string;
  data?: T;
}
