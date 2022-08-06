export type HumanSizeParams = number
export type HumanSizeUnit = "B" | "KB" | "MB" | "GB" | "TB"
export interface HumanSizeResult {
  size: number
  unit: HumanSizeUnit
  str: string
}
export type HumanSizeDef = {
  (size: HumanSizeParams): HumanSizeResult
  SIZE_UNITS: Array<{ size: number, unit: HumanSizeUnit }>
}

/**
 * 大小
 * @date 2021-12-14
 */
export const humanSize: HumanSizeDef = function (size: HumanSizeParams): HumanSizeResult {
  for (let uz of humanSize.SIZE_UNITS) {
    if (size > uz.size) {
      const result: HumanSizeResult = {
        size: parseFloat((size / uz.size).toFixed(2)),
        unit: uz.unit,
        str: ""
      }
      result.str = `${result.size}${result.unit}`;
      return result;
    }
  }
  return { size: size, unit: "B", str: `${size}B` };
}

const units: Array<HumanSizeUnit> = ["B", "KB", "MB", "GB", "TB"];
humanSize.SIZE_UNITS = units
  .map((unit, index) => ({
    size: Math.pow(1024, index),
    unit: unit
  }))
  .reverse();