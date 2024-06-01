import { TrialStatus } from './UIUtils';

export const getTrialStatusColor = (status) => {
  let chipColor;
  switch (status) {
    case TrialStatus.PENDING:
      chipColor = '#4CAF50';
      break;
    case TrialStatus.PROCESSING:
      chipColor = '#2196F3';
      break;
    case TrialStatus.EXPIRED:
      chipColor = '#FF5722';
      break;
    case TrialStatus.REJECTED:
      chipColor = '#F44336';
      break;
    case TrialStatus.APPROVED:
      chipColor = '#039487';
      break;
    case TrialStatus.PURCHASED:
      chipColor = '#9C27B0';
      break;
    case TrialStatus.COMPLETED:
      chipColor = '#607D8B';
      break;
    default:
      chipColor = '#795548';
  }
  return chipColor;
};
