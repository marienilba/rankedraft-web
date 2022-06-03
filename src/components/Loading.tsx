import { Flex, Img } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export const Loading = () => {
  const { backgroundColor, code, isDark } = useTheme();
  return (
    <Flex
      width="100vw"
      height="100vh"
      position="absolute"
      {...backgroundColor}
      sx={{ zIndex: 9999 }}
      alignItems="center"
      justifyContent="center"
    >
      <motion.div
        animate={{
          padding: ["2rem", "0.75rem", "2rem"],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          backgroundColor: code[200],
          borderRadius: "500px",
        }}
      >
        <motion.div
          animate={{
            padding: ["2rem", "0.75rem", "2rem"],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            backgroundColor: code[200],
            mixBlendMode: isDark ? "screen" : "multiply",
            borderRadius: "500px",
          }}
        >
          <Img boxSize="2.5rem" src="/icons/sword.png" />
        </motion.div>
      </motion.div>
    </Flex>
  );
};
