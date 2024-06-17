export interface StatusSupply {
  id: number;
  status: string;
}

export interface CitySupply {
  id: number;
  city: string;
}

export interface TypeSupply {
  id: number;
  supplyType: string;
}

export interface WarehouseSupply {
  id: number;
  name: string;
  address: string;
}

export interface Supply {
  id: number;
  number: string;
  date: string;
  city: string;
  quantity: number;
  type: string;
  warehouse: {
    name: string;
    address: string;
  };
  status: string;
}
