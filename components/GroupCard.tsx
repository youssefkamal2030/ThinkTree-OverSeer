"use client";

import { useState } from "react";
import type { GroupRecord } from "@/types/group";

interface GroupCardProps {
  record: GroupRecord;
  onDelete: (group: number, currentDate: string) => void;
  onUpdate: (record: GroupRecord) => void;
  sessionCost: number;
  totalSessions: number;
  msWeek: number;
}

export function GroupCard({ record, onDelete, onUpdate, sessionCost, totalSessions, msWeek }: GroupCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(record);

  const computeDates = () => {
    const current = new Date(record.currentDate);
    const start = new Date(current.getTime() - (record.GivenSession - 1) * msWeek);
    const end = new Date(start.getTime() + (totalSessions - 1) * msWeek);
    return {
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    };
  };

  const dates = computeDates();

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(record);
    setIsEditing(false);
  };

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
      record.paid ? "border-green-200" : "border-red-200"
    }`}>
      {/* Header */}
      <div className={`px-6 py-4 ${record.paid ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-red-500 to-rose-500"}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white">Group {record.group}</h3>
            <p className="text-white/90 text-sm mt-1">Level {record.level}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            record.paid ? "bg-white text-green-600" : "bg-white text-red-600"
          }`}>
            {record.paid ? "PAID" : "NOT PAID"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-4 space-y-3">
        {isEditing ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600 block mb-1">Level</label>
                <input
                  type="number"
                  value={editData.level}
                  onChange={(e) => setEditData({...editData, level: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 block mb-1">Session</label>
                <input
                  type="number"
                  value={editData.GivenSession}
                  onChange={(e) => setEditData({...editData, GivenSession: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Current Date</label>
              <input
                type="date"
                value={editData.currentDate}
                onChange={(e) => setEditData({...editData, currentDate: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Actual Paid</label>
              <input
                type="number"
                value={editData.ActualPaid}
                onChange={(e) => setEditData({...editData, ActualPaid: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editData.paid}
                onChange={(e) => setEditData({...editData, paid: e.target.checked})}
                className="w-4 h-4"
              />
              <label className="text-sm text-gray-700">Mark as Paid</label>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Session</span>
              <span className="font-semibold text-gray-900">{record.GivenSession} / {totalSessions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current Date</span>
              <span className="font-semibold text-gray-900">{record.currentDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Start Date</span>
              <span className="font-semibold text-gray-900">{dates.start}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">End Date</span>
              <span className="font-semibold text-gray-900">{dates.end}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Session Cost</span>
                <span className="text-lg font-bold text-indigo-600">${sessionCost.toFixed(2)}</span>
              </div>
              {record.paid && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Actual Paid</span>
                  <span className="text-lg font-bold text-green-600">${record.ActualPaid.toFixed(2)}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(record.group, record.currentDate)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
