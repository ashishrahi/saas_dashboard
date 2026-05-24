import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useCategories } from "@/hooks/useCategory/useCategories";
import { getListEmptyState, hasListFilters } from "@/utilities/listEmptyState";

type CategoryFilters = {
  name?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
};

export const useCategoryList = () => {
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
    categories: allCategories = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useCategories({
    name: debouncedFilterText,
    isActive: status === "all" ? undefined : status === "true",
    startDate,
    endDate,
  } as CategoryFilters);

  const filteredCategories = useMemo(
    () => allCategories,
    [allCategories]
  );

  const totalPages = Math.ceil(filteredCategories.length / limit) || 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedCategories = useMemo(
    () =>
      filteredCategories.slice((page - 1) * limit, page * limit),
    [filteredCategories, page, limit]
  );

  const pagination = {
    page,
    limit,
    totalItems: filteredCategories.length,
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
    categories: paginatedCategories,
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
