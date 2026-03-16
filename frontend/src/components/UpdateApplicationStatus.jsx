import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UpdateApplicationStatus.css";

function UpdateApplicationStatus() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEverything();
  }, []);

  const fetchEverything = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/recruiter/applicants/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplicants(res.data.applicants);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:3000/api/recruiter/application/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Status updated to ${status}. Email notification sent.`);
      fetchEverything();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="update-status-container"><h2>Loading Applications...</h2></div>;

  return (
    <div className="update-status-container" style={{flexDirection: 'column', height: '100vh', padding: '40px', overflow: 'hidden'}}>
      <div className="manage-header" style={{marginBottom: '30px'}}>
         <h1 style={{fontSize: '32px', fontWeight: '800', color: '#0f172a'}}>Application Manager</h1>
         <p style={{color: '#64748b'}}>Review and update candidate statuses below.</p>
      </div>

      <div className="status-scroll-grid" style={{overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px', paddingBottom: '20px'}}>
        {applicants.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          applicants.map((app) => (
            <div className="update-card" key={app._id} style={{background: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span className={`status-tag tag-${app.status}`} style={{
                  padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase',
                  backgroundColor: app.status === 'pending' ? '#fef9c3' : app.status === 'accepted' ? '#dcfce7' : '#fee2e2',
                  color: app.status === 'pending' ? '#854d0e' : app.status === 'accepted' ? '#166534' : '#991b1b'
                }}>
                  {app.status}
                </span>
                <span style={{fontSize: '11px', color: '#94a3b8'}}>ID: {app._id.substring(0,8)}</span>
              </div>

              <h3 style={{fontSize: '20px', color: '#1e293b', marginBottom: '5px'}}>{app.applicant?.username}</h3>
              <p style={{fontSize: '14px', color: '#64748b', marginBottom: '15px'}}>{app.applicant?.email}</p>

              <div style={{background: '#f8fafc', padding: '12px', borderRadius: '10px', marginBottom: '20px'}}>
                 <p style={{fontSize: '12px', color: '#475569', marginBottom: '4px'}}>APPLIED FOR</p>
                 <p style={{fontSize: '15px', fontWeight: '700', color: '#0f172a'}}>{app.job?.title}</p>
                 <p style={{fontSize: '13px', color: '#3b82f6'}}>{app.job?.company?.name}</p>
              </div>

              <div className="action-row" style={{display: 'flex', gap: '10px'}}>
                <button 
                  onClick={() => handleAction(app._id, 'accepted')}
                  disabled={app.status === 'accepted'}
                  style={{flex: 1, padding: '12px', border: 'none', borderRadius: '10px', background: '#22c55e', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: app.status === 'accepted' ? 0.5 : 1}}
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleAction(app._id, 'rejected')}
                  disabled={app.status === 'rejected'}
                  style={{flex: 1, padding: '12px', border: 'none', borderRadius: '10px', background: '#ef4444', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: app.status === 'rejected' ? 0.5 : 1}}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UpdateApplicationStatus;
