import {CACHE_MANAGER, Inject, Injectable} from "@nestjs/common";

@Injectable()
export class ActiveProcessRepository {
    constructor(@Inject(CACHE_MANAGER) private cacheManager) {
    }

    private getKey() {
        return `projects`;
    }

    public async add(processName: string) {
        const key = this.getKey();
        const activeProcesses = await this.cacheManager.get(key) || [];
        await this.cacheManager.set(key, [...new Set([...activeProcesses, processName])])
    }

    public async all() {
        return await this.cacheManager.get(this.getKey()) || [];
    }

    public async reset() {
        await this.cacheManager.set(this.getKey(), [])
    }
}
