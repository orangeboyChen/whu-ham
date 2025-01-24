/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2025/1/23 18:55
 */
import agconnect, {initAgconnect} from '../../../config/agconnect';
import {RangeColor, RangeColorData} from "./type";

const initRemoteConfig = async () => {
  await initAgconnect();
  await agconnect.remoteConfig().initialized();
  await agconnect.remoteConfig().fetch();
  await agconnect.remoteConfig().apply();
}

export const getColorConfig = async (): Promise<any> => {
  await initRemoteConfig();
  const jsonStr = agconnect.remoteConfig().getValueAsString('courseScoreRequestRange');
  const json = JSON.parse(jsonStr) as RangeColorData;
  const map = {};
  json.range.forEach((range: RangeColor) => {
    map[`${range.from}-${range.to}`] = range.color;
  })
  return map;
}
