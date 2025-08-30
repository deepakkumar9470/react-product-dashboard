import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const ProductTableSkeleton = () => {
  const rows = Array.from({ length: 5 });
  return (
    <div className="max-w-6xl py-10 mt-10 mx-auto rounded-xl bg-gray-900 shadow-2xl overflow-hidden">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="p-4 hover:bg-transparent">
            <TableHead className="w-[200px] text-white text-lg">Title</TableHead>
            <TableHead className="text-white text-lg">Price</TableHead>
            <TableHead className="text-white text-lg">Category</TableHead>
            <TableHead className="text-white text-lg">Stock</TableHead>
            <TableHead className="text-white text-lg">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((_, idx) => (
            <TableRow key={idx} className="hover:bg-transparent">
              <TableCell>
                <Skeleton className="h-5 w-[120px] bg-gray-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[60px] bg-gray-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[80px] bg-gray-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[50px] bg-gray-700" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Skeleton className="h-5 w-5 rounded bg-gray-700" />
                <Skeleton className="h-5 w-5 rounded bg-gray-700" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTableSkeleton;
