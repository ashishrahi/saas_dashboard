"use client";

import { useState } from "react";
import { AppContainer } from "@/AppComponent/AppContainer";
import { AppTable } from "@/AppComponent/AppTable";
import { TablePaginationBar } from "@/components/design-system";
import { AddSubCategoryDialog } from "@/AppComponent/AddSubCategoryDialog";
import { DeleteModal } from "@/AppComponent/DeleteModal";
import { useDeleteSubCategory } from "@/hooks/useSubCategory/useDeleteSubCategory";
import { useSubCategoryList } from "@/hooks/CustomHook/useSubCategoryList";
import type { ISubCategory } from "@/types/ISubCategory";
import { columns } from "@/AppComponent/coulmns/subCategoryColumn";
import GlobalHeaderWithFilters from "@/AppComponent/GlobalHeaderWithFilters";

const SubCategoryPage = () => {
  // 🔥 ALL LOGIC FROM HOOK
  const {
    subCategories,
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
  } = useSubCategoryList();

  const { mutate: deleteSubCategory, isPending: isDeleting } = useDeleteSubCategory();

  // 🔹 UI STATE (same as Category)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subCategoryToEdit, setSubCategoryToEdit] = useState<ISubCategory | undefined>(undefined);
  const [viewMode, setViewMode] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState<ISubCategory | undefined>(undefined);

  const handleAdd = () => {
    setSubCategoryToEdit(undefined);
    setViewMode(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (subCategory: ISubCategory) => {
    setSubCategoryToEdit(subCategory);
    setViewMode(false);
    setIsDialogOpen(true);
  };

  const handleView = (subCategory: ISubCategory) => {
    setSubCategoryToEdit(subCategory);
    setViewMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (subCategory: ISubCategory) => {
    if (isDeleting) return;
    setSubCategoryToDelete(subCategory);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const id = subCategoryToDelete?._id;
    if (!id || isDeleting) return;

    deleteSubCategory(id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSubCategoryToDelete(undefined);
      },
    });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSubCategoryToEdit(undefined);
    setViewMode(false);
  };

  return (
    <AppContainer>
      <div className="flex min-h-[70vh] flex-col gap-6">

        {/* Header + Filters (same as Category) */}
        <GlobalHeaderWithFilters
          title="All SubCategories"
          onAdd={handleAdd}
          addLabel="+ Add SubCategory"

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

        {/* Table */}
        <AppTable
          columns={columns}
          data={subCategories}
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
        <AddSubCategoryDialog
          isOpen={isDialogOpen}
          subCategoryToEdit={subCategoryToEdit}
          viewMode={viewMode}
          onClose={handleDialogClose}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={(open) => {
            if (!open && !isDeleting) {
              setIsDeleteModalOpen(false);
              setSubCategoryToDelete(undefined);
            }
          }}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
          featureTitle={subCategoryToDelete?.name}
        />
      </div>
    </AppContainer>
  );
};

export default SubCategoryPage;