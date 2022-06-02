export const OverflowY = ({ isDisable = false }: { isDisable?: boolean }) => {
  return (
    <style jsx global>{`
      html {
        overflow-y: ${isDisable ? "hidden" : "auto"};
      }
    `}</style>
  );
};
