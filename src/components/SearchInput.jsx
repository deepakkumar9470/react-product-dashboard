import { Input } from "@/components/ui/input";
import debounce from 'lodash.debounce'
const SearchInput = ({ setSearchParams }) => {
  return (
    <div className=' rounded-xl shadow-2xl '>
      <Input
        type="text"
        placeholder="Search Products...."
        className='w-full text-md text-gray-300 p-6 focus:none'
        onChange={debounce(
          (e) => {
            setSearchParams((prev) => {
              prev.set("query", e.target.value);
              prev.set("skip", 0);
              prev.delete("category");

              return prev;
            })
          }, 1000)} />
    </div>
  )
}

export default SearchInput
