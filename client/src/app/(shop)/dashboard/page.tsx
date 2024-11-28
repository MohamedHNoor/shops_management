'use client';

import * as React from 'react';
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

import { shops } from '@/lib/placeholder-data';
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
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility] = React.useState<VisibilityState>({});
  const [provinceFilter, setProvinceFilter] = React.useState<string>('All');

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

  const provinces = React.useMemo(
    () => ['All', ...new Set(shops.map((shop) => shop.province))],
    []
  );

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
            {provinces.map((province) => (
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
