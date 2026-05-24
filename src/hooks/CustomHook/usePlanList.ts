import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { usePlans } from "@/hooks/usePlan/usePlans";
import { getListEmptyState, hasListFilters } from "@/utilities/listEmptyState";

export const usePlanList = () => {
  const [filterText, setFilterText] = useState("");
  const debouncedFilterText = useDebounce(filterText, 500);

  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleSearchChange = (val: string) => {
    setFilterText(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    setPage(1);
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    setPage(1);
  };

  const handleClear = () => {
    setFilterText("");
    setStatus("all");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const {
    data: allPlans = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = usePlans({
    name: debouncedFilterText || undefined,
    isActive: status === "all" ? undefined : status === "true",
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const filteredPlans = useMemo(() => allPlans, [allPlans]);

  const totalPages = Math.ceil(filteredPlans.length / limit) || 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedPlans = useMemo(
    () => filteredPlans.slice((page - 1) * limit, page * limit),
    [filteredPlans, page, limit]
  );

  const pagination = {
    page,
    limit,
    totalItems: filteredPlans.length,
    totalPages,
  };

  const hasActiveFilters = hasListFilters({
    filterText: debouncedFilterText,
    status,
    startDate,
    endDate,
  });
  const { emptyMessage, emptyDescription } = getListEmptyState(hasActiveFilters);

  return {
    plans: paginatedPlans,
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
  };
};
