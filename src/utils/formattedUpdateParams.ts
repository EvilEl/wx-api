interface IParams {
  [key: string]: unknown;
}

export function createUpdateParams(params: IParams) {
  return Object.entries(params)
    .map(([key, value]) => {
      return `${key} = '${value}'`;
    })
    .join(", ");
}
