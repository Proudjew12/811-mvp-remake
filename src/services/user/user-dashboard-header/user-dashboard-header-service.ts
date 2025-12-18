export const dashboardHeaderService = {
  buildModel,
  normalizeSearchValue,
};

export type DashboardHeaderProps = {
  userName: string;
  now?: Date;
  searchPlaceholder?: string;

  onSearch?: (value: string) => void;

  onOpenHelp?: () => void;
  onOpenMessages?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;

  leftLabel?: string;
  showStatusDot?: boolean;
};

type DashboardHeaderModel = {
  userName: string;
  dateText: string;
  timeText: string;
  leftLabel: string;
  searchPlaceholder: string;
  showStatusDot: boolean;

  onSearch: (value: string) => void;
  onOpenHelp: () => void;
  onOpenMessages: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
};

const NOOP = () => {};

const DEFAULTS = {
  locale: "he-IL",
  searchPlaceholder: "חיפוש...",
  leftLabel: "שגרה",
  showStatusDot: true,
};

function buildModel(props: DashboardHeaderProps): DashboardHeaderModel {
  const now = props.now ?? new Date();
  const { dateText, timeText } = _formatMeta(now, DEFAULTS.locale);

  return {
    userName: props.userName,
    dateText,
    timeText,
    leftLabel: props.leftLabel ?? DEFAULTS.leftLabel,
    searchPlaceholder: props.searchPlaceholder ?? DEFAULTS.searchPlaceholder,
    showStatusDot: props.showStatusDot ?? DEFAULTS.showStatusDot,

    onSearch: props.onSearch ?? NOOP,
    onOpenHelp: props.onOpenHelp ?? NOOP,
    onOpenMessages: props.onOpenMessages ?? NOOP,
    onOpenNotifications: props.onOpenNotifications ?? NOOP,
    onOpenProfile: props.onOpenProfile ?? NOOP,
  };
}

function normalizeSearchValue(value: string) {
  return value.trim();
}

function _formatMeta(now: Date, locale: string) {
  const dateText = now.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const timeText = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { dateText, timeText };
}
