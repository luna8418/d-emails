export interface Email {
    from?: string,
    to: string,
    cc?: string,
    bcc?: string,
    subject: string,
    content: string,
}

export enum EmailStatus {
    QUEUED = 'QUEUED',
    SENT = 'SENT',
    FAILED = 'FAILED',
}

export interface Response {
    id: string,
    status: EmailStatus,
}

export interface DeletionResponse {
    id: string,
    deleted: boolean,
}

// Database Record
export interface EmailItem {
    id: string,
    from?: string,
    to: string,
    cc?: string,
    bcc?: string,
    subject: string,
    content: string,
    status: EmailStatus,
}
