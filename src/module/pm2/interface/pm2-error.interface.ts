export interface Pm2ErrorProcessInterface {
    namespace: string;
    rev?: string;
    name: string;
    pm2_id: number;
}

export interface Pm2ErrorInterface {
    data: string;
    at: number;
    process: Pm2ErrorProcessInterface;
}
