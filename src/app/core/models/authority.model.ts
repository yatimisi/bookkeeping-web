import { AuthorityKeys } from '@core/enums/status-keys.enum';


export class Authority {
  id: number;
  user: number;
  book: number;
  authority: AuthorityKeys;
}
