export type User = {
  id?: number;
  email?: string;
  role?: string;
  profile?: Profile;
  created_at?: Date;
  updated_at?: Date;
};

export type Profile = {
  name?: string;
  phone?: null;
  address?: null;
  birth_date?: null;
  preferred_payment?: null;
  profile_photo?: string;
};
