export class RandomGenerator {
  sample(max: number, count: number): number[] {
    if (count > max) {
      throw new Error(
        'RandomGenerator.sample: count cannot be greater than max',
      );
    }

    const indices: number[] = Array.from({ length: max }, (_, i) => i);

    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    return indices.slice(0, count);
  }

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  chance(probability: number): boolean {
    return Math.random() < probability;
  }
}
