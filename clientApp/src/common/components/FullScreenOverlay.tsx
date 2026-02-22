import { useGlobalUIStore } from "../stores/GlobalUIStore"

export const FullScreenOverlay = () => {
    const globalUIStore = useGlobalUIStore();

    if (!globalUIStore.isShowingOverlay) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <div className="spinner-border text-light mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="text-light fs-4 fw-bold text-center">
                {globalUIStore.overlayMessage || 'Loading...'}
            </div>
        </div>
    )
};