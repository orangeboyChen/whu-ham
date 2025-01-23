/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2025/1/23 18:55
 */
import agconnect from '../../../config/agcconnect';
import {RangeColor, RangeColorData} from "./type";

export const getColorConfig = (): any => {
  const jsonStr = agconnect.remoteConfig().getValueAsString('courseScoreRequestRange');
  const json = JSON.parse(jsonStr) as RangeColorData;
  const map = {};
  json.range.forEach((range: RangeColor) => {
    map[`${range.from}-${range.to}`] = range.color;
  })
  return map;
}
