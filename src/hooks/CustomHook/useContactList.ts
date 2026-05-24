import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useContacts } from "@/hooks/useContact/useContacts";
import {
  getListEmptyState,
  hasListFilters,
  isValidDate,
} from "@/utilities/listEmptyState";

export const useContactList = () => {
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
    data: allContacts = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useContacts({
    name: debouncedFilterText || undefined,
  });

  const filteredContacts = useMemo(() => {
    return allContacts.filter((contact) => {
      const matchStatus =
        status === "all" ? true : contact.isActive === (status === "true");

      const createdAt = isValidDate(contact.createdAt)
        ? new Date(contact.createdAt)
        : null;

      const matchStartDate =
        startDate && createdAt ? createdAt >= new Date(startDate) : !startDate;

      const matchEndDate =
        endDate && createdAt ? createdAt <= new Date(endDate) : !endDate;

      return matchStatus && matchStartDate && matchEndDate;
    });
  }, [allContacts, status, startDate, endDate]);

  const totalPages = Math.ceil(filteredContacts.length / limit) || 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedContacts = useMemo(
    () =>
      filteredContacts.slice((page - 1) * limit, page * limit),
    [filteredContacts, page, limit]
  );

  const pagination = {
    page,
    limit,
    totalItems: filteredContacts.length,
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
    contacts: paginatedContacts,
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
