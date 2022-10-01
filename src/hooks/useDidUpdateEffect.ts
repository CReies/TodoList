import { useEffect, useRef } from 'react';
import type { DependencyList } from 'react';

export const useDidUpdateEffect = (fn: Function, inputs: DependencyList) => {
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) return fn();

		didMountRef.current = true;
	}, inputs);
};
