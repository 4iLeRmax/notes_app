import React from "react";

interface ResetPasswordProps {
  userEmail: string;
  userName: string;
  resetUrl: string;
  expiryMinutes?: number;
}

export default function ResetPasswordEmail({
  userName,
  userEmail,
  resetUrl,
  expiryMinutes = 30,
}: ResetPasswordProps) {
  return (
    // ── Page shell (bg + centering) ──────────────────────────────────────────
    <div
      className="min-h-screen bg-[#f5f3ef] flex items-start justify-center py-10 px-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Email client chrome ───────────────────────────────────────────── */}
      <div className="w-full max-w-[620px]">
        {/* Meta bar (sender / subject line) */}
        <div className="flex items-start gap-3 mb-5 px-1">
          {/* Brand avatar */}
          <div className="w-10 h-10 rounded-full bg-[#1a1a18] flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="w-[18px] h-[18px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="14"
                height="14"
                rx="3"
                stroke="#c8b89a"
                strokeWidth="1.2"
              />
              <path
                d="M7 10l2 2 4-4"
                stroke="#c8b89a"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-stone-800 m-0">
              Acme{" "}
              <span className="font-normal text-stone-500">
                · security@acme.com
              </span>
            </p>
            <p className="text-[12px] text-stone-400 m-0">To: {userEmail}</p>
          </div>
          <span className="text-[12px] text-stone-400 shrink-0">Just now</span>
        </div>

        {/* ── Email body card ───────────────────────────────────────────────── */}
        <div className="rounded-xl border border-stone-200 overflow-hidden bg-white shadow-sm">
          {/* Dark header */}
          <div className="bg-[#1a1a18] px-10 pt-10 pb-8 text-center">
            {/* Logo mark */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#c8b89a]" />
              <span
                className="text-[14px] text-[#e8e0d4] tracking-[0.12em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ACME
              </span>
              <span className="w-2 h-2 rounded-full bg-[#c8b89a]" />
            </div>

            {/* Lock icon */}
            <div className="w-16 h-16 rounded-full border border-[#3a3a36] bg-[#222220] flex items-center justify-center mx-auto mb-5">
              <svg
                viewBox="0 0 28 28"
                fill="none"
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="13"
                  width="16"
                  height="12"
                  rx="2.5"
                  stroke="#c8b89a"
                  strokeWidth="1.4"
                />
                <path
                  d="M9 13V9.5a5 5 0 0 1 10 0V13"
                  stroke="#c8b89a"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="14" cy="19" r="1.5" fill="#c8b89a" />
                <line
                  x1="14"
                  y1="20.5"
                  x2="14"
                  y2="22.5"
                  stroke="#c8b89a"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1
              className="text-[22px] font-medium text-[#f0ece6] m-0 mb-1.5 tracking-[-0.01em]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Reset your password
            </h1>
            <p className="text-[13px] text-[#888880] m-0 tracking-[0.02em]">
              Account security request
            </p>
          </div>

          {/* Content */}
          <div className="px-10 pt-8 pb-10">
            <p className="text-[14px] text-stone-500 leading-relaxed m-0 mb-4">
              Hi {userName},
            </p>

            <p className="text-[14px] text-stone-500 leading-[1.7] m-0 mb-8">
              We received a request to reset the password for your Acme account.
              Click the button below to choose a new password. This link is
              valid for the next{" "}
              <strong className="text-stone-700 font-medium">
                {expiryMinutes} minutes
              </strong>
              .
            </p>

            {/* CTA button */}
            <div className="text-center mb-8">
              <a
                href={resetUrl}
                className="inline-block bg-[#1a1a18] text-[#e8e0d4] text-[13px] font-medium
                           tracking-[0.08em] px-9 py-3.5 rounded-[4px] border border-[#3a3a36]
                           no-underline transition-opacity duration-150 hover:opacity-80"
              >
                Reset my password →
              </a>
            </div>

            {/* Divider */}
            <div className="h-px bg-stone-100 mb-5" />

            {/* Expiry pill */}
            <p className="text-[12px] text-stone-400 text-center m-0 mb-5">
              Link expires in {expiryMinutes} minutes · Single use only
            </p>

            {/* Fallback link block */}
            <div className="bg-stone-50 rounded-md px-4 py-3 mb-5">
              <p className="text-[11px] text-stone-400 uppercase tracking-[0.1em] m-0 mb-1.5">
                Or copy this link into your browser
              </p>
              <p className="text-[12px] text-blue-600 break-all m-0">
                {resetUrl}
              </p>
            </div>

            {/* Ignore note */}
            <p className="text-[12px] text-stone-400 text-center leading-relaxed m-0">
              Didn&apos;t request this? You can safely ignore this email.
              <br />
              Your password will not change unless you click the link above.
            </p>
          </div>

          {/* Footer */}
          <div className="px-10 py-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-[11px] text-stone-400">
              © {new Date().getFullYear()} Acme, Inc.
            </span>
            <div className="flex gap-4">
              {["Privacy", "Terms", "Help"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-[11px] text-stone-400 no-underline hover:text-stone-600 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
