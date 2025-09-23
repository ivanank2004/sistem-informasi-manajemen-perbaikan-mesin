'use client';
import { useState } from 'react';

interface Incident {
  id: number;
  asset_name: string | null;
  reported_by_name: string | null;
  description: string;
  photo_url: string | null;
  location: string | null;
  status: string;
  created_at: string;
}

interface IncidentDetailModalProps {
  incident: Incident;
  onClose: () => void;
  onIssueWorkOrder?: (id: number) => void;
  onReject?: (id: number) => void; // ✅ tambahkan
}

export default function IncidentDetailModal({
  incident,
  onClose,
  onIssueWorkOrder,
  onReject,
}: IncidentDetailModalProps) {
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
  try {
    setLoading(true);
    await fetch('/api/incident_reports', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: incident.id, status: 'rejected' }),
    });
    onReject?.(incident.id); // ✅ trigger callback ke parent
  } catch (err) {
    console.error('Failed to reject incident:', err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4">Incident #{incident.id}</h3>

        <div className="space-y-2 mb-6">
          <p><strong>Asset:</strong> {incident.asset_name || '-'}</p>
          <p><strong>Reported By:</strong> {incident.reported_by_name || '-'}</p>
          <p><strong>Location:</strong> {incident.location}</p>
          <p><strong>Status:</strong> {incident.status}</p>
          <p><strong>Description:</strong> {incident.description}</p>
          <p>
            <strong>Reported At:</strong>{' '}
            {new Date(incident.created_at).toLocaleString()}
          </p>
          {incident.photo_url && (
            <img
              src={incident.photo_url}
              alt="Incident"
              className="w-full h-auto max-h-[400px] object-contain rounded mt-4"
            />
          )}
        </div>

        {/* Tombol aksi */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleReject}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? 'Rejecting...' : 'Reject'}
          </button>
          <button
            onClick={() => onIssueWorkOrder?.(incident.id)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Issue Work Order
          </button>
        </div>
      </div>
    </div>
  );
}
