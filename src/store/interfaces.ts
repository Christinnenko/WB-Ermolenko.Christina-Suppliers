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
  id: string;
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

export interface SuppliesState {
  supplies: Supply[];
  filteredSupplies: Supply[];
}

export interface SearchState {
  type: string;
  input: string;
}

export interface CustomOptionProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  customStyles?: React.CSSProperties;
}

export interface PaginationProps {
  pageCount: number;
  onChange: ({ selected }: { selected: number }) => void;
  currentPage: number;
}

export interface SupplyCardProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface SearchProps {
  onSearchClear: () => void;
}
