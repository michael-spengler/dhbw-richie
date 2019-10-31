import { DiscoveredClass } from '@nestjs-plus/discovery';
import { Logger } from '@nestjs/common';

export interface IReflectionData {
  instanceName: string;
  instance: any;
  propertyKey: string;
  data: any;
}

const LOGGER = new Logger(doForDiscoveryResult.name);

export function doForDiscoveryResult(
  discoveryResult: DiscoveredClass[],
  metadata_key: string,
  func: (refl: IReflectionData) => void,
): void {
  discoveryResult.forEach(result => {
    const instance = result.instance;
    if (!instance) {
      LOGGER.debug('Found undefined/null instance while reflecting');
      return;
    }
    const data =
      Reflect.getMetadata(metadata_key, Object.getPrototypeOf(instance)) || [];

    data.forEach(meta => {
      const reflData = {
        instanceName: result.name,
        instance: result.instance,
        propertyKey: meta.propertyKey,
        data: meta.data,
      } as IReflectionData;
      func(reflData);
    });
  });
}
