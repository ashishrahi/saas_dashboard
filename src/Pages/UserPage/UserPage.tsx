
import { AppContainer } from "@/AppComponent/AppContainer";
import { AppTable } from "@/AppComponent/AppTable";
import { columns } from "@/AppComponent/coulmns/userColumn";
import { TablePaginationBar } from "@/components/design-system";
import GlobalHeaderWithFilters from "@/AppComponent/GlobalHeaderWithFilters";
import { useUserList } from "@/hooks/CustomHook/useUserList";

const UserPage = () => {
  // 🔥 ALL LOGIC FROM HOOK
  const {
    users,
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
  } = useUserList();

  return (
    <AppContainer>
      <div className="flex min-h-[70vh] flex-col gap-6">

        {/* ✅ Header + Filters */}
        <GlobalHeaderWithFilters
          title="Users"
          onAdd={() => {}}
          addLabel="+ Add User"

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
          data={users}
          loading={isLoading}
          error={isError ? error : undefined}
          onRetry={() => refetch()}
          isRetrying={isFetching && !isLoading}
          emptyMessage={emptyMessage}
          emptyDescription={emptyDescription}
        />

        <TablePaginationBar
          currentPage={page}
          totalPages={pagination.totalPages}
          pageSize={limit}
          onPageChange={setPage}
          onPageSizeChange={setLimit}
        />

      </div>
    </AppContainer>
  );
};

export default UserPage;