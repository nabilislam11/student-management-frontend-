import axios, { AxiosError } from "axios";
import { useState } from "react";

interface RegisData {
  username: string;
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const Registration = () => {
  const [error, setError] = useState<string>("");
  const [msg, setmsg] = useState<string>("");
  const [regisData, setRegisData] = useState<RegisData>({
    username: "",
    email: "",
    password: "",
  });

  const handleCange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisData({ ...regisData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post<ApiResponse>(
        "http://localhost:8000/registration",
        regisData,
      );
      console.log(res.data);
      if (res?.data?.success == false) {
        setError(res?.data?.message);
      } else {
        setError("");
        setmsg(res?.data?.message);
      }
    } catch (err) {
      console.log("FULL ERROR:", err);
      const axiosErr = err as AxiosError<ApiResponse>;
      console.log("SERVER DATA:", axiosErr.response?.data);

      if (axiosErr.response) {
        setError(axiosErr.response.data?.message ?? "Something went wrong");
      } else {
        setError("Something went wrong");
      }
      setmsg("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-wrapper {
          font-family: 'Sora', sans-serif;
          width: 100%;
          max-width: 440px;
        }

        .reg-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 24px;
          padding: 44px 40px;
          backdrop-filter: blur(20px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
        }

        .reg-card::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .reg-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(59,130,246,0.15);
          border: 1px solid rgba(59,130,246,0.30);
          border-radius: 100px;
          padding: 6px 14px;
          margin-bottom: 28px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #60a5fa;
        }

        .reg-badge span { font-size: 14px; }

        .reg-title {
          font-size: 26px;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.2;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .reg-subtitle {
          font-size: 13.5px;
          color: rgba(148,163,184,0.8);
          margin-bottom: 32px;
          font-weight: 300;
        }

        .field-group {
          margin-bottom: 18px;
        }

        .field-label {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 8px;
        }

        .field-input-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          opacity: 0.5;
          pointer-events: none;
        }

        .reg-input {
          width: 100%;
          padding: 13px 14px 13px 40px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 12px;
          color: #e2e8f0;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          outline: none;
          transition: all 0.2s ease;
        }

        .reg-input::placeholder { color: rgba(148,163,184,0.4); }

        .reg-input:focus {
          border-color: rgba(59,130,246,0.55);
          background: rgba(59,130,246,0.07);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }

        .feedback-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 20px;
          min-height: 44px;
          transition: all 0.3s ease;
        }

        .feedback-box.error {
          background: rgba(239,68,68,0.10);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
        }

        .feedback-box.success {
          background: rgba(34,197,94,0.10);
          border: 1px solid rgba(34,197,94,0.25);
          color: #86efac;
        }

        .feedback-box.empty {
          background: transparent;
          border: 1px solid transparent;
        }

        .reg-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 14.5px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(59,130,246,0.35);
        }

        .reg-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(59,130,246,0.45);
        }

        .reg-btn:active { transform: translateY(0); }

        .reg-footer {
          margin-top: 22px;
          text-align: center;
          font-size: 12.5px;
          color: rgba(148,163,184,0.5);
        }

        .reg-footer strong {
          color: #60a5fa;
          font-weight: 600;
          cursor: pointer;
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 28px 0;
        }

        .reg-stats {
          display: flex;
          justify-content: space-around;
        }

        .stat-item {
          text-align: center;
        }

        .stat-num {
          font-size: 18px;
          font-weight: 700;
          color: #60a5fa;
          font-family: 'JetBrains Mono', monospace;
        }

        .stat-label {
          font-size: 10px;
          color: rgba(148,163,184,0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }
      `}</style>

      <div className="reg-wrapper">
        <div className="reg-card">
          <div className="reg-badge">
            <span>🎓</span> Student Portal
          </div>

          <h1 className="reg-title">Create your account</h1>
          <p className="reg-subtitle">Join the student management system</p>

          {/* Username */}
          <div className="field-group">
            <label className="field-label">Username</label>
            <div className="field-input-wrap">
              <span className="field-icon">👤</span>
              <input
                className="reg-input"
                onChange={handleCange}
                name="username"
                type="text"
                placeholder="e.g. john_doe"
                value={regisData.username}
              />
            </div>
          </div>

          {/* Email */}
          <div className="field-group">
            <label className="field-label">Email Address</label>
            <div className="field-input-wrap">
              <span className="field-icon">✉️</span>
              <input
                className="reg-input"
                onChange={handleCange}
                name="email"
                type="email"
                placeholder="student@university.edu"
                value={regisData.email}
              />
            </div>
          </div>

          {/* Password */}
          <div className="field-group">
            <label className="field-label">Password</label>
            <div className="field-input-wrap">
              <span className="field-icon">🔒</span>
              <input
                className="reg-input"
                onChange={handleCange}
                name="password"
                type="password"
                placeholder="••••••••"
                value={regisData.password}
              />
            </div>
          </div>

          {/* Feedback */}
          <div
            className={`feedback-box ${error ? "error" : msg ? "success" : "empty"}`}
          >
            {error && (
              <>
                <span>⚠️</span> {error}
              </>
            )}
            {!error && msg && (
              <>
                <span>✅</span> {msg}
              </>
            )}
          </div>

          <button className="reg-btn" onClick={handleSubmit}>
            Register Now →
          </button>

          <div className="divider" />

          <div className="reg-stats">
            <div className="stat-item">
              <div className="stat-num">1.2k</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">48</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">99%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>

          <div className="reg-footer">
            Already have an account? <strong>Sign in</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
