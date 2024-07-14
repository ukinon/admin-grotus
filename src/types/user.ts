export type User = {
  id?: number;
  email?: string;
  role?: string;
  profile?: Profile;
  profile_photo?: File | Blob | MediaSource | null;
  created_at?: Date;
  updated_at?: Date;
};

export type Profile = {
  name?: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  preferred_payment?: string;
  profile_photo?: string;
};
