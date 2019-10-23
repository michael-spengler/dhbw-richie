import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, ObjectType } from 'typeorm';

@Injectable()
export default class RelationMapper {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  public async createRelation<T>(
    object: T,
    property: keyof T,
    objectType: ObjectType<T>
  ) {
    if (object[property]) {
      if (
        typeof object[property] === 'string' &&
        (object[property] as any).length === 24
      ) {
        const relation = await this.manager.findOne(objectType, object[property]);
        if (!relation) {
          throw new NotFoundException();
        }
        object[property] = relation as any;
      } else {
        throw new BadRequestException();
      }
    }
    return object;
  }
}
