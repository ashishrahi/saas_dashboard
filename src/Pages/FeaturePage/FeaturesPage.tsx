"use client";

import { useState } from "react";
import { AppContainer } from "@/AppComponent/AppContainer";
import { AppTable } from "@/AppComponent/AppTable";
import { columns } from "@/AppComponent/coulmns/featureColumn";
import { TablePaginationBar } from "@/components/design-system";
import { AddFeatureDialog } from "@/AppComponent/AddFeatureDialog";
import { DeleteModal } from "@/AppComponent/DeleteModal";
import { useDeleteFeature } from "@/hooks/useFeatures/useDeleteFeature";
import { useFeatureList } from "@/hooks/CustomHook/useFeatureList";
import type { IFeature } from "@/types/IFeatures";
import GlobalHeaderWithFilters from "@/AppComponent/GlobalHeaderWithFilters";

const FeaturesPage = () => {
  // 🔥 ALL LOGIC FROM HOOK
  const {
    features,
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
  } = useFeatureList();

  const { mutate: deleteFeature, isPending: isDeleting } = useDeleteFeature();

  // 🔹 UI STATE
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<IFeature | undefined>(undefined);
  const [viewMode, setViewMode] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState<IFeature | undefined>(undefined);

  const handleAdd = () => {
    setSelectedFeature(undefined);
    setViewMode(false);
    setIsDialogOpen(true);
  };

  const handleView = (feature: IFeature) => {
    setSelectedFeature(feature);
    setViewMode(true);
    setIsDialogOpen(true);
  };

  const handleEdit = (feature: IFeature) => {
    setSelectedFeature(feature);
    setViewMode(false);
    setIsDialogOpen(true);
  };

  const handleDelete = (feature: IFeature) => {
    if (isDeleting) return;
    setFeatureToDelete(feature);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const id = featureToDelete?._id;
    if (!id || isDeleting) return;

    deleteFeature(id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setFeatureToDelete(undefined);
      },
    });
  };

  const handleDialogClose = () => {
    setSelectedFeature(undefined);
    setIsDialogOpen(false);
    setViewMode(false);
  };

  return (
    <AppContainer>
      <div className="flex min-h-[70vh] flex-col gap-6">

        {/* ✅ Header + Filters */}
        <GlobalHeaderWithFilters
          title="All Features"
          onAdd={handleAdd}
          addLabel="+ Add Feature"

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
          data={features}
          loading={isLoading}
          error={isError ? error : undefined}
          onRetry={() => refetch()}
          isRetrying={isFetching && !isLoading}
          emptyMessage={emptyMessage}
          emptyDescription={emptyDescription}
          onView={handleView}
          onEdit={handleEdit}
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
        <AddFeatureDialog
          isOpen={isDialogOpen}
          featureToEdit={selectedFeature}
          viewMode={viewMode}
          onClose={handleDialogClose}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={(open) => {
            if (!open && !isDeleting) {
              setIsDeleteModalOpen(false);
              setFeatureToDelete(undefined);
            }
          }}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
          featureTitle={featureToDelete?.title}
        />
      </div>
    </AppContainer>
  );
};

export default FeaturesPage;