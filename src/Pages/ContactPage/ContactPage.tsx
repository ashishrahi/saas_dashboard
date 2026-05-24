"use client";

import { useState } from "react";
import { AppContainer } from "@/AppComponent/AppContainer";
import { AppTable } from "@/AppComponent/AppTable";
import { TablePaginationBar } from "@/components/design-system";
import { AddContactDialog } from "@/AppComponent/AddContactDialog";
import { DeleteModal } from "@/AppComponent/DeleteModal";
import { useDeleteContact } from "@/hooks/useContact/useDeleteContact";
import { useContactList } from "@/hooks/CustomHook/useContactList";
import type { IContact } from "@/types/IContact";
import { columns } from "@/AppComponent/coulmns/contactColumn";
import GlobalHeaderWithFilters from "@/AppComponent/GlobalHeaderWithFilters";

const ContactPage = () => {
  // 🔥 ALL LOGIC FROM HOOK
  const {
    contacts,
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
  } = useContactList();

  const { mutate: deleteContact, isPending: isDeleting } = useDeleteContact();

  // 🔹 UI STATE
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact | undefined>(undefined);
  const [viewMode, setViewMode] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<IContact | undefined>(undefined);

  const handleAdd = () => {
    setSelectedContact(undefined);
    setViewMode(false);
    setIsDialogOpen(true);
  };

  const handleView = (contact: IContact) => {
    setSelectedContact(contact);
    setViewMode(true);
    setIsDialogOpen(true);
  };

  const handleEdit = (contact: IContact) => {
    setSelectedContact(contact);
    setViewMode(false);
    setIsDialogOpen(true);
  };

  const handleDelete = (contact: IContact) => {
    if (isDeleting) return;
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const id = contactToDelete?._id;
    if (!id || isDeleting) return;

    deleteContact(id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setContactToDelete(undefined);
      },
    });
  };

  const handleDialogClose = () => {
    setSelectedContact(undefined);
    setIsDialogOpen(false);
    setViewMode(false);
  };

  return (
    <AppContainer>
      <div className="flex min-h-[70vh] flex-col gap-6">

        {/* ✅ Header */}
        <GlobalHeaderWithFilters
          title="All Contacts"
          onAdd={handleAdd}
          addLabel="+ Add Contact"

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
          data={contacts}
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
        <AddContactDialog
          isOpen={isDialogOpen}
          contactToEdit={selectedContact}
          viewMode={viewMode}
          onClose={handleDialogClose}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={(open) => {
            if (!open && !isDeleting) {
              setIsDeleteModalOpen(false);
              setContactToDelete(undefined);
            }
          }}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
          featureTitle={contactToDelete?.name}
        />
      </div>
    </AppContainer>
  );
};

export default ContactPage;