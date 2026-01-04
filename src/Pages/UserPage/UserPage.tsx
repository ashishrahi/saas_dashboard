import { AppContainer } from '@/AppComponent/AppContainer'
import AppHeaderActions from '@/AppComponent/AppHeaderActions'
import { AppShadCNPagination } from '@/AppComponent/AppShadCNPagination'
import { AppTable } from '@/AppComponent/AppTable'
import { columns } from '@/AppComponent/usercolumnsComponent'
// import type { IUser } from '../../types/IUser';
import { AppPageSizeSelectorComponent } from '@/AppComponent/AppPageSizeSelector'
import FilterPanel from '@/AppComponent/AppFilterPanel'


const UserPage = () => {

  // const handleDelete = (user: IUser) => deleteUser.mutate(user._id);

  return (
    <AppContainer>
      <div className="p-3 grid gap-6">
        {/* Header Actions */}
        <AppHeaderActions
          title="Add User"
          // filterText={filterText}
          // setFilterText={setFilterText}
          searchText="Name"
        />
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
          <AppPageSizeSelectorComponent
          // pageSize={pageSize}
          // setPageSize={setPageSize}
          // setCurrentPage={setCurrentPage}
          />
          <AppShadCNPagination
          // currentPage={currentPage}
          // totalPages={totalPages}
          // onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </AppContainer>
  )
}

export default UserPage
