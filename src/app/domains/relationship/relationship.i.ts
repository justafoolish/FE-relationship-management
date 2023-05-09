export interface IPeople {
  _id: string;
  avatar: string;
  last_meeting: string | number | Date;
  first_meeting: string | number | Date;
  notes: string;
  tag: string;
  full_name: string;
  phone?: string;
  email?: string;
}

export interface ICreateRelationshipRequest {
  _id: string;
  name: string;
  tag: string;
  date_meeting: string | number | Date;
  first_meeting: string | number | Date;
  email: string;
  phone: string;
  notes: string;
  avatar: string;
}
