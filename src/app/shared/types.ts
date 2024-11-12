export interface ApiKey {
  id: number;
  name: string;
  usage: number;
  key: string;
}

export interface ApiKeyCreateInput {
  name: string;
  usage: number;
} 