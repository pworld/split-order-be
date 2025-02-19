export interface Item {
    id: number;
    name: string;
    price: number;
    weight: number;
  }
  
  export interface Package {
    id: number;
    items: string;
    totalWeight: number;
    totalPrice: number;
    courierPrice: number;
  }
  
  export const splitItemsIntoPackages = (items: Item[]): Package[] => {
    const maxPricePerPackage = 250;
    const courierPrice = 15;
  
    // Implement package splitting logic here
    const packages: Package[] = [];
    let currentPackage: Item[] = [];
    let currentTotalPrice = 0;
  
    for (const item of items) {
      if (currentTotalPrice + item.price >= maxPricePerPackage) {
        packages.push(createPackage(currentPackage, courierPrice));
        currentPackage = [];
        currentTotalPrice = 0;
      }
      currentPackage.push(item);
      currentTotalPrice += item.price;
    }
  
    if (currentPackage.length > 0) {
      packages.push(createPackage(currentPackage, courierPrice));
    }
  
    return packages;
  };
  
  const createPackage = (items: Item[], courierPrice: number): Package => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    const itemNames = items.map((item) => item.name).join(', ');
  
    return {
      id:0,
      items: itemNames,
      totalWeight,
      totalPrice,
      courierPrice,
    };
  };
  