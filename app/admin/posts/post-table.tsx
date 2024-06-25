"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
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
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"
import { updatePostStatusAction, deletePostByIdAction } from "@/actions"
import { ArticleMinimal } from "@/interfaces"
import toast from "react-hot-toast"


interface props {
  articles: ArticleMinimal[]
}

export const PostTable = (props: props) => {
  const [posts, setPosts] = React.useState<ArticleMinimal[]>(props.articles)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const updatePostStatus = async (id: string, published: boolean) => {
    let errorCode = await updatePostStatusAction(id, published);
    if (errorCode != 200) {
      toast.error("Unable to update post status")
      return;
    }

    setPosts(posts.map(item =>
      item.id === id ? { ...item, published: published } : item
    ));
  }

  const deletePost = async (id: string) => {
    let errorCode = await deletePostByIdAction(id);
    if (errorCode != 200) {
      toast.error("Unable to delete post")
      return;
    }

    setPosts((posts) => posts.filter((post) => post.id !== id));
  }

  const columns: ColumnDef<ArticleMinimal>[] = [
    {
      id: "select",
      header: ({ table }: { table: any }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: { row: any }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: any }) => (
        <div className="capitalize">{row.original.published ? "Published" : "Draft"}</div>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: { row: any }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "updatedAt",
      header: () => <div className="text-right">Updated</div>,
      cell: ({ row }: { row: any }) => {
        const updated = new Date(Number(row.original.updatedAt)).toDateString()
        return <div className="text-right font-medium">{updated}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: any }) => {
        const post = row.original
        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href={`/admin/posts/${post.id}/edit-post`}>
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href={`/admin/posts/${post.id}/preview`}>
                    Preview
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updatePostStatus(post.id.toString(), !post.published)}
                >
                  {post.published ? "Save as Draft" : "Publish"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <AlertDialogTrigger>Delete</AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deletePost(post.id.toString())}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      },
    },
  ]

  const data = posts !== null ? posts : [];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Posts..."
          value={table.getColumn("title")?.getFilterValue() as string ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: any) => column.getCanHide())
              .map((column: any) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}