export function LoadingSpinner() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          borderTopColor: '#fff',
          animation: 'spin 1s ease-in-out infinite',
        }}
      />
    </div>
  );
}
