import { IsDefined, IsMongoId, IsOptional } from 'class-validator';

export class SetRoleModel {
  @IsDefined()
  @IsMongoId()
  user: string;

  @IsOptional()
  isAdmin: boolean;

  @IsOptional()
  isReviewer: boolean;
}
