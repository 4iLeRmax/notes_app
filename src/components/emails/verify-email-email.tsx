import React from "react";

interface VerifyEmailEmailProps {
  user: SessionUser;
  url: string;
}

export default function VerifyEmailEmail({ user, url }: VerifyEmailEmailProps) {
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
          <p style="font-size:13px;font-weight:500;color:#292524;margin:0;font-family:'DM Sans',sans-serif;">
            Note <span style="font-weight:400;color:#78716c;">· hello@note.com</span>
          </p>
          <p style="font-size:12px;color:#a8a29e;margin:0;font-family:'DM Sans',sans-serif;">To: ${user.email}</p>
        </div>
        <span style="font-size:12px;color:#a8a29e;flex-shrink:0;font-family:'DM Sans',sans-serif;">Just now</span>
      </div>
 
      <!-- Email card -->
      <div style="border-radius:12px;border:1px solid #e7e5e4;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
 
        <!-- Dark header -->
        <div style="background:#1a1a18;padding:40px 40px 32px;text-align:center;">
          <!-- Logo -->
          <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:32px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#c8b89a;display:inline-block;"></span>
            <span style="font-size:14px;color:#e8e0d4;letter-spacing:0.12em;font-family:'Playfair Display',serif;">NOTE</span>
            <span style="width:8px;height:8px;border-radius:50%;background:#c8b89a;display:inline-block;"></span>
          </div>
 
          <!-- Envelope icon -->
          <div style="width:64px;height:64px;border-radius:50%;border:1px solid #3a3a36;background:#222220;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
            <svg viewBox="0 0 28 28" fill="none" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="7" width="20" height="14" rx="2.5" stroke="#c8b89a" stroke-width="1.4"/>
              <path d="M4 10l10 7 10-7" stroke="#c8b89a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
 
          <h1 style="font-size:22px;font-weight:500;color:#f0ece6;margin:0 0 6px;letter-spacing:-0.01em;font-family:'Playfair Display',serif;">
            Verify your email address
          </h1>
          <p style="font-size:13px;color:#888880;margin:0;letter-spacing:0.02em;font-family:'DM Sans',sans-serif;">One last step to activate your account</p>
        </div>
 
        <!-- Content -->
        <div style="padding:32px 40px 40px;">
          <p style="font-size:14px;color:#78716c;line-height:1.6;margin:0 0 16px;font-family:'DM Sans',sans-serif;">Hi ${user.name},</p>
          <p style="font-size:14px;color:#78716c;line-height:1.7;margin:0 0 32px;font-family:'DM Sans',sans-serif;">
            Thanks for signing up for Note. Before you get started, we need to confirm
            this is really you. Click the button below to verify your email address.
            This link is valid for the next
            <strong style="color:#44403c;font-weight:500;">${24} hours</strong>.
          </p>
 
          <!-- CTA -->
          <div style="text-align:center;margin-bottom:32px;">
            <a href="${url}"
               style="display:inline-block;background:#1a1a18;color:#e8e0d4;font-size:13px;font-weight:500;
                      letter-spacing:0.08em;padding:14px 36px;border-radius:2px;border:1px solid #3a3a36;
                      text-decoration:none;font-family:'DM Sans',sans-serif;">
              Verify my email →
            </a>
          </div>
 
          <!-- Divider -->
          <div style="height:1px;background:#f5f5f4;margin-bottom:20px;"></div>
 
          <!-- Expiry -->
          <p style="font-size:12px;color:#a8a29e;text-align:center;margin:0 0 20px;font-family:'DM Sans',sans-serif;">
            Link expires in ${24} hours · Single use only
          </p>
 
          <!-- Fallback URL -->
          <div style="background:#fafaf9;border-radius:6px;padding:12px 16px;margin-bottom:20px;">
            <p style="font-size:11px;color:#a8a29e;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px;font-family:'DM Sans',sans-serif;">
              Or copy this link into your browser
            </p>
            <p style="font-size:12px;color:#2563eb;word-break:break-all;margin:0;font-family:'DM Sans',sans-serif;">${url}</p>
          </div>
 
          <!-- Ignore note -->
          <p style="font-size:12px;color:#a8a29e;text-align:center;line-height:1.6;margin:0;font-family:'DM Sans',sans-serif;">
            Didn't create an account? You can safely ignore this email.<br/>
            Someone may have entered your address by mistake.
          </p>
        </div>
 
        <!-- Footer -->
        <div style="padding:16px 40px;border-top:1px solid #f5f5f4;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:11px;color:#a8a29e;font-family:'DM Sans',sans-serif;">© ${new Date().getFullYear()} Note, Inc.</span>
          <div style="display:flex;gap:16px;">
            <a href="#" style="font-size:11px;color:#a8a29e;text-decoration:none;font-family:'DM Sans',sans-serif;">Privacy</a>
            <a href="#" style="font-size:11px;color:#a8a29e;text-decoration:none;font-family:'DM Sans',sans-serif;">Terms</a>
            <a href="#" style="font-size:11px;color:#a8a29e;text-decoration:none;font-family:'DM Sans',sans-serif;">Help</a>
          </div>
        </div>
 
      </div>
    </div>
  </div>`;
}
