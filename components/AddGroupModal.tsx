"use client";

import { useState } from "react";
import type { GroupRecord } from "@/types/group";

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (record: GroupRecord) => void;
}

export function AddGroupModal({ isOpen, onClose, onAdd }: AddGroupModalProps) {
  const [formData, setFormData] = useState<GroupRecord>({
    group: 0,
    level: 1,
    GivenSession: 1,
    ActualPaid: 0,
    currentDate: new Date().toISOString().slice(0, 10),
    paid: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      group: 0,
      level: 1,
      GivenSession: 1,
      ActualPaid: 0,
      currentDate: new Date().toISOString().slice(0, 10),
      paid: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Add New Group</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group ID
            </label>
            <input
              type="number"
              required
              value={formData.group || ""}
              onChange={(e) => setFormData({...formData, group: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., 2272"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Given Session
              </label>
              <input
                type="number"
                required
                min="1"
                max="8"
                value={formData.GivenSession}
                onChange={(e) => setFormData({...formData, GivenSession: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Date
            </label>
            <input
              type="date"
              required
              value={formData.currentDate}
              onChange={(e) => setFormData({...formData, currentDate: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Actual Paid
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.ActualPaid}
              onChange={(e) => setFormData({...formData, ActualPaid: parseFloat(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.paid}
              onChange={(e) => setFormData({...formData, paid: e.target.checked})}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Mark as Paid
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Add Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
