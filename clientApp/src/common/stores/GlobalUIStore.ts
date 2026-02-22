import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import apiConfig from "../../apiConfig.ts";
import { DialogStore } from "./DialogStore.ts";
import { EnvironmentApi } from "../../api/index.ts";


export class GlobalUIStore {
    dialogStore: DialogStore;

    constructor() {
        this.dialogStore = new DialogStore();
        makeAutoObservable(this);
    }

    // environement Info
    environmentName: string = "Production";

    async loanEnvironmentName() {
        try {
            const response = await new EnvironmentApi(apiConfig).getEnvironment();
            runInAction(() => {
                this.environmentName = response;
            });
        } catch (error) {
            runInAction(() => {
                this.environmentName = "";
            });
            console.error("Failed to fetch environment name:", error);
        }
    }

    async loadEnvironmentWatermark(): Promise<string | null> {
        try {
            const environment = await new EnvironmentApi(apiConfig).getEnvironment();
            return this.getEnvironmentWatermark(environment);
        } catch (error) {
            console.error("Failed to fetch environment watermark:", error);
            return null;
        }
    }

    private getEnvironmentWatermark(environmentName: string): string | null {
        const environment = environmentName?.trim();
        if (!environment) return null;

        if (environment.toLowerCase() !== "production" && environment.toLowerCase() !== "prod") {
            const fontSize = Math.max(environment.length, 20);
            const svg = `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='150px' width='150px'><text transform='translate(20, 100) rotate(-45)' fill='rgb(230,230,230)' fill-opacity='0.9' font-family='Arial' font-size='${fontSize}px'>${environment}</text></svg>`;
            return `data:image/svg+xml,${encodeURIComponent(svg)}`;
        }

        return null;
    }

    isShowingOverlay: boolean = false;
    overlayMessage: string = "";

    showOverlay(loadingMessage?: string) {
        this.overlayMessage = loadingMessage || "Loading...";
        this.isShowingOverlay = true;
    }

    hideOverlay() {
        this.isShowingOverlay = false;
    }
}

export const GlobalUIStoreContext = createContext<GlobalUIStore | undefined>(undefined);

export const useGlobalUIStore = () => {
    const context = useContext(GlobalUIStoreContext);
    if (context === undefined) {
        throw new Error("useGlobalUIStore must be used within a GlobalUIStoreProvider");
    }
    return context;
}