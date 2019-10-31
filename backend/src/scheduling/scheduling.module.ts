import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { ScheduleModule, Schedule, InjectSchedule } from 'nest-schedule';
import { DiscoveryModule, DiscoveryService } from '@nestjs-plus/discovery';
import { METADATA_KEY } from './constants';
import { doForDiscoveryResult } from '../reflection';

const FIND_ALL_FILTER = (t: any) => true;

@Module({
  imports: [ScheduleModule.register(), DiscoveryModule],
  exports: [ScheduleModule],
})
export class SchedulingModule implements OnModuleInit {
  private LOGGER = new Logger(SchedulingModule.name);

  constructor(
    private readonly discoveryService: DiscoveryService,
    @InjectSchedule() private readonly schedule: Schedule,
  ) {}

  public async onModuleInit(): Promise<void> {
    this.LOGGER.debug('Reflecting cron metadata');
    this.discoveryService.providers(FIND_ALL_FILTER).then(services => {
      doForDiscoveryResult(services, METADATA_KEY, refl => {
        const descriptor = Object.getOwnPropertyDescriptor(
          Object.getPrototypeOf(refl.instance),
          refl.propertyKey,
        );
        this.LOGGER.debug(
          `Registering cronjob: '${refl.instanceName} > ${refl.propertyKey}' with pattern '${refl.data}'`,
        );
        this.schedule.scheduleCronJob(
          `${refl.instanceName} > ${refl.propertyKey}`,
          refl.data,
          async () => {
            this.LOGGER.debug(
              `Calling cronjob: '${refl.instanceName} > ${refl.propertyKey}'`,
            );
            await descriptor.value.call(refl.instance);
            return false;
          },
        );
      });
    });
  }
}
