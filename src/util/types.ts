export type ISchedule = {
  id: string;
  url: string;
  date: string;
  memo: string;
};

export type IFilter = {
  name: string;
  description: string;
  func?: (date: string) => boolean;
};
