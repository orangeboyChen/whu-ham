/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2025/1/23 18:55
 */
import {RangeColor, RangeColorData} from "./type";

export const getColorConfig = async (): Promise<any> => {
  const jsonStr = `{"range":[{"from":0,"to":59,"color":"#FF5722"},{"from":60,"to":71,"color":"#FF9800"},{"from":72,"to":77,"color":"#FFC107"},{"from":78,"to":84,"color":"#FFEB3B"},{"from":85,"to":89,"color":"#8BC34A"},{"from":90,"to":100,"color":"#4CAF50"}]}`;
  const json = JSON.parse(jsonStr) as RangeColorData;
  const map = {};
  json.range.forEach((range: RangeColor) => {
    map[`${range.from}-${range.to}`] = range.color;
  })
  return map;
}
