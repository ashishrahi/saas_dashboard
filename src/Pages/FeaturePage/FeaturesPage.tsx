import { useState } from "react";
import { AppContainer } from "@/AppComponent/AppContainer";
import AppHeaderActions from "@/AppComponent/AppHeaderActions";
import { AppShadCNPagination } from "@/AppComponent/AppShadCNPagination";
import { AppTable } from "@/AppComponent/AppTable";
import { columns } from "@/AppComponent/usercolumnsComponent";
import { AppPageSizeSelectorComponent } from "@/AppComponent/AppPageSizeSelector";
import FilterPanel from "@/AppComponent/AppFilterPanel";
import { AddFeatureDialog } from "@/AppComponent/AddFeatureDialog";

const FeaturesPage = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <AppContainer>
      <div className="p-3 grid gap-6">

        {/* Header */}
        <AppHeaderActions
          title="Add Feature"
          filterText={filterText}
          setFilterText={setFilterText}
          searchText="Features"
          onAddClick={() => setIsDialogOpen(true)}     // FIXED
        />

        <FilterPanel />

        <AppTable columns={columns} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 px-2 gap-2 sm:gap-0">
          <AppPageSizeSelectorComponent />
          <AppShadCNPagination />

          <AddFeatureDialog
            isOpen={isDialogOpen}
            onClose={handleDialogClose}
          />
        </div>
      </div>
    </AppContainer>
  );
};

export default FeaturesPage;
