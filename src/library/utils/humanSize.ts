export type HumanSizeParams = number
export interface HumanSizeResult {
  size: number
  unit: "B" | "KB" | "MB" | "GB"
  str: string
}

/**
 * 大小
 * @date 2021-12-14
 */
export function humanSize(size: HumanSizeParams): HumanSizeResult {
  const result: HumanSizeResult = {
    size: size,
    unit: "B",
    str: ""
  };

  if (size > 1024) {
    result.size = parseFloat((size / 1024).toFixed(2));
    result.unit = "KB";
  }

  if (size > 1024 * 1024) {
    result.size = parseFloat((size / (1024 * 1024)).toFixed(2));
    result.unit = "MB";
  }
  if (size > 1024 * 1024 * 1024) {
    result.size = parseFloat((size / (1024 * 1024 * 1024)).toFixed(2));
    result.unit = "GB";
  }
  result.str = `${result.size}${result.unit}`;
  return result;
}