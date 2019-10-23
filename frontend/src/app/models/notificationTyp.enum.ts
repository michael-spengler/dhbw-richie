export interface SingleNotificationType {
  icon: string;
  class: string;
}
export const NotificationType: { [key: string]: SingleNotificationType } = {
  INFORMATION: {
    icon: 'fad fa-info-circle',
    class: 'inf'
  },
  ERROR: {
    icon: 'fad fa-exclamation-circle',
    class: 'err'
  },
  SUCCESS: {
    icon: 'fad fa-check-circle',
    class: 'suc'
  }
};
