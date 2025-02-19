import { splitItemsIntoPackages } from "../../src/utils/package-splitting";

describe("Package Splitting", () => {
  const weightChargeData = [
    { low: 0, high: 5, charge: 10 },
    { low: 5, high: 10, charge: 20 },
    { low: 10, high: 20, charge: 30 },
  ];

  it("should return one package when total price is ≤ $250", () => {
    const items = [
      { id: 1, price: 100, weight: 3 },
      { id: 2, price: 80, weight: 4 },
      { id: 3, price: 50, weight: 2 },
    ];

    const result = splitItemsIntoPackages(items, weightChargeData);

    expect(result).toHaveLength(1);
    expect(result[0].totalPrice).toBe(230);
    expect(result[0].courierCharge).toBeGreaterThan(0);
  });

  it("should split items into multiple packages when total price exceeds $250", () => {
    const items = [
      { id: 1, price: 150, weight: 4 },
      { id: 2, price: 120, weight: 3 },
      { id: 3, price: 50, weight: 2 },
    ];

    const result = splitItemsIntoPackages(items, weightChargeData);

    expect(result.length).toBeGreaterThan(1);
    result.forEach((pkg) => {
      expect(pkg.totalPrice).toBeLessThan(250);
      expect(pkg.courierCharge).toBeGreaterThan(0);
    });
  });

  it("should balance weights across packages", () => {
    const items = [
      { id: 1, price: 200, weight: 15 },
      { id: 2, price: 180, weight: 10 },
      { id: 3, price: 160, weight: 12 },
      { id: 4, price: 140, weight: 8 },
    ];

    const result = splitItemsIntoPackages(items, weightChargeData);

    const totalWeight = result.reduce((sum, pkg) => sum + pkg.totalWeight, 0);
    const avgWeight = totalWeight / result.length;

    result.forEach((pkg) => {
      expect(Math.abs(pkg.totalWeight - avgWeight)).toBeLessThanOrEqual(50);
    });
  });
});
