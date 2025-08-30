import { useState } from 'react';
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ProductTable from './components/ProductTable';
import SearchInput from './components/SearchINput';
import { Button } from "@/components/ui/button"
import ProductAdd from './components/ProductAdd';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PaginationComponent from './components/PaginationComponent';
import { useSearchParams } from 'react-router';
import ProductCategoryFilter from './components/ProductCategoryFilter';
import { Toaster } from 'react-hot-toast';
import ProductUpdate from './components/ProductUpdate';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams({ skip: 0, limit: 5 })
  const skip = parseInt(searchParams.get("skip") || 0);
  const limit = parseInt(searchParams.get("limit") || 0);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const { data: products, error, isLoading } = useQuery({
    queryKey: ["products", limit, skip, query, category],
    queryFn: async () => {
      let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${query}`;
      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
      }
      const response = await axios.get(url);
      return response.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 10000
  });

  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const handleCloseSideBar = () => setIsSidebarOpen(false);
  const handleOPenSideBar = () => setIsSidebarOpen(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  const handleMove = (count) => {
    setSearchParams((prev) => {
      prev.set('skip', Math.max(skip + count, 0));
      return prev;
    })
  }


  const handleUpdateProduct = (item) => {
    setProductToUpdate(item)
    setIsUpdateDialogOpen(true)
  }

  if (error) return <p>{error}</p>

  return (
    <div className='flex min-h-screen bg-gray-950'>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {/* Sidebar */}
      <Sidebar isSideBarOpen={isSideBarOpen} handleCloseSideBar={handleCloseSideBar} />
      {/* Main Content */}
      <main className='flex-1'>
        <Header handleOPenSideBar={handleOPenSideBar} />

        <div className='flex items-center justify-between py-10 px-16'>
          <SearchInput setSearchParams={setSearchParams} />
          <div className='flex items-center justify-between gap-4'>
            <ProductCategoryFilter setSearchParams={setSearchParams} />
            <Button variant="secondary" className="cursor-pointer"
              onClick={() => setIsAddDialogOpen(true)}>Add Product</Button>
          </div>
        </div>
        <ProductTable
          skip={skip}
          limit={limit}
          query={query}
          total={products?.products?.length}
          category={category}
          products={products?.products}
          isLoading={isLoading}
          handleUpdateProduct={handleUpdateProduct} />
        {!isLoading && products?.total > 0 && (
          <PaginationComponent
            total={products?.total}
            skip={skip}
            limit={limit}
            handleMove={handleMove}
          />
        )}

        {
          isAddDialogOpen && <ProductAdd
            isDialogOpen={isAddDialogOpen}
            setIsDialogOpen={setIsAddDialogOpen} />
        }
        {
          isUpdateDialogOpen && <ProductUpdate
            productToUpdate={productToUpdate}
            isDialogOpen={isUpdateDialogOpen}
            setIsDialogOpen={setIsUpdateDialogOpen} />
        }
      </main>
    </div>
  )
}

export default App
