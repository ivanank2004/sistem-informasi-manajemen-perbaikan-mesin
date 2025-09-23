'use client';
import { useEffect, useState } from 'react';
import IncidentDetailModal from '@/components/IncidentDetailModal';

interface Incident {
    id: number;
    asset_id: number | null;
    asset_name: string | null;
    reported_by: number | null;
    reported_by_name: string | null;
    description: string;
    photo_url: string | null;
    location: string | null;
    status: string;
    created_at: string;
}

interface IncidentProps {
    onIssueWorkOrder?: () => void;
}

export default function Incident({ onIssueWorkOrder }: IncidentProps) {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const res = await fetch('/api/incident_reports');
                const result = await res.json();
                setIncidents(result.data || []);
            } catch (err) {
                console.error('Error fetching incidents:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchIncidents();
    }, []);

    if (loading) return <p className="text-center py-4">Loading incident reports...</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Incident Reports</h2>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Asset</th>
                            <th className="border px-4 py-2">Reported By</th>
                            <th className="border px-4 py-2">Location</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Reported At</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    No incident reports found
                                </td>
                            </tr>
                        ) : (
                            incidents.map((incident, index) => (
                                <tr key={incident.id}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{incident.asset_name || '-'}</td>
                                    <td className="border px-4 py-2">{incident.reported_by_name || '-'}</td>
                                    <td className="border px-4 py-2">{incident.location}</td>
                                    <td className="border px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${incident.status === 'resolved'
                                                    ? 'bg-green-100 text-green-700'
                                                    : incident.status === 'in_progress'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {incident.status}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {new Date(incident.created_at).toLocaleString()}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            onClick={() => setSelectedIncident(incident)}
                                            className="text-blue-600 hover:text-blue-800 hover:bg-black/10"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 512 512" > <path fill="black" d="M414 354q-18-18-41-11l-32-32q43-53 43-119q0-80-56-136T192 0T56 56T0 192t56 136t136 56q70 0 119-43l32 32q-6 24 11 41l85 85q13 13 30 13q18 0 30-13q13-13 13-30t-13-30zm-222-13q-62 0-105.5-43.5T43 192T86.5 86.5T192 43t105.5 43.5T341 192t-43.5 105.5T192 341z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {selectedIncident && (
                <IncidentDetailModal
                    incident={selectedIncident}
                    onClose={() => setSelectedIncident(null)}
                    onReject={(id) => {
                        setIncidents((prev) =>
                            prev.map((inc) => (inc.id === id ? { ...inc, status: 'rejected' } : inc))
                        );
                        setSelectedIncident(null);
                    }}
                    onIssueWorkOrder={() => {
                        setSelectedIncident(null);
                        onIssueWorkOrder?.(); // trigger pindah tab corrective
                    }}
                />
            )}
        </div>
    );
}
