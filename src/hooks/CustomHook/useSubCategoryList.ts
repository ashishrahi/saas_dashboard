import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSubCategories } from "@/hooks/useSubCategory/useSubCategories";
import { getListEmptyState, hasListFilters, isValidDate } from "@/utilities/listEmptyState";

export const useSubCategoryList = () => {
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
    data: subCategories = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useSubCategories();

  const filteredSubCategories = useMemo(() => {
    return subCategories.filter((item) => {
      const matchSearch = item.name
        ?.toLowerCase()
        .includes(debouncedFilterText.toLowerCase());

      const matchStatus =
        status === "all" ? true : item.isActive === (status === "true");

      const createdAt = isValidDate(item.createdAt)
        ? new Date(item.createdAt)
        : null;

      const matchStartDate =
        startDate && createdAt ? createdAt >= new Date(startDate) : !startDate;

      const matchEndDate =
        endDate && createdAt ? createdAt <= new Date(endDate) : !endDate;

      return matchSearch && matchStatus && matchStartDate && matchEndDate;
    });
  }, [subCategories, debouncedFilterText, status, startDate, endDate]);

  const totalPages = Math.ceil(filteredSubCategories.length / limit) || 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedSubCategories = useMemo(
    () =>
      filteredSubCategories.slice((page - 1) * limit, page * limit),
    [filteredSubCategories, page, limit]
  );

  const pagination = {
    page,
    limit,
    totalItems: filteredSubCategories.length,
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
    subCategories: paginatedSubCategories,
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
