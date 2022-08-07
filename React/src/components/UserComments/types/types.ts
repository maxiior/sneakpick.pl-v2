interface iAuthor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  description: string;
  following_count: number;
  followers_count: number;
  average_rating: number;
  is_followed: boolean;
  profile_photo: string;
}

export interface iComment {
  id: string;
  content: string;
  rating: number;
  author: iAuthor;
  created_at: string;
  responses: iComment[];
  parent: string;
}
