export interface SingleNotificationType {
  icon: string;
  class: string;
}
export const NotificationType: { [key: string]: SingleNotificationType } = {
  INFORMATION: {
    icon: 'ti ti-info',
    class: 'inf'
  },
  ERROR: {
    icon: 'ti ti-error',
    class: 'err'
  },
  SUCCESS: {
    icon: 'ti ti-success',
    class: 'suc'
  }
};
