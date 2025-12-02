// src/shared/contracts.ts

// Canonical API response type
export type ApiResponse<T = unknown> =
  | {
      ok: true;
      data: T;
      ts: string;
    }
  | {
      ok: false;
      code: string;
      message: string;
      detail?: string | null;
      ts: string;
    };

// ✅ Helper functions to build responses
export const ok = <T>(data: T): ApiResponse<T> => ({
  ok: true,
  data,
  ts: new Date().toISOString(),
});

export const err = (
  code: string,
  message: string,
  detail?: string | null
): ApiResponse => ({
  ok: false,
  code,
  message,
  detail: detail ?? null,
  ts: new Date().toISOString(),
});

// -----------------------------
// Fanytel-specific typed contracts
// -----------------------------

// Login response
export interface FanytelLoginResponse {
  token: string;
  userId?: string;
  expiresIn?: number;
  [key: string]: any;
}

// Balance response
export interface FanytelBalanceResponse {
  currency: string;
  amount: number;
  [key: string]: any;
}

// Call start response
export interface FanytelCallResponse {
  callId: string;
  status: "initiated" | "ringing" | "connected" | "failed";
  from: string;
  to: string;
  [key: string]: any;
}

// Call acceptance response
export interface FanytelCallAcceptResponse {
  callId: string;
  status: "accepted" | "failed";
  acceptedAt: string;
  [key: string]: any;
}

// Call rejection response
export interface FanytelCallRejectResponse {
  callId: string;
  status: "rejected" | "failed";
  reason?: string;
  rejectedAt: string;
  [key: string]: any;
}

// SMS send response
export interface FanytelSmsResponse {
  smsId: string;
  status: "sent" | "delivered" | "failed";
  to: string;
  message: string;
  [key: string]: any;
}

// SMS inbox (single message)
export interface FanytelSmsInboxMessage {
  smsId: string;
  from: string;
  to: string;
  message: string;
  receivedAt: string;
  status: "received" | "read";
}

// SMS inbox response
export interface FanytelSmsInboxResponse {
  messages: FanytelSmsInboxMessage[];
}

// SMS list (outbound history)
export interface FanytelSmsListMessage {
  smsId: string;
  to: string;
  message: string;
  sentAt: string;
  status: "sent" | "delivered" | "failed";
}

export interface FanytelSmsListResponse {
  messages: FanytelSmsListMessage[];
}

// Unified call/SMS history entry
export interface FanytelHistoryEntry {
  id: string;
  type: "call" | "sms";
  direction: "inbound" | "outbound";
  from?: string;
  to?: string;
  message?: string;
  status: string;
  timestamp: string;
}

// Unified history response
export interface FanytelHistoryResponse {
  entries: FanytelHistoryEntry[];
}
