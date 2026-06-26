import React from "react";

interface ResetPasswordProps {
  user: SessionUser;
  url: string;
}

export default function ResetPasswordEmail({ user, url }: ResetPasswordProps) {
  return `<div style="min-height:100vh;background:#f5f3ef;display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;font-family:'DM Sans',sans-serif;">
    <div style="width:100%;max-width:620px;">

      <!-- Meta bar -->
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:20px;padding:0 4px;">
        <div style="width:40px;height:40px;border-radius:50%;background:#1a1a18;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="14" height="14" rx="3" stroke="#c8b89a" stroke-width="1.2"/>
            <path d="M7 10l2 2 4-4" stroke="#c8b89a" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div style="flex:1;min-width:0;">
          <p style="font-size:13px;font-weight:500;color:#292524;margin:0;">
           Morphic Notes <span style="font-weight:400;color:#78716c;">· security@zlatin.it.com</span>
          </p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">To: ${user.email}</p>
        </div>
        <span style="font-size:12px;color:#a8a29e;flex-shrink:0;">Just now</span>
      </div>

      <!-- Email card -->
      <div style="border-radius:12px;border:1px solid #e7e5e4;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.06);">

        <!-- Dark header -->
        <div style="background:#1a1a18;padding:40px 40px 32px;text-align:center;">
          <!-- Logo -->
          <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:32px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#c8b89a;display:inline-block;"></span>
            <span style="font-size:14px;color:#e8e0d4;letter-spacing:0.12em;font-family:'Playfair Display',serif;">MORPHIC NOTES</span>
            <span style="width:8px;height:8px;border-radius:50%;background:#c8b89a;display:inline-block;"></span>
          </div>

          <!-- Lock icon -->
          <div style="width:64px;height:64px;border-radius:50%;border:1px solid #3a3a36;background:#222220;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
            <svg viewBox="0 0 28 28" fill="none" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="13" width="16" height="12" rx="2.5" stroke="#c8b89a" stroke-width="1.4"/>
              <path d="M9 13V9.5a5 5 0 0 1 10 0V13" stroke="#c8b89a" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="14" cy="19" r="1.5" fill="#c8b89a"/>
              <line x1="14" y1="20.5" x2="14" y2="22.5" stroke="#c8b89a" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </div>

          <h1 style="font-size:22px;font-weight:500;color:#f0ece6;margin:0 0 6px;letter-spacing:-0.01em;font-family:'Playfair Display',serif;">
            Reset your password
          </h1>
          <p style="font-size:13px;color:#888880;margin:0;letter-spacing:0.02em;">Account security request</p>
        </div>

        <!-- Content -->
        <div style="padding:32px 40px 40px;">
          <p style="font-size:14px;color:#78716c;line-height:1.6;margin:0 0 16px;">Hi ${user.name},</p>
          <p style="font-size:14px;color:#78716c;line-height:1.7;margin:0 0 32px;">
            We received a request to reset the password for your Morphic Notes account.
            Click the button below to choose a new password. This link is valid for the next
            <strong style="color:#44403c;font-weight:500;">${30} minutes</strong>.
          </p>

          <!-- CTA -->
          <div style="text-align:center;margin-bottom:32px;">
            <a href="${url}"
               style="display:inline-block;background:#1a1a18;color:#e8e0d4;font-size:13px;font-weight:500;
                      letter-spacing:0.08em;padding:14px 36px;border-radius:2px;border:1px solid #3a3a36;
                      text-decoration:none;">
              Reset my password →
            </a>
          </div>

          <!-- Divider -->
          <div style="height:1px;background:#f5f5f4;margin-bottom:20px;"></div>

          <!-- Expiry -->
          <p style="font-size:12px;color:#a8a29e;text-align:center;margin:0 0 20px;">
            Link expires in ${30} minutes · Single use only
          </p>

          <!-- Fallback URL -->
          <div style="background:#fafaf9;border-radius:6px;padding:12px 16px;margin-bottom:20px;">
            <p style="font-size:11px;color:#a8a29e;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px;">
              Or copy this link into your browser
            </p>
            <p style="font-size:12px;color:#2563eb;word-break:break-all;margin:0;">${url}</p>
          </div>

          <!-- Ignore note -->
          <p style="font-size:12px;color:#a8a29e;text-align:center;line-height:1.6;margin:0;">
            Didn't request this? You can safely ignore this email.<br/>
            Your password will not change unless you click the link above.
          </p>
        </div>

        <!-- Footer -->
        <div style="padding:16px 40px;border-top:1px solid #f5f5f4;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:11px;color:#a8a29e;">© ${new Date().getFullYear()} Morphic Notes, Inc.</span>
          <div style="display:flex;gap:16px;">
            <a href="#" style="font-size:11px;color:#a8a29e;text-decoration:none;">Privacy</a>
            <a href="#" style="font-size:11px;color:#a8a29e;text-decoration:none;">Terms</a>
            <a href="#" style="font-size:11px;color:#a8a29e;text-decoration:none;">Help</a>
          </div>
        </div>

      </div>
    </div>
  </div>
  `;
}
