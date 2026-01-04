import { AppContainer } from '@/AppComponent/AppContainer'
// import { AppShadCNPagination } from '@/AppComponent/AppShadCNPagination'
import { AppTable } from '@/AppComponent/AppTable'
import { columns } from '@/AppComponent/usercolumnsComponent'
import FilterPanel from '@/AppComponent/AppFilterPanel'


const UserPage = () => {


  return (
    <AppContainer>
      <div className="p-3 grid gap-6">
      
        {/* Filter */}
        <FilterPanel />

        {/* Table */}
        <AppTable
          columns={columns}
        // data={paginatedUsers}
        // onDelete={handleDelete}
        />
        {/* Bottom Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 px-2 gap-2 sm:gap-0">
         
          {/* <AppShadCNPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          /> */}
        </div>
      </div>
    </AppContainer>
  )
}

export default UserPage
