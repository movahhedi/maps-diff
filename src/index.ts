import JsonFastStableStringify from "fast-json-stable-stringify";
import { type JSONValue, type JSONValidMap } from "json-types2";

/**
 * Calculates the difference between two maps.
 * `map1` is the base Map, and `map2` is the map to compare against `map1`.
 *
 * @param map1 The base map.
 * @param map2 The map to compare against `map1`.
 * @returns An object representing the difference between the two maps.
 */
export function diffMaps(map1: JSONValidMap, map2: JSONValidMap) {
	const diff = new Map();

	if (!map1) return map2;

	map1.forEach((value1: JSONValue, key: string) => {
		/* if (!map2.has(key)) {
			diff.set(key, value1);
		} else { */

		const value2 = map2.get(key);
		if (typeof value1 === "object" && typeof value2 === "object") {
			if (JsonFastStableStringify(value1) !== JsonFastStableStringify(value2)) {
				diff.set(key, value2);
			}
		} else if (value1 !== value2) {
			diff.set(key, value2);
		}
	});

	map2.forEach((value2: JSONValue, key: string) => {
		if (!map1.has(key)) {
			diff.set(key, value2);
		}
	});

	return diff;
}

export default diffMaps;
