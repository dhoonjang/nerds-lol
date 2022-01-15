export interface IPeopleRequest {
  name: string;
  type: 'up' | 'down';
  reason: string;
}

export interface IPeople {
  name: string;
  discordId: string;
  lolName: string;
  position: string;
  subPosition: string;
  tier: number;
}
