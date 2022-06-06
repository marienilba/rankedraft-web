import { Stack, Box } from "@chakra-ui/react";
import { LightenColor } from "../../utils/HelpersFunction";

export type PasswordEvaluation = {
  size: boolean;
  caps: boolean;
  special_character: boolean;
  digits: boolean;
};

export const PasswordEvaluationBar = ({
  evaluation,
  palette,
}: {
  evaluation: PasswordEvaluation;
  palette?: string[];
}) => {
  const default_palette = [
    "#FF0000",
    "#FF3700",
    "#FF6F00",
    "#FFA600",
    "#FFDD00",
  ];
  const state = [true, ...Object.values(evaluation).filter((v) => v === true)];
  return (
    <Stack direction="row" margin={1} spacing={0.5}>
      {state.map((_, i) => (
        <Box
          key={`evaluation-${i}`}
          w="30px"
          h="5px"
          bgGradient={`linear(to-r, ${
            palette ? palette[i] : default_palette[i]
          }, ${
            palette
              ? LightenColor(palette[i], 20)
              : LightenColor(default_palette[i], 20)
          })`}
          borderRadius="full"
        ></Box>
      ))}
    </Stack>
  );
};
