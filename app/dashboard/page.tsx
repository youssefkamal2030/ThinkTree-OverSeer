"use client";

import { useState } from "react";
import { GroupCard } from "@/components/GroupCard";
import { AddGroupModal } from "@/components/AddGroupModal";
import { StatsCard } from "@/components/StatsCard";
import type { GroupRecord } from "@/types/group";

const totalSessions = 8;
const msWeek = 7 * 24 * 60 * 60 * 1000;

const initialData: GroupRecord[] = [
  {group: 2272, level: 5, GivenSession: 3, ActualPaid: 0, currentDate: "2026-04-11", paid: false},
  {group: 2236, level: 3, GivenSession: 4, ActualPaid: 0, currentDate: "2026-04-11", paid: false},
  {group: 1893, level: 3, GivenSession: 5, ActualPaid: 0, currentDate: "2026-04-12", paid: false},
  {group: 2026, level: 5, GivenSession: 6, ActualPaid: 192, currentDate: "2026-04-12", paid: true},
  {group: 2231, level: 5, GivenSession: 4, ActualPaid: 0, currentDate: "2026-04-12", paid: false},
  {group: 2768, level: 3, GivenSession: 1, ActualPaid: 0, currentDate: "2026-04-12", paid: false},
  {group: 2657, level: 6, GivenSession: 5, ActualPaid: 0, currentDate: "2026-04-28", paid: false},
  {group: 3122, level: 4, GivenSession: 8, ActualPaid: 100, currentDate: "2026-04-29", paid: true},
  {group: 1872, level: 4, GivenSession: 8, ActualPaid: 174, currentDate: "2026-04-29", paid: true},
  {group: 3122, level: 4, GivenSession: 8, ActualPaid: 0, currentDate: "2026-04-29", paid: false},
  {group: 2211, level: 6, GivenSession: 7, ActualPaid: 0, currentDate: "2026-05-01", paid: false},
  {group: 3211, level: 6, GivenSession: 8, ActualPaid: 100, currentDate: "2026-04-02", paid: true},
  {group: 2832, level: 5, GivenSession: 4, ActualPaid: 0, currentDate: "2026-05-02", paid: false},
  {group: 3138, level: 5, GivenSession: 8, ActualPaid: 100, currentDate: "2026-05-03", paid: true},
  {group: 2299, level: 9, GivenSession: 5, ActualPaid: 0, currentDate: "2026-05-03", paid: false},
];

function sessionCost(level: number): number {
  return (120 * level + 680) / 8;
}

export default function DashboardPage() {
  const [data, setData] = useState<GroupRecord[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");

  const handleDelete = (group: number, currentDate: string) => {
    setData(data.filter(r => !(r.group === group && r.currentDate === currentDate)));
  };

  const handleUpdate = (updatedRecord: GroupRecord) => {
    setData(data.map(r => 
      (r.group === updatedRecord.group && r.currentDate === updatedRecord.currentDate) 
        ? updatedRecord 
        : r
    ));
  };

  const handleAdd = (newRecord: GroupRecord) => {
    setData([...data, newRecord]);
  };

  const filteredData = data.filter(r => {
    if (filter === "paid") return r.paid;
    if (filter === "unpaid") return !r.paid;
    return true;
  });

  const totalUnpaid = data.reduce((sum, r) => 
    r.paid ? sum : sum + sessionCost(r.level), 0
  );

  const totalPaid = data.reduce((sum, r) => 
    r.paid ? sum + r.ActualPaid : sum, 0
  );

  const unpaidCount = data.filter(r => !r.paid).length;
  const paidCount = data.filter(r => r.paid).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Group Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your group sessions and payments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Groups"
            value={data.length}
            icon="📊"
            color="blue"
          />
          <StatsCard
            title="Unpaid Sessions"
            value={`$${totalUnpaid.toFixed(2)}`}
            subtitle={`${unpaidCount} groups`}
            icon="💰"
            color="red"
          />
          <StatsCard
            title="Total Paid"
            value={`$${totalPaid.toFixed(2)}`}
            subtitle={`${paidCount} groups`}
            icon="✅"
            color="green"
          />
          <StatsCard
            title="Formula"
            value="(120×n + 680) ÷ 8"
            subtitle="Session cost"
            icon="🧮"
            color="purple"
          />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "all"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              All ({data.length})
            </button>
            <button
              onClick={() => setFilter("paid")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "paid"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Paid ({paidCount})
            </button>
            <button
              onClick={() => setFilter("unpaid")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "unpaid"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Unpaid ({unpaidCount})
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            + Add Group
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((record, idx) => (
            <GroupCard
              key={`${record.group}-${record.currentDate}-${idx}`}
              record={record}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              sessionCost={sessionCost(record.level)}
              totalSessions={totalSessions}
              msWeek={msWeek}
            />
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No groups found</p>
          </div>
        )}
      </div>

      {/* Add Group Modal */}
      <AddGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
