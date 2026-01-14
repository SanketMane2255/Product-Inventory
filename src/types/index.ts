export type UnitOfMeasure = 'ml' | 'ltr' | 'gm' | 'kg' | 'mtr' | 'mm' | 'box' | 'units';

export type ProductCategory = 'Finished' | 'Semi finished' | 'Subsidiary';

export interface RawMaterial {
  id: string;
  name: string;
  unitOfMeasure: UnitOfMeasure;
  quantity: number;
  price: number;
  totalPrice: number;
  taxAmount: number;
  totalAmount: number;
}

export interface Product {
  id: string;
  name: string;
  unitOfMeasure: UnitOfMeasure;
  category: ProductCategory;
  expiryDate: string;
  totalCost: number;
  materials: RawMaterial[];
}

export type View = 'list' | 'add' | 'edit';

export interface AppState {
  currentView: View;
  selectedProductId: string | null;
}
