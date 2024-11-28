'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { GetAllShops } from '@/app/actions/GetShops';
import { Shop } from '@/lib/types';

export const columns: ColumnDef<Shop>[] = [
  {
    accessorKey: 'name',
    header: 'Shop Name',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'town',
    header: 'Town',
    cell: ({ row }) => <div>{row.getValue('town')}</div>,
  },
  {
    accessorKey: 'province',
    header: 'Province',
    cell: ({ row }) => <div>{row.getValue('province')}</div>,
  },
  {
    accessorKey: 'contact_number',
    header: 'Contact Number',
    cell: ({ row }) => <div>{row.getValue('contact_number')}</div>,
  },
];

export default function Dashboard() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility] = useState<VisibilityState>({});
  const [provinceFilter, setProvinceFilter] = useState<string>('All');

  const fetchShops = async () => {
    setLoading(true);
    try {
      const { data, error } = await GetAllShops();

      if (error) {
        return setError(error);
      }
      setShops(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };
  // Fetch shop data based on user role
  useEffect(() => {
    fetchShops();
  }, []);

  const handleProvinceFilterChange = (selectedProvince: string) => {
    setProvinceFilter(selectedProvince);
    setColumnFilters((prevFilters) => {
      const newFilters = prevFilters.filter(
        (filter) => filter.id !== 'province'
      );
      if (selectedProvince !== 'All') {
        newFilters.push({ id: 'province', value: selectedProvince });
      }
      return newFilters;
    });
  };

  const table = useReactTable({
    data: shops,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const provinces = useMemo(
    () => ['All', ...new Set(shops.map((shop) => shop.province))],
    [shops]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className='text-red-500'>Error: {error}</div>;
  }

  return (
    <div className='w-full mx-auto'>
      <div className='flex items-center gap-4 py-4'>
        <Input
          placeholder='Search by shop name...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='flex items-center'>
              Province: {provinceFilter} <ChevronDown className='ml-2' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {provinces.map((province: string) => (
              <DropdownMenuItem
                key={province}
                onClick={() => handleProvinceFilterChange(province)}
              >
                {province}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
