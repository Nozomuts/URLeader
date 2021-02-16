import { filterReducer, filters } from "./filter/reducers";
import {
  ActionTypes as FilterActionTypes,
  IFilter,
  IFilterAction,
} from "./filter/types";
import { recordsReducer } from "./records/reducers";
import {
  ActionTypes as RecordsActionTypes,
  IRecord,
  IRecordAction,
} from "./records/types";
import { scheduleReducer } from "./schedule/reducers";
import {
  ISchedule,
  IScheduleAction,
  ActionTypes as ScheduleActionTypes,
} from "./schedule/types";

const data_1 = {
  id: "abc",
  url: "http://example.com",
  date: "2021/12/24 01:23",
  memo: "example",
};
const data_2 = {
  id: "bcd",
  url: "http://example.jp",
  date: "2021/12/24 05:38",
};
const update_data_1 = {
  id: "abc",
  url: "http://update.com",
  date: "2021/03/23 03:45",
  memo: "update",
};

const scheduleData: {
  state: ISchedule[];
  action: IScheduleAction;
  expected: ISchedule[];
}[] = [
  {
    state: [data_1],
    action: { type: ScheduleActionTypes.CREATE_SCHEDULE, payload: data_2 },
    expected: [data_1, data_2],
  },
  {
    state: [],
    action: {
      type: ScheduleActionTypes.READ_SCHEDULE,
      payload: [data_1, data_2],
    },
    expected: [data_1, data_2],
  },
  {
    state: [data_1, data_2],
    action: {
      type: ScheduleActionTypes.UPDATE_SCHEDULE,
      payload: update_data_1,
    },
    expected: [update_data_1, data_2],
  },
  {
    state: [data_1, data_2],
    action: { type: ScheduleActionTypes.DELETE_SCHEDULE, payload: "abc" },
    expected: [data_2],
  },
  {
    state: [data_1, data_2],
    action: { type: ScheduleActionTypes.DELETE_SCHEDULE, payload: "def" },
    expected: [data_1, data_2],
  },
];

const recordsData: {
  state: IRecord[];
  action: IRecordAction;
  expected: IRecord[];
}[] = [
  {
    state: [data_1],
    action: { type: RecordsActionTypes.CREATE_RECORD, payload: data_2 },
    expected: [data_1, data_2],
  },
  {
    state: [],
    action: {
      type: RecordsActionTypes.READ_RECORDS,
      payload: [data_1, data_2],
    },
    expected: [data_1, data_2],
  },
  {
    state: [data_1, data_2],
    action: { type: RecordsActionTypes.DELETE_RECORD, payload: "abc" },
    expected: [data_2],
  },
  {
    state: [data_1, data_2],
    action: { type: RecordsActionTypes.DELETE_RECORD, payload: "def" },
    expected: [data_1, data_2],
  },
  {
    state: [data_1, data_2],
    action: { type: RecordsActionTypes.DELETE_ALL_RECORD },
    expected: [],
  },
];

const filterData: {
  state: IFilter;
  action: IFilterAction;
  expected: IFilter;
}[] = [
  {
    state: filters[0],
    action: {
      type: FilterActionTypes.SET_FILTER,
      payload: filters[2],
    },
    expected: filters[2],
  },
];

describe.each(scheduleData)("schedule reducer", (data) => {
  it("check all schedule reducer", () => {
    expect(scheduleReducer(data.state, data.action)).toEqual(data.expected);
  });
});

describe.each(recordsData)("records reducer", (data) => {
  it("check all records reducer", () => {
    expect(recordsReducer(data.state, data.action)).toEqual(data.expected);
  });
});

describe.each(filterData)("filter reducer", (data) => {
  it("check all filter reducer", () => {
    expect(filterReducer(data.state, data.action)).toEqual(data.expected);
  });
});
