import { createMethodMetadataDecorator } from '../../../common/metadata';
import { METADATA_KEY } from '../constants';

export function Cron(
  pattern: string,
): (
  target: object,
  propertyKey: string,
  propertyDesciptor: PropertyDescriptor,
) => void {
  return createMethodMetadataDecorator(METADATA_KEY, pattern);
}
