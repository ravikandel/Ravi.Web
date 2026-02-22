import { makeAutoObservable } from "mobx";
import { GlobalUIStore, useGlobalUIStore } from "../../../common/stores/GlobalUIStore";
import { HealthCheckStore } from "./HealthCheckStore";
import { createContext, ReactNode, useContext, useMemo } from "react";


export class RootStore {
    globalUIStore: GlobalUIStore;
    healthCheckStore: HealthCheckStore;

    constructor(globalUIStore: GlobalUIStore) {
        this.globalUIStore = globalUIStore;
        this.healthCheckStore = new HealthCheckStore(this);
        makeAutoObservable(this);
    }
}

const RootStoreContext = createContext<RootStore | undefined>(undefined);

export function useRootStore() {
    const context = useContext(RootStoreContext);
    if (context === undefined) {
        throw new Error("useRootStore must be used within a StoreProvider");
    }
    return context;
}

export const RootStoreProvider = ({ createStore, children }: { createStore?: () => RootStore, children: ReactNode }) => {

    const globalUIStore = useGlobalUIStore();
    const store = useMemo(() => createStore ? createStore() : new RootStore(globalUIStore), [createStore]);

    return (
        <RootStoreContext.Provider value={store}>
            {children}
        </RootStoreContext.Provider>
    );
}
