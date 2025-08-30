import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { categories } from "../constants/category-items";
import toast from "react-hot-toast";
import { addProductData } from "../services/api-services";

const ProductAdd = ({ isDialogOpen, setIsDialogOpen }) => {

  const [inputs, setInputs] = useState({
    title: "",
    price: 0,
    category: "",
    stock: 0
  })

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    })

    )
  }

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addProductData,
    onSuccess: (data) => {
      queryClient.setQueryData(["products"], (prevData) => {
        if (!prevData) return { products: [data] };
        return {
          ...prevData,
          products: [...prevData.products, data],
        };
      });

      toast.success("Product Added Successfully!");
      setIsDialogOpen(false);
    },
  })
  const handleProductSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      const title = formData.get("title");
      const price = Number(formData.get("price"));
      const stock = Number(formData.get("stock"));
      const newProduct = {
        id: 9458,
        title,
        price,
        stock,
        category: inputs.category
      };
      if (!title && title.trim("") || !price || !stock) return;
      mutate(newProduct);
    } catch (error) {
      toast.error(error);
    }
  };


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      <DialogContent className="sm:max-w-[425px] bg-black/100 text-gray-200">
        <DialogTitle>
          Add Product
        </DialogTitle>
        <form onSubmit={handleProductSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input name="title" placeholder="Enter product title.."
                value={inputs.title} onChange={handleChange} />
            </div>
            <div className="grid gap-3">
              <Input name="price" type="number" placeholder="Enter product price.." value={inputs.price} onChange={handleChange} />
            </div>
            <div className="grid gap-3">
              <Select
                value={inputs.category}
                onValueChange={(value) => {
                  setInputs((prev) => ({
                    ...prev,
                    category: value,
                  }));
                }}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-gray-200">
                  <SelectGroup>
                    {categories?.map((category) => (
                      <SelectItem className="text-gray-200" key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

            </div>
            <div className="grid gap-3">
              <Input name="stock" type="number" placeholder="Enter product stocks.."
                value={inputs.stock} onChange={handleChange} />
            </div>
          </div>
          <Button className="w-full cursor-pointer py-2 mt-4" type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>

      </DialogContent>

    </Dialog>
  )
}

export default ProductAdd;