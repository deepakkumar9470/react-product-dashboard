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
import { updateProductData } from "../services/api-services";

const ProductUpdate = ({ isDialogOpen, setIsDialogOpen, skip, limit, query, category, productToUpdate }) => {

    const [inputs, setInputs] = useState({
        id: productToUpdate?.id,
        title: productToUpdate?.title || "",
        price: productToUpdate?.price || 0,
        category: productToUpdate?.category || "",
        stock: productToUpdate?.stock || 0
    })

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })

        )
    }

    const queryClient = useQueryClient();
    const { mutate: updateProduct, isPending } = useMutation({
        mutationFn: ({ id, data }) => updateProductData(id, data),
        onSuccess: (newData) => {
            queryClient.setQueryData(
                ["products", limit, skip, query, category],
                (prevData) => {
                    if (!prevData?.products) return { products: [newData] };
                    return {
                        ...prevData,
                        products: prevData.products.map((el) =>
                            el.id === newData.id ? newData : el
                        ),
                    };
                }
            );
            queryClient.invalidateQueries(
                ["products", limit, skip, query, category],
                { exact: true }
            );

            toast.success("Product Updated Successfully!");
            setIsDialogOpen(false);
        },
        onError: (error) => {
            console.log(error);
            toast.error("Oops failed to update product");
        },
    });

    const handleProductSubmit = async (e) => {
        e.preventDefault()
        try {

            const { id, ...data } = inputs;
            if (!inputs?.title && inputs?.title.trim("") || !inputs?.price || !inputs?.stock) return;
            updateProduct({ id, data });
        } catch (error) {
            toast.error(error);
        }
    };


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
            <DialogContent className="sm:max-w-[425px] bg-black/100 text-gray-200">
                <DialogTitle>
                    Update Product
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
                        {isPending ? "Updating..." : "Submit"}
                    </Button>
                </form>

            </DialogContent>

        </Dialog>
    )
}

export default ProductUpdate;