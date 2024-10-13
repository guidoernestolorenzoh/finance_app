"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { DataCard, DataCardLoading } from "./data-card";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export const DataGrid = () => {
const {data, isLoading} = useGetSummary();
const params = useSearchParams();
const from = params.get("from") || undefined;
const to = params.get("to") || undefined;

const dateRangeLabel = formatDateRange({ to, from });

if (isLoading) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCardLoading/>
            <DataCardLoading/>
            <DataCardLoading/>
        </div>
    )
}
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCard 
            title="Remaining"
            value={data?.remainingAmount}
            percentageChange={data?.remainingChange}
            icon={FaPiggyBank}
            variant="white"
            dateRange={dateRangeLabel}
            color="bg-gradient-to-r from-teal-700 to-teal-500 text-white"
        />
        <DataCard 
            title="Income"
            value={data?.incomeAmount}
            percentageChange={data?.incomeChange}
            icon={FaArrowTrendUp}
            variant="white"
            dateRange={dateRangeLabel}
            color="text-white bg-gradient-to-r from-indigo-700 to-indigo-500"
        />
        <DataCard 
            title="Expenses"
            value={data?.expensesAmount}
            percentageChange={data?.expensesChange}
            icon={FaArrowTrendDown}
            variant="white"
            dateRange={dateRangeLabel}
            color="text-white bg-gradient-to-r from-orange-700 to-orange-500"
        />
    </div>
  )
}
