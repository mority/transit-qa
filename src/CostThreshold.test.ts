import { expect, test } from 'vitest';
import { tally } from './routes/CostThreshold';

test('empty cost array should return 0', () => {
	expect(tally(23, [])).toBe(0);
});

test('single cost threshold less than value', () => {
	expect(tally(23, [{ threshold: 5, cost: 1 }])).toBe(18);
});

test('single cost threshold equal to value', () => {
	expect(tally(23, [{ threshold: 23, cost: 1 }])).toBe(0);
});

test('single cost threshold greater than value', () => {
	expect(tally(23, [{ threshold: 42, cost: 1 }])).toBe(0);
});

test('cost thresholds less than and greater than value', () => {
	expect(
		tally(23, [
			{ threshold: 5, cost: 1 },
			{ threshold: 42, cost: 1 }
		])
	).toBe(18);
});

test('multiple thresholds', () => {
	expect(
		tally(23, [
			{ threshold: 0, cost: 1 },
			{ threshold: 5, cost: 2 },
			{ threshold: 10, cost: 3 },
			{ threshold: 15, cost: 4 },
			{ threshold: 20, cost: 5 },
			{ threshold: 25, cost: 6 }
		])
	).toBe(65);
});
