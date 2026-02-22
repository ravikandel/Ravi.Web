import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import { RootStore } from "../stores/RootStore";
import { useGlobalUIStore } from "../../../common/stores/GlobalUIStore";
import { Fa } from "../../../common/components/Fa";
import {
    faHeartbeat,
    faRefresh,
    faClock,
    faServer,
    faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import { PageHeader } from "../../../common/components/PageHeader";

export const HealthCheck = () => {
    const globalUIStore = useGlobalUIStore();
    const rootStore = useMemo(() => new RootStore(globalUIStore), [globalUIStore]);
    const store = rootStore.healthCheckStore;

    useEffect(() => {
        void store.checkHealth();
    }, [store]);

    const statusMeta = store.getStatusMeta(store.healthResult?.status);

    const headerMiddle = (
        <div className="d-flex align-items-center gap-2 mb-1">
            <Fa icon={faHeartbeat} className="fs-1" />
            <h3 className="mb-0">Health Check</h3>
        </div>
    );

    const headerRight = (
        <div className="d-flex align-items-center gap-2">
            <button
                type="button"
                className="btn btn-outline-light"
                onClick={async () => await store.checkHealth()}>
                {globalUIStore.isShowingOverlay ? (
                    <Fa icon={faRefresh} spin={true} className="me-2" />
                ) : (<Fa icon={faRefresh} className="me-2" />)}
                Refresh
            </button>
        </div>
    );

    return (
        <>
            <PageHeader headerMiddle={headerMiddle} headerRight={headerRight} />

            <div className="container-fluid py-3">
                {store.healthResult && (
                    <div className={`card ${statusMeta.borderClass}`}>
                        <div className={`card-header ${statusMeta.headerClass} py-3`}>
                            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                                <div className="fw-semibold d-flex align-items-center gap-2">
                                    <div className="h5 mb-0">
                                        <Fa icon={statusMeta.icon} />
                                        <span>Status: {statusMeta.label}</span>
                                    </div>
                                </div>
                                <div className="small d-flex align-items-center gap-2">
                                    <div className="h5 mb-0">
                                        <Fa icon={faClock} />
                                        <span>Checked at: {store.healthResult.timestamp ? format(store.healthResult.timestamp!, "dd/MM/yyyy hh:mm:ss a") : "-"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-12 col-lg-6">
                                    <div className="border rounded p-3 h-100">
                                        <div className="fw-semibold mb-2">Components</div>
                                        <dl className="row mb-0">
                                            <dt className="col-5 text-muted">
                                                <span className="d-flex align-items-center gap-2">
                                                    <Fa icon={faServer} />
                                                    Server
                                                </span>
                                            </dt>
                                            <dd className="col-7 mb-2">{store.healthResult.server || "-"}</dd>

                                            <dt className="col-5 text-muted">
                                                <span className="d-flex align-items-center gap-2">
                                                    <Fa icon={faDatabase} />
                                                    Database
                                                </span>
                                            </dt>
                                            <dd className="col-7 mb-0">{store.healthResult.database || "-"}</dd>
                                        </dl>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-6">
                                    <div className="border rounded p-3 h-100">
                                        <div className="fw-semibold mb-2">Details</div>
                                        <dl className="row mb-0">
                                            <dt className="col-5 text-muted">Description</dt>
                                            <dd className="col-7 mb-0">{store.healthResult.description || "-"}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-3 pt-3">
                                <div className="col-12">
                                    <div className="border rounded p-3">
                                        <div className="fw-semibold mb-2">Exception</div>
                                        {store.healthResult.exception ? (
                                            <pre className="bg-light rounded p-3 mb-0 small" style={{ whiteSpace: "pre-wrap" }}>
                                                {store.healthResult.exception}
                                            </pre>
                                        ) : (
                                            <div className="text-muted">No exception.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};