export type Product = {
  id: number;
  price: number;
  weight: number;
};

export type Package = {
  items: Product[];
  totalPrice: number;
  totalWeight: number;
  courierCharge: number;
};

// Define weight-based courier charges
export const weightChargeData = [
  { low: 0, high: 200, charge: 5 },
  { low: 200, high: 500, charge: 10 },
  { low: 500, high: 1000, charge: 15 },
  { low: 1000, high: 5000, charge: 20 },
];

/**
 * Function to determine the courier charge based on weight.
 */
function getCourierCharge(weight: number): number {
  const charge_entry = weightChargeData.find(
    (entry) => weight >= entry.low && weight < entry.high
  );
  return charge_entry ? charge_entry.charge : 0; // Default charge 0 if weight exceeds range
}

/**
 * Function to split items into packages based on pricing and weight distribution.
 */
function splitItemsIntoPackages(items: Product[]): Package[] {
  // Calculate total order price
  const total_order_price = items.reduce((sum, item) => sum + item.price, 0);

  // Condiition 1: If total price is ≤ $250, return all items in one package
  if (total_order_price <= 250) {
    const total_weight = items.reduce((sum, item) => sum + item.weight, 0);
    return [
      {
        items,
        totalPrice: total_order_price,
        totalWeight: total_weight,
        courierCharge: getCourierCharge(total_weight),
      },
    ];
  }

  // Condition 2: If total price is > $250, split items into packages
  // Sort items by price in descending order to optimize packing
  items.sort((a, b) => b.price - a.price);

  let packages: Package[] = [];
  let current_package: Package = { items: [], totalPrice: 0, totalWeight: 0, courierCharge: 0 };

  for (const item of items) {
    // If adding this item exceeds $250, start a new package
    if (current_package.totalPrice + item.price >= 250) {
      current_package.courierCharge = getCourierCharge(current_package.totalWeight);
      packages.push(current_package);
      current_package = { items: [], totalPrice: 0, totalWeight: 0, courierCharge: 0 };
    }

    // Add the item to the current package
    current_package.items.push(item);
    current_package.totalPrice += item.price;
    current_package.totalWeight += item.weight;
  }

  // Take care of the last package
  if (current_package.items.length > 0) {
    current_package.courierCharge = getCourierCharge(current_package.totalWeight);
    packages.push(current_package);
  }

  // condition 3: While splitting, NO PACKAGE can have a total price equal or above $250
  // Balance the weight across packages
  balanceWeights(packages);

  return packages;
}

/**
 * Helper function to balance weight across packages.
 */
function balanceWeights(packages: Package[]): void {
  const total_weight = packages.reduce((sum, p) => sum + p.totalWeight, 0);
  const avg_weight = total_weight / packages.length;

  let adjustments = true;
  while (adjustments) {
    adjustments = false;
    for (let i = 0; i < packages.length - 1; i++) {
      if (Math.abs(packages[i].totalWeight - avg_weight) > 50) {
        let heavier = packages[i].totalWeight > avg_weight ? packages[i] : packages[i + 1];
        let lighter = heavier === packages[i] ? packages[i + 1] : packages[i];

        const transferableItem = heavier.items.find((item) =>
          heavier.totalWeight - item.weight >= avg_weight &&
          lighter.totalWeight + item.weight <= avg_weight
        );

        if (transferableItem) {
          heavier.items = heavier.items.filter(it => it.id !== transferableItem.id);
          lighter.items.push(transferableItem);

          heavier.totalWeight -= transferableItem.weight;
          heavier.totalPrice -= transferableItem.price;
          lighter.totalWeight += transferableItem.weight;
          lighter.totalPrice += transferableItem.price;

          heavier.courierCharge = getCourierCharge(heavier.totalWeight);
          lighter.courierCharge = getCourierCharge(lighter.totalWeight);

          adjustments = true;
        }
      }
    }
  }
}

export { splitItemsIntoPackages };
