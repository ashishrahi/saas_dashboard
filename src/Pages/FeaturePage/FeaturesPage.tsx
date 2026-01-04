import { useState } from "react";
import { AppContainer } from "@/AppComponent/AppContainer";
import AppHeaderActions from "@/AppComponent/AppHeaderActions";
import { AppShadCNPagination } from "@/AppComponent/AppShadCNPagination";
import { AppTable } from "@/AppComponent/AppTable";
import { columns } from "@/AppComponent/featureColumn";
import { AppPageSizeSelectorComponent } from "@/AppComponent/AppPageSizeSelector";
import FilterPanel from "@/AppComponent/AppFilterPanel";
import { AddFeatureDialog } from "@/AppComponent/AddFeatureDialog";
import { useFeatures } from "@/hooks/useFeatures/useFeatures";

interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}



const FeaturesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useFeatures(page, limit, {
    name: filterText,
  });

  const features = data?.data || [];
  const pagination: Pagination = data?.pagination || {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  };

  const handleDialogClose = () => setIsDialogOpen(false);

  return (
    <AppContainer>
      <div className="p-3 grid gap-6">
        <AppHeaderActions
          title="Add Feature"
          filterText={filterText}
          setFilterText={setFilterText}
          searchText="Features"
          onAddClick={() => setIsDialogOpen(true)}
        />

        <FilterPanel />
<div className="overflow-auto max-h-[600px]">
        <AppTable columns={columns} data={features} loading={isLoading} />
</div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 px-2 gap-2 sm:gap-0">
          <AppPageSizeSelectorComponent
            pageSize={limit}
            setPageSize={(newLimit: number) => {
              setLimit(newLimit);
              setPage(1);
            }}
            setCurrentPage={setPage}
          />


          <AppShadCNPagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />

          <AddFeatureDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
        </div>
      </div>
    </AppContainer>
  );
};

export default FeaturesPage;
