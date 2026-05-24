"use client";

import { useState } from "react";
import { AppContainer } from "@/AppComponent/AppContainer";
import { AppTable } from "@/AppComponent/AppTable";
import { TablePaginationBar } from "@/components/design-system";
import { AddPlanDialog } from "@/AppComponent/AddPlanDialog";
import { DeleteModal } from "@/AppComponent/DeleteModal";
import { useDeletePlan } from "@/hooks/usePlan/useDeletePlan";
import { usePlanList } from "@/hooks/CustomHook/usePlanList";
import type { IPlan } from "@/types/IPlan";
import { columns } from "@/AppComponent/coulmns/planColumn";
import GlobalHeaderWithFilters from "@/AppComponent/GlobalHeaderWithFilters";

const PlanPage = () => {
  // 🔥 ALL LOGIC FROM HOOK
  const {
    plans,
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
  } = usePlanList();

  const { mutate: deletePlan, isPending: isDeleting } = useDeletePlan();

  // 🔹 UI STATE
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [planToEdit, setPlanToEdit] = useState<IPlan | undefined>(undefined);
  const [viewMode, setViewMode] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<IPlan | undefined>(undefined);

  const handleAdd = () => {
    setPlanToEdit(undefined);
    setViewMode(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (plan: IPlan) => {
    setPlanToEdit(plan);
    setViewMode(false);
    setIsDialogOpen(true);
  };

  const handleView = (plan: IPlan) => {
    setPlanToEdit(plan);
    setViewMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (plan: IPlan) => {
    if (isDeleting) return;
    setPlanToDelete(plan);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const id = planToDelete?._id;
    if (!id || isDeleting) return;

    deletePlan(id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setPlanToDelete(undefined);
      },
    });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setPlanToEdit(undefined);
    setViewMode(false);
  };

  return (
    <AppContainer>
      <div className="flex min-h-[70vh] flex-col gap-6">

        {/* ✅ Header + Filters */}
        <GlobalHeaderWithFilters
          title="All Plans"
          onAdd={handleAdd}
          addLabel="+ Add Plan"

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
          data={plans}
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
        <AddPlanDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          planToEdit={planToEdit}
          viewMode={viewMode}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={(open) => {
            if (!open && !isDeleting) {
              setIsDeleteModalOpen(false);
              setPlanToDelete(undefined);
            }
          }}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
          featureTitle={planToDelete?.name}
        />
      </div>
    </AppContainer>
  );
};

export default PlanPage;