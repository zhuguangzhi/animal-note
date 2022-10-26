export type beforeEachType = {
  from: string;
  to: {
    path: string;
    query: { [key: string]: unknown };
  };
  next: Function;
};
