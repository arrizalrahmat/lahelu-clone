export type Donator = {
  username: string;
  avatar: string;
  amount: number;
};

export type Meme = {
  id: string;
  name: string;
  url: string;
  creator: Creator;
  tags: string[];
  upvotes: Upvotes;
  downvotes: Downvotes;
  createdAt: string;
  comments: Comment[];
  donators: Donator[];
};

export type Creator = {
  id: string;
  username: string;
  avatar: string;
};

export type Comment = {
  id: string;
  user: Creator;
  comment: string;
  createdAt: string;
  likes: string[];
};

export type Upvotes = {
  count: number;
  users: string[];
};

export type Downvotes = {
  count: number;
  users: string[];
};

export type MemesResponseType = {
  data: Meme[];
  offset: number;
};

export type MemesStateType = {
  memes: Meme[];
  isLoading: boolean;
  error: any;
  count: number;
  offset: number;
};
