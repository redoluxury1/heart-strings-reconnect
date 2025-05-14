
import { ReflectionPackBatch } from "@/types/reflection-insights";
import { reflectionPackBatch1 } from "./batch1";
import { reflectionPackBatch2 } from "./batch2";
import { reflectionPackBatch3 } from "./batch3";
import { reflectionPackBatch4 } from "./batch4";
import { reflectionPackBatch5 } from "./batch5";
import { reflectionPackBatch6 } from "./batch6";
import { reflectionPackBatch7 } from "./batch7";
import { reflectionPackBatch8 } from "./batch8";
import { reflectionPackBatch9 } from "./batch9";
import { reflectionPackBatch10 } from "./batch10";

// Combine all reflection packs into a single collection
export const reflectionPacks: ReflectionPackBatch = {
  1: reflectionPackBatch1,
  2: reflectionPackBatch2,
  3: reflectionPackBatch3,
  4: reflectionPackBatch4,
  5: reflectionPackBatch5,
  6: reflectionPackBatch6,
  7: reflectionPackBatch7,
  8: reflectionPackBatch8,
  9: reflectionPackBatch9,
  10: reflectionPackBatch10
};

// Re-export all batches for direct access if needed
export {
  reflectionPackBatch1,
  reflectionPackBatch2,
  reflectionPackBatch3,
  reflectionPackBatch4,
  reflectionPackBatch5,
  reflectionPackBatch6,
  reflectionPackBatch7,
  reflectionPackBatch8,
  reflectionPackBatch9,
  reflectionPackBatch10
};
