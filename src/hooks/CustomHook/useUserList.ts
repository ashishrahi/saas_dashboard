import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useUsers } from "../useUsers/useUsers";
import { getListEmptyState, hasListFilters, isValidDate } from "@/utilities/listEmptyState";

export const useUserList = () => {
  // 🔹 Filters
  const [filterText, setFilterText] = useState("");
  const debouncedFilterText = useDebounce(filterText, 500);

  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔹 Pagination (client-side)
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

  // 🔥 API (no pagination, no filters)
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useUsers();

  // 🔥 Client-side filtering
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch = user.name
        ?.toLowerCase()
        .includes(debouncedFilterText.toLowerCase());

      const matchStatus =
        status === "all" ? true : user.isActive === (status === "true");

      const createdAt = isValidDate(user.createdAt)
        ? new Date(user.createdAt)
        : null;

      const matchStartDate =
        startDate && createdAt ? createdAt >= new Date(startDate) : !startDate;

      const matchEndDate =
        endDate && createdAt ? createdAt <= new Date(endDate) : !endDate;

      return matchSearch && matchStatus && matchStartDate && matchEndDate;
    });
  }, [users, debouncedFilterText, status, startDate, endDate]);

  const totalPages = Math.ceil(filteredUsers.length / limit) || 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // 🔥 Client-side pagination
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, page, limit]);

  const pagination = {
    page,
    limit,
    totalItems: filteredUsers.length,
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
    // data
    users: paginatedUsers,
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