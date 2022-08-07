export enum routes {
  DOMAIN = "http://localhost:8000",
  HOME = "/",
  WTB = "/wtb",
  WTS = "/wts",
  WTT = "/wtt",
  TALK = "/talk",
  PROXY = "/proxy",
  STEAL = "/steal",
  FAQ = "/faq",
  SUPPORT = "/support",
  BUSINESSCONTACT = "/businesscontact",
  FOLLOWED = "/followed",
  ITEM = "/wtb/:item",
  PROFILE = "/profile/:user",
  PROFILE_SETTINGS = "/settings/profile",
  ACCOUNT_SETTINGS = "/settings/account",
  PASSWORD_CHANGE = "/settings/account/password",
  EMAIL_CHANGE = "/settings/account/email",
  DEFAULT_SEARCH = "limit=24&offset=0&ordering=1",
  CATEGORY = "category=",
  BRAND = "brand=",
  POPULAR = "?limit=24&offset=0&ordering=1",
  NEWEST = "?limit=24&offset=0&ordering=5",
  FORGOTTEN_PASSWORD = "/password",
  USER_PROFILE_COMMENTS = "/profile/:user/comments",
  USER_PROFILE_PRODUCTS = "/profile/:user/products",
  ORDERS = "/orders",
  ORDER = "/products/:item/order",
  CALLOUT = "/products/:item/callout",
  STATUTE = "/statute",
  CATEGORY_PATH = "/wtb?category={category}&limit=24&offset=0&ordering=1",
  BRAND_PATH = "/wtb?brand={brand}&limit=24&offset=0&ordering=1",
}

export enum endpoints {
  USER_IMAGES = "/static/user/images/",
  HOST = "http://127.0.0.1:8000/api/",
  MAIN = "",
  IMAGES = "/static/product/images/",
  LOGIN = "users/login/",
  BLACKLIST = "users/logout/blacklist/",
  REGISTER = "users/register/",
  BUMP = "products/{id}/bump/",
  FOLLOW = "users/me/followed-products/",
  GET_USER = "users/{id}/",
  USER_PRODUCTS_LIST = "products/?owner={id}",
  ME = "users/me/",
  EDIT = "users/edit/",

  FOLLOWED_ITEMS = "users/me/followed-products/",
  DELETE_FOLLOWED_ITEMS = "users/me/followed-products/{id}/",

  GET_ALL_ITEMS = "products/{filters}",
  GET_SINGLE_ITEM = "products/{id}/",

  GET_FOLLOWERS = "/users/{id}/followers/",
  GET_FOLLOWING = "/users/{id}/following/",
  POST_FOLLOW = "/users/me/followers/",
  DELETE_UNFOLLOW = "/users/me/followers/{id}/",
  GET_IS_FOLLOWED = "/users/{foreign_id}/followers/?id={id}",

  GET_USER_COMMENTS = "/users/{id}/profile-comments/",
  POST_USER_COMMENTS = "/users/{id}/profile-comments/",
  DELETE_USER_COMMENTS = "/users/me/profile-comments/{comment_id}/",
}