export interface GuillotinaUser {
  "@id": string;
  "@type": string;
  "@name": string;
  "@uid": string;
  "@static_behaviors": string[];
  parent: Parent;
  is_folderish: boolean;
  creation_date: Date;
  modification_date: Date;
  username: string;
  email: string;
  name: null;
  user_groups: string[];
  user_roles: string[];
  user_permissions: string[];
  disabled: boolean;
  type_name: string;
  title: string | null;
  uuid: string;
  groups: string[];
  "guillotina.behaviors.dublincore.IDublinCore": GuillotinaBehaviorsDublincoreIDublinCore;
  length: number;
}

export interface GuillotinaBehaviorsDublincoreIDublinCore {
  title: string | null;
  description: string | null;
  creation_date: Date;
  modification_date: Date;
  effective_date: Date | null;
  expiration_date: Date | null;
  creators: string[];
  tags: string[] | null;
  publisher: string | null;
  contributors: string[];
}

export interface Parent {
  "@id": string;
  "@name": string;
  "@type": string;
  "@uid": string;
}
