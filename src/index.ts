import JsonFastStableStringify from "fast-json-stable-stringify";
import { type JSONValue, type JSONValidMap, type JSONValidObject } from "json-types2";

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

/**
 * Calculates the difference between two objects **of 1 level depth**.
 * `object1` is the base object, and `object2` is the object to compare against `object1`.
 *
 * @remarks This function only compares the first level of properties in the objects. For deep compare you can use `deep-object-diff` on npm.
 *
 * @param object1 The base object.
 * @param object2 The object to compare against `object1`.
 * @returns An object representing the difference between the two objects.
 */
export function diffObjects(object1: JSONValidObject, object2: JSONValidObject) {
	const diff = {};

	if (!object1) return object2;

	Object.keys(object1).forEach((key) => {
		const value1 = object1[key];
		const value2 = object2[key];

		if (typeof value1 === "object" && typeof value2 === "object") {
			if (JsonFastStableStringify(value1) !== JsonFastStableStringify(value2)) {
				diff[key] = value2;
			}
		} else if (value1 !== value2) {
			diff[key] = value2;
		}
	});

	Object.keys(object2).forEach((key) => {
		if (!object1.hasOwnProperty(key)) {
			diff[key] = object2[key];
		}
	});

	return diff;
}
