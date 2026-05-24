import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useFeatures } from "@/hooks/useFeatures/useFeatures";
import { getListEmptyState, hasListFilters } from "@/utilities/listEmptyState";

export const useFeatureList = () => {
  // 🔹 Filters
  const [filterText, setFilterText] = useState("");
  const debouncedFilterText = useDebounce(filterText, 500);

  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔹 Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 🔥 Handlers
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

  // 🔥 API CALL (IMPORTANT — filters pass ho rahe hain)
  const { data, isLoading, isError, error, refetch, isFetching } = useFeatures(
    page,
    limit,
    {
    title: debouncedFilterText || undefined,
    isActive: status === "all" ? undefined : status === "true",
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    }
  );

  // ✅ because select already transformed
  const features = data?.items || [];

  const pagination = data?.pagination || {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  };

  const hasActiveFilters = hasListFilters({
    filterText: debouncedFilterText,
    status,
    startDate,
    endDate,
  });
  const { emptyMessage, emptyDescription } = getListEmptyState(hasActiveFilters);

  return {
    // data
    features,
    pagination,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    emptyMessage,
    emptyDescription,

    // filters
    filterText,
    status,
    startDate,
    endDate,

    // pagination
    page,
    setPage,
    limit,
    setLimit,

    // handlers
    handleSearchChange,
    handleStatusChange,
    handleStartDateChange,
    handleEndDateChange,
    handleClear,
  };
};