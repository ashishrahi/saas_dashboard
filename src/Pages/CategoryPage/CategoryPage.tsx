  "use client";

  import { useState } from "react";
  import { AppContainer } from "@/AppComponent/AppContainer";
  import { AppTable } from "@/AppComponent/AppTable";
  import { TablePaginationBar } from "@/components/design-system";
  import { AddCategoryDialog } from "@/AppComponent/AddCategoryDialog";
  import { DeleteModal } from "@/AppComponent/DeleteModal";
  import { useDeleteCategory } from "@/hooks/useCategory/useDeleteCategory";
  import type { ICategory } from "@/types/ICategory";
  import { columns } from "@/AppComponent/coulmns/categoryColumn";
  import GlobalHeaderWithFilters from "@/AppComponent/GlobalHeaderWithFilters";
  import { useCategoryList } from "@/hooks/CustomHook/useCategoryList";

  const CategoryPage = () => {
    // ALL LOGIC FROM HOOK
    const {
      categories,
      pagination,
      isLoading,
      isError,
      error,
      refetch,
      isFetching,
      emptyMessage,
      emptyDescription,

      filterText,
      status,
      startDate,
      endDate,

      page,
      setPage,
      limit,
      setLimit,

      handleSearchChange,
      handleStatusChange,
      handleStartDateChange,
      handleEndDateChange,
      handleClear,
    } = useCategoryList();

    const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

    // 🔹 Dialogs (UI specific — correct to keep here)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<ICategory | undefined>(undefined);
    const [viewMode, setViewMode] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<ICategory | undefined>(undefined);

    const handleAdd = () => {
      setCategoryToEdit(undefined);
      setViewMode(false);
      setIsDialogOpen(true);
    };

    const handleEdit = (category: ICategory) => {
      setCategoryToEdit(category);
      setViewMode(false);
      setIsDialogOpen(true);
    };

    const handleView = (category: ICategory) => {
      setCategoryToEdit(category);
      setViewMode(true);
      setIsDialogOpen(true);
    };

    const handleDelete = (category: ICategory) => {
      if (isDeleting) return;
      setCategoryToDelete(category);
      setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
      const id = categoryToDelete?._id;
      if (!id || isDeleting) return;

      deleteCategory(id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setCategoryToDelete(undefined);
        },
      });
    };

    const handleDialogClose = () => {
      setIsDialogOpen(false);
      setCategoryToEdit(undefined);
      setViewMode(false);
    };

    return (
      <AppContainer>
        <div className="flex min-h-[70vh] flex-col gap-6">

          {/* Header + Filters */}
          <GlobalHeaderWithFilters
            title="All Categories"
            onAdd={handleAdd}
            addLabel="+ Add Category"

            onDownloadCsv={() => console.log("Download CSV")}
            onDownloadAll={() => console.log("Download All")}

            search={filterText}
            onSearchChange={handleSearchChange}

            status={status}
            onStatusChange={handleStatusChange}

            startDate={startDate}
            onStartDateChange={handleStartDateChange}

            endDate={endDate}
            onEndDateChange={handleEndDateChange}

            onClear={handleClear}
          />

          <AppTable
            columns={columns}
            data={categories}
            loading={isLoading}
            error={isError ? error : undefined}
            onRetry={() => refetch()}
            isRetrying={isFetching && !isLoading}
            emptyMessage={emptyMessage}
            emptyDescription={emptyDescription}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />

          <TablePaginationBar
            currentPage={page}
            totalPages={pagination.totalPages}
            pageSize={limit}
            onPageChange={setPage}
            onPageSizeChange={setLimit}
          />

          {/* Dialog */}
          <AddCategoryDialog
            isOpen={isDialogOpen}
            categoryToEdit={categoryToEdit}
            viewMode={viewMode}
            onClose={handleDialogClose}
          />

          {/* Delete Modal */}
          <DeleteModal
            isOpen={isDeleteModalOpen}
          onClose={(open) => {
            if (!open && !isDeleting) {
              setIsDeleteModalOpen(false);
              setCategoryToDelete(undefined);
            }
          }}
            onConfirm={handleDeleteConfirm}
            isDeleting={isDeleting}
            featureTitle={categoryToDelete?.name}
          />
        </div>
      </AppContainer>
    );
  };

  export default CategoryPage;