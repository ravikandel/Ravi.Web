import { StatusMeta } from "../models/StatusMeta.ts";
import { HealthCheckApi, HealthCheckResponseV1 } from "../../../api";
import apiConfig from "../../../apiConfig";
import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { toast } from "react-toastify";
import {
    faCircleCheck,
    faTriangleExclamation,
    faCircleXmark,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

export class HealthCheckStore {

    api: HealthCheckApi;
    healthResult: HealthCheckResponseV1 | null = null;
    error: string | null = null;

    constructor(private rootStore: RootStore) {
        this.api = new HealthCheckApi(apiConfig);
        makeAutoObservable(this);
    }

    getStatusMeta(status: unknown): StatusMeta {
        const normalized = typeof status === "string" ? status.trim() : status;

        // Numeric codes requested: 1=Healthy, 2=Unhealthy, 3=Degraded
        const code =
            typeof normalized === "number"
                ? normalized
                : typeof normalized === "string" && normalized.length > 0
                    ? Number(normalized)
                    : NaN;

        if (code === 1) return { label: "Healthy", headerClass: "text-bg-success", borderClass: "border-success", icon: faCircleCheck };
        if (code === 2) return { label: "Unhealthy", headerClass: "text-bg-danger", borderClass: "border-danger", icon: faCircleXmark };
        if (code === 3) return { label: "Degraded", headerClass: "text-bg-warning", borderClass: "border-warning", icon: faTriangleExclamation };

        // Also tolerate string enums (in case the API returns them)
        if (normalized === "Healthy") return { label: "Healthy", headerClass: "text-bg-success", borderClass: "border-success", icon: faCircleCheck };
        if (normalized === "Unhealthy") return { label: "Unhealthy", headerClass: "text-bg-danger", borderClass: "border-danger", icon: faCircleXmark };
        if (normalized === "Degraded") return { label: "Degraded", headerClass: "text-bg-warning", borderClass: "border-warning", icon: faTriangleExclamation };

        return { label: "Unknown", headerClass: "text-bg-secondary", borderClass: "border-secondary", icon: faCircleInfo };
    }

    setError(message: string | null) {
        this.error = message;
    }

    setHealthResult(result: HealthCheckResponseV1 | null) {
        this.healthResult = result;
    }

    async checkHealth() {
        this.rootStore.globalUIStore.showOverlay("Checking health...");
        this.error = null;

        try {
            const response = await this.api.healthCheckV1();
            this.setHealthResult(response);
        } catch (error) { //TODO: add extract api errror
            this.setError("Health check failed. Please try again later.");
            toast.error(this.error);
        }
        finally {
            runInAction(() => {
                this.rootStore.globalUIStore.hideOverlay();
            });
        }
    }
}