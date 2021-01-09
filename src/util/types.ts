export type ISchedule = {
  id: string;
  url: string;
  date: string;
  memo: string;
};

export type IFilter = {
  name: string;
  func?: (date: string) => boolean;
};
