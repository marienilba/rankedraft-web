export const GlobalBackground = ({ isDark }) => (
  <style jsx global>{`
    html {
      background: ${isDark ? "black" : "var(--chakra-colors-gray-50)"};
    }
  `}</style>
);
