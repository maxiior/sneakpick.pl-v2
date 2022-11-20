export enum routes {
  DOMAIN = "http://localhost:8000",
  HOME = "/",
  WTB = "/wtb",
  WTS = "/wts",
  WTT = "/wtt",
  PROXY = "/proxy",
  PROXY_ADDER = "/proxy/new",
  STEAL = "/steal",
  STEAL_ADDER = "/steal/new",
  FAQ = "/faq",
  SUPPORT = "/support",
  BUSINESSCONTACT = "/businesscontact",
  ACCOUNT_ACTIVATION = "/activation/:uidb64/:token",
  NEW_PASSWORD = "/new-password/:uid/:token",
  FOLLOWED = "/followed",
  PASSWORD_RESETTING = "/password-resetting",
  ITEM = "/wtb/:item",
  ITEM_EDIT = "/wtb/:item/edit",
  PROFILE = "/profile/:user",
  PROFILE_SETTINGS = "/settings/profile",
  ACCOUNT_SETTINGS = "/settings/account",
  SHIPMENT = "/settings/shipment",
  PASSWORD_CHANGE = "/settings/account/password",
  EMAIL_CHANGE = "/settings/account/email",
  DEFAULT_SEARCH = "?limit=24&page=1&ordering=0",
  CATEGORY = "category=",
  BRAND = "brand__in=",
  POPULAR = "?limit=6&page=1&ordering=3",
  NEWEST = "?limit=6&page=1&ordering=4",
  USER_PROFILE_COMMENTS = "/profile/:user/comments",
  USER_PROFILE_PRODUCTS = "/profile/:user/products",
  ORDERS = "/orders",
  ORDER = "/products/:item/order",
  CALLOUT = "/products/:item/callout",
  STATUTE = "/statute",
  CATEGORY_PATH = "/wtb?category={category}&limit=24&page=1&ordering=1",
  BRAND_PATH = "/wtb?brand={brand}&limit=24&page=1&ordering=1",

  TALK = "/talk",
  TALK_DEFAULT_SEARCH = "/talk?ordering=0",
  QUESTION = "/talk/:id",
  ADD_QUESTION = "/talk/new",

  NEW_EMAIL = "/new-email/:uidb64/:token",
  EMAIL_ACTIVATION = "/email-activation/:uidb64/:token",
}

export enum endpoints {
  USER_IMAGES = "/static/user/images/",
  HOST = "http://127.0.0.1:8000/api/",
  MAIN = "",
  ITEMS_IMAGES = "/static/product/images/",
  STORES_IMAGES = "/static/store/images/",
  QUESTIONS_IMAGES = "/static/talk/images/",
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

  POST_ADD_ITEM = "products/",
  GET_ALL_ITEMS = "products/{filters}",
  GET_SINGLE_ITEM = "products/{id}/",

  GET_FOLLOWERS = "/users/{id}/followers/",
  GET_FOLLOWING = "/users/{id}/following/",
  POST_FOLLOW = "/users/me/followers/",
  DELETE_UNFOLLOW = "/users/me/followers/{id}/",
  GET_IS_FOLLOWED = "/users/{foreign_id}/followers/?id={id}",

  GET_USER_COMMENTS = "/users/{id}/profile-comments/?limit=10&offset={offset}",
  POST_USER_COMMENTS = "/users/{id}/profile-comments/",
  DELETE_USER_COMMENTS = "/users/me/profile-comments/{comment_id}/",

  GET_STEALS = "/steal/?limit=24&offset={0}",

  ACCOUNT_ACTIVATION = "/users/activate-user/{uid}/{token}/",

  PASSWORD_RESETTING_MESSAGE = "/users/password-resetting-message/",

  SET_NEW_PASSWORD = "/users/new-password/{uid}/{token}/",

  PUT_PASSWORD_UPDATE = "/users/password-update/",

  POST_EMAIL_UPDATE_MESSAGE = "/users/email-update-message/",
  PUT_NEW_EMAIL = "/users/new-email/{uidb64}/{token}/",
  POST_NEW_EMAIL_ACTIVATION = "/users/email-activation/{uidb64}/{token}/",

  POST_ADD_QUESTION = "/talk/",
  GET_ALL_QUESTIONS = "/talk/?limit=24&offset={offset}&{filters}",

  POST_BUMP_QUESTION = "/talk/{uuid}/bump/",

  POST_INCREASE_QUESTION_VIEWS = "/talk/{uuid}/views/",
  GET_QUESTION = "talk/{id}/",
}
