
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { categories } from "../constants/category-items";

const ProductCategoryFilter = ({setSearchParams}) => {
    return (
        <Select
         onValueChange={(value) => {
          setSearchParams((prev) => {
          const newCat = new URLSearchParams(prev);
          newCat.set("skip", "0");
          newCat.delete("query");
          newCat.set("category", value);
          return newCat;
        });
      }}
        >
            <SelectTrigger className="w-[180px] ">
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
    )
}

export default ProductCategoryFilter;