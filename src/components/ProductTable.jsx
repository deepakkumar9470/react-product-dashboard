import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DollarSign, Pencil, Trash } from "lucide-react"
import { deleteProductData } from "../services/api-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ProductTableSkeleton from "./ProductTableSkeleton";

const ProductTable = ({ products, isLoading, skip, limit, query, total, category, handleUpdateProduct }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductData,
    onSuccess: (data) => {
      queryClient.setQueryData(["products", limit, skip, query, category], (prevData) => {
        if (!prevData) return { products: [data] };
        return {
          ...prevData,
          products: prevData.products.filter((el) => el.id !== data.id)
        };
      });

      toast.success("Product deleted Successfully!");
    },
    onError: () => {
      toast.error("Oops failed to delete product");
    },
  })

  if (isLoading) {
    return <ProductTableSkeleton />
  }

  if (!products || products?.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10 text-lg my-4">
        No product data available
      </p>
    );
  }

  const start = skip + 1;
  const end = Math.min(skip + limit, total);
  return (
    <div className="max-w-6xl py-10 mt-10 mx-auto rounded-xl bg-gray-900 shadow-2xl overflow-hidden">
      <div className="flex justify-between items-center px-4 pb-3">
        <p className="text-gray-400 text-sm">
          Showing <span className="font-semibold">{start}</span> –{" "}
          <span className="font-semibold">{end}</span> of{" "}
          <span className="font-semibold">{total}</span> items
        </p>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="p-4 hover:bg-transparent">
            <TableHead className="w-[200px] text-white text-lg">Title</TableHead>
            <TableHead className="text-white text-lg">Price</TableHead>
            <TableHead className="text-white text-lg">Category</TableHead>
            <TableHead className=" text-white text-lg">Stock</TableHead>
            <TableHead className=" text-white text-lg">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {products?.map((item) => (
            <TableRow
              className="hover:bg-transparent"
              key={item?.id}
            >
              <TableCell className="font-medium text-gray-200 
              ">
                {item.title}
              </TableCell>
              <TableCell className="flex items-center gap-1">
                <DollarSign color="white" size={15} />
                <span
                  className="text-xs text-gray-200 font-medium "
                >
                  {item?.price}
                </span>
              </TableCell>
              <TableCell className="text-gray-200 ">
                {item?.category}
              </TableCell>
              <TableCell className="font-semibold text-gray-200 ">
                {item?.stock}
              </TableCell>
              <TableCell className="flex gap-2 font-semibold text-gray-200 ">
                <Pencil className="text-blue-500 cursor-pointer"
                  onClick={() => handleUpdateProduct(item)} size={16} />
                <Trash className="text-red-500 cursor-pointer" size={16}
                  onClick={() => deleteProduct(item?.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default ProductTable;