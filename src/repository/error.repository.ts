import {Pm2ErrorInterface} from "../interface/pm2-error.interface";
import {CACHE_MANAGER, Inject, Injectable} from "@nestjs/common";

@Injectable()
export class ErrorRepository {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager,
    ) {
    }

    private getKeyByProcess(processName: string) {
        return `${processName}:errors`;
    }

    public async add(error: Pm2ErrorInterface) {
        const key = this.getKeyByProcess(error.process.name);
        const errors = await this.cacheManager.get(key) || [];
        await this.cacheManager.set(key, [...errors, error]);
    }

    public async getByProcess(processName: string) {
        return await this.cacheManager.get(this.getKeyByProcess(processName)) || [];
    }

    public async resetByProcess(processName: string) {
        await this.cacheManager.set(this.getKeyByProcess(processName), [])
    }
}
