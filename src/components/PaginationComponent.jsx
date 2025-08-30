import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationComponent = ({skip,limit,total,handleMove}) => {
  const currentPage = Math.floor(skip / limit) + 1;
  return (
   <div className="flex items-center justify-center mt-2">
     <Pagination>
      <PaginationContent>
        <PaginationItem className="text-white">
          <PaginationPrevious 
          asChild
          disabled={currentPage ===1}
          className="bg-gray-800 cursor-pointer" 
          onClick={()=>handleMove(-limit)}/>
        </PaginationItem>
        <PaginationItem className="text-white">
          <PaginationNext 
          asChild
          disabled={skip + limit >=  total}
          className="bg-gray-800 cursor-pointer" 
          onClick={()=>handleMove(limit)}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
   </div>
  )
}
export default PaginationComponent