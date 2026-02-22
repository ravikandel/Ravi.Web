import { useGlobalUIStore } from "../stores/GlobalUIStore.ts";

export const GlobalDialog = () => {
    const globalUIStore = useGlobalUIStore();
    const dialogStore = globalUIStore.dialogStore;


    return <>
        {dialogStore.isDialogOpen && (
            <>
                <div className="modal fade show d-block" id={dialogStore.id} tabIndex={-1} role="dialog">
                    <div className={`modal-dialog modal-dialog-scrollable modal-${dialogStore.size}`}>
                        <div className="modal-content">
                            <div className="modal-header" hidden={!dialogStore.title}>
                                <h1 className="modal-title fs-5">{dialogStore.title}</h1>
                            </div>
                            <div className="modal-body" hidden={!dialogStore.message && !dialogStore.content}>
                                <h6>{dialogStore.message}</h6>
                                {dialogStore.content}
                            </div>
                            <div className="modal-footer">
                                {dialogStore.footerContent}
                                <button
                                    id={`${dialogStore.id}-cancelbutton`}
                                    data-testid={`${dialogStore.id}-cancelbutton`}
                                    className={`ms-1 btn ${dialogStore.cancelButtonClass || ''}`}
                                    onClick={dialogStore.cancelAction}
                                    hidden={!dialogStore.cancelButtonText}
                                    disabled={dialogStore.cancelDisabled}>
                                    {dialogStore.cancelButtonText}
                                </button>
                                <button
                                    id={`${dialogStore.id}-confirmbutton`}
                                    data-testid={`${dialogStore.id}-confirmbutton`}
                                    className={`ms-1 btn ${dialogStore.successButtonClass || ''}`}
                                    onClick={dialogStore.successAction}
                                    hidden={!dialogStore.successButtonText}
                                    disabled={dialogStore.successDisabled}>
                                    {dialogStore.successButtonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show"></div>
            </>
        )}
    </>
}



