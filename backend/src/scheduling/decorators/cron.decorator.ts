import { METADATA_KEY } from '../constants';

function setMetadata<T>(
  METADATA_KEY: string,
  target: object,
  propertyKey: string,
  data?: T
): void {
  const properties: { propertyKey: string; data: T }[] =
    Reflect.getMetadata(METADATA_KEY, target) || [];
  properties.push({ propertyKey, data });
  Reflect.defineMetadata(METADATA_KEY, properties, target);
}

function createMethodMetadataDecorator<T>(
  METADATA_KEY: string,
  data?: T
): (target: object, propertyKey: string, propertyDesciptor: PropertyDescriptor) => void {
  return function registerProperty(
    target: object,
    propertyKey: string,
    propertyDesciptor: PropertyDescriptor
  ): void {
    setMetadata(METADATA_KEY, target, propertyKey, data);
  };
}

export function Cron(
  pattern: string
): (target: object, propertyKey: string, propertyDesciptor: PropertyDescriptor) => void {
  return createMethodMetadataDecorator(METADATA_KEY, pattern);
}
